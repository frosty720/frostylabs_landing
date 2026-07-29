import { Callout, Em, H2, LI, Lead, P, Strong, UL } from '@/components/blog/prose';

export function Erc8004SilentFailures() {
	return (
		<>
			<Lead>
				Four ways ERC-8004 fails without telling you. Every one of these cost us real hours on
				mainnet, and none of them throws an error you can search for.
			</Lead>

			<P>
				ERC-8004 is a good standard and the spec is readable. What the spec doesn&apos;t prepare you
				for is the gap between the spec, the SDK, and what&apos;s actually deployed. We&apos;ve been
				running agents against the live registries on Base since June — registering identities,
				writing feedback, getting indexed.
			</P>
			<P>
				The bugs that hurt weren&apos;t the ones that threw. They were the ones where everything
				looked fine.
			</P>

			<H2>1. The testnet address also exists on mainnet</H2>
			<P>
				The registries use vanity addresses starting <Em>0x8004</Em>, deployed deterministically
				through CREATE2. There are two sets — one for testnets, one for mainnets. Because the factory
				and salts are identical everywhere, <Strong>both sets get deployed to every chain</Strong>.
			</P>
			<P>
				So if you hardcode the Sepolia Identity Registry and point it at Base mainnet, you do not get
				&quot;no contract at address.&quot; You get a contract. It has bytecode. It answers calls.
				It&apos;s just an un-upgraded proxy stub.
			</P>
			<P>Call <Em>getVersion()</Em> on Base mainnet and see for yourself:</P>
			<UL>
				<LI>
					<Em>0x8004A169…</Em> &rarr; <Strong>2.0.0</Strong> — the real Identity Registry
				</LI>
				<LI>
					<Em>0x8004A818…</Em> &rarr; <Strong>0.0.1</Strong> — the testnet address, sitting on
					mainnet as a placeholder
				</LI>
			</UL>
			<P>
				Same story for Reputation: <Em>0x8004BAa1…</Em> is 2.0.0 on mainnet,{' '}
				<Em>0x8004B663…</Em> answers at 0.0.1. Your <Em>eth_getCode</Em> check passes. Your writes go
				somewhere that isn&apos;t the canonical registry.
			</P>
			<Callout>
				<Strong>Check the version, not the bytecode.</Strong> Presence of code proves nothing here.
				Assert <Em>getVersion() === &quot;2.0.0&quot;</Em> at startup and this class of bug becomes
				impossible.
			</Callout>

			<H2>2. The SDK&apos;s giveFeedback has the wrong signature</H2>
			<P>
				This one is specific and checkable. <Em>erc-8004-js@2.0.1</Em> ships this ABI:
			</P>
			<P>
				<Em>
					giveFeedback(uint256 agentId, uint8 score, string tag1, string tag2, string endpoint,
					string feedbackURI, bytes32 feedbackHash)
				</Em>
			</P>
			<P>Seven parameters, with a <Em>uint8 score</Em>. The deployed v2.0.0 contract expects eight:</P>
			<P>
				<Em>
					giveFeedback(uint256 agentId, int128 value, uint8 valueDecimals, string tag1, string tag2,
					string endpoint, string feedbackURI, bytes32 feedbackHash)
				</Em>
			</P>
			<P>
				Different parameters mean a different function selector — <Em>0x1bae8c36</Em> from the SDK
				versus <Em>0x3c036a7e</Em> on-chain. The call lands on a function that doesn&apos;t exist and
				reverts.
			</P>
			<P>
				The reason it&apos;s expensive is that it looks like your problem. You check your agent ID,
				your score range, your permissions, your gas. The ABI is the last place you look, because the
				SDK is supposed to be the part that&apos;s right.
			</P>
			<P>
				We gave up on the SDK for writes and call the contract directly with the correct ABI,
				verifying <Em>receipt.status</Em> rather than trusting a resolved promise.
			</P>

			<H2>3. Feedback is permissionless — the auth flow is a red herring</H2>
			<P>
				The SDK exposes <Em>createFeedbackAuth</Em> and <Em>signFeedbackAuth</Em>, which strongly
				implies feedback requires an owner-signed authorization. We built that whole flow.
			</P>
			<P>
				The deployed contract ignores it. The only gate on <Em>giveFeedback</Em> is that you
				can&apos;t review your own agent — <Em>require(!isAuthorizedOrOwner(msg.sender, agentId))</Em>
				. Anyone else can write feedback about any agent, at any time, for the cost of gas.
			</P>
			<P>
				That&apos;s a design decision worth understanding before you build on it. On-chain reputation
				in ERC-8004 is <Strong>permissionless by default</Strong>. If you want feedback to mean
				&quot;this person actually used the agent,&quot; that gate has to live in your application —
				ours only writes feedback after verifying the reviewer paid for a call.
			</P>
			<P>
				Anyone reading reputation off-chain should hold the same assumption in reverse: a raw count
				is not a usage count.
			</P>

			<H2>4. Two JSON documents that look interchangeable</H2>
			<P>
				An agent ends up with two files, and conflating them means your agent registers on-chain
				perfectly and then shows up broken in explorers.
			</P>
			<UL>
				<LI>
					<Strong>The A2A agent card</Strong> at <Em>/.well-known/agent-card.json</Em> — consumed by
					other agents. Skills are objects.
				</LI>
				<LI>
					<Strong>The ERC-8004 registration file</Strong> at the on-chain <Em>agentURI</Em> — consumed
					by indexers. Different schema entirely.
				</LI>
			</UL>
			<P>
				The registration file needs its <Em>type</Em> set to the EIP-8004 schema URL, <Em>services</Em>{' '}
				as an array of objects with absolute endpoints, and a <Em>registrations</Em> array that links
				back to the on-chain identity in CAIP-2 form. Miss any of those and indexers reject the
				document with error codes — WA002 for the wrong type, WA006 for malformed services, IA004
				through IA007 for the registrations block.
			</P>
			<P>
				None of that touches the chain. Your transaction succeeded. <Em>ownerOf</Em> returns your
				address. The agent simply doesn&apos;t appear anywhere, and nothing tells you why unless you
				go looking at the indexer&apos;s error output.
			</P>

			<H2>The pattern</H2>
			<P>
				Every one of these shares a shape: <Strong>the failure state is indistinguishable from the
				success state</Strong> unless you go looking. A contract that exists but is the wrong one. A
				transaction that reverts inside a library that resolved. An auth flow that runs and is
				ignored. A document that uploads and is rejected somewhere you aren&apos;t watching.
			</P>
			<P>
				The defence is cheap and worth doing on day one — assert the registry version at boot, check
				receipt status rather than promise resolution, and validate your registration file against an
				indexer before you assume registration worked.
			</P>
			<P>
				None of this is a criticism of the standard. It&apos;s what integrating against a young
				standard actually looks like, and it&apos;s the part nobody writes down.
			</P>
		</>
	);
}
