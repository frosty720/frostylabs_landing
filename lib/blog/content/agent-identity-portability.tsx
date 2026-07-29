import { A, Callout, Em, H2, LI, Lead, P, Strong, UL } from '@/components/blog/prose';

export function AgentIdentityPortability() {
	return (
		<>
			<Lead>
				If a platform holds your agent&apos;s keys, does it also hold your agent&apos;s identity? For
				ERC-8004, the answer is no — and you can verify that yourself in about thirty seconds.
			</Lead>

			<P>
				Someone building an L1 asked us this last week, and it&apos;s the sharpest question
				we&apos;ve had about the stack:
			</P>
			<P>
				<Em>
					&quot;The agent signs, but the vault is what actually holds the key. So if you move the
					agent to a different setup later, does the 8004 identity carry over, or does it start
					clean?&quot;
				</Em>
			</P>
			<P>
				It&apos;s the right thing to be suspicious about. We wrote previously about{' '}
				<A href='/blog/agent-custody'>not giving agents their own private keys</A> — keys live in a
				ThirdWeb Vault, the agent gets a scoped, revocable permission instead. That&apos;s good for
				custody. But it raises an obvious follow-up: if we hold the key, what else do we hold?
			</P>
			<P>
				If the answer were &quot;your identity and your reputation,&quot; nobody sensible should
				build on us. So here is the actual answer, with the parts you can check.
			</P>

			<H2>Custody and ownership are different layers</H2>
			<P>
				The confusion is understandable, because &quot;the vault holds the key&quot; sounds like it
				should be the whole story. It isn&apos;t. There are two distinct things:
			</P>
			<UL>
				<LI>
					<Strong>Custody</Strong> — where the private key material physically lives. That&apos;s the
					Vault. It&apos;s an implementation detail of signing.
				</LI>
				<LI>
					<Strong>Ownership</Strong> — which <Em>address</Em> owns the on-chain identity. That&apos;s
					recorded in the registry, and it has no idea the Vault exists.
				</LI>
			</UL>
			<P>
				ERC-8004 identity is an ERC-721. The Identity Registry mints an NFT, and{' '}
				<Strong>ownership is by address</Strong>. Swap your custody backend — Vault to a hardware
				wallet, to a raw key, to a different Vault entirely — and as long as the address is the same,
				the registry sees nothing. There is nothing to migrate, because nothing changed.
			</P>

			<H2>Who mints it matters more</H2>
			<P>
				That&apos;s the part most people miss. The registry&apos;s <Em>register</Em> function mints to{' '}
				<Em>msg.sender</Em> — whoever sent the transaction becomes the owner. So the question
				isn&apos;t &quot;can the identity move,&quot; it&apos;s{' '}
				<Strong>&quot;whose wallet signed the mint in the first place?&quot;</Strong>
			</P>
			<P>
				On FrostyFi, registration is signed client-side by your connected wallet. Not ours. We hold no
				key for it, no admin role over it, and no ability to revoke it. If we disappeared tomorrow your
				agent&apos;s identity would be entirely unaffected, because it was never ours.
			</P>
			<P>
				This is worth asking of any platform that offers to register agents for you. &quot;Which
				address ends up in <Em>ownerOf</Em>?&quot; is a one-line question with a very revealing
				answer.
			</P>

			<H2>Where the metadata lives</H2>
			<P>
				An 8004 identity points at a registration file through its <Em>tokenURI</Em>. If a platform
				parks that JSON on its own domain, you have a quieter kind of lock-in: the moment they go
				down, or you leave, your identity dereferences to nothing.
			</P>
			<P>
				Ours are pinned to IPFS. Content-addressed, no dependency on us staying alive. Our gas oracle
				agent — token 54630 on Base — resolves to an{' '}
				<Em>ipfs://</Em> URI you can fetch from any public gateway, today, without touching
				frostylabs.ai.
			</P>

			<H2>The one thing that actually breaks</H2>
			<P>
				We should be precise rather than absolute, because there <Em>is</Em> a platform-tied field.
			</P>
			<P>
				Inside the registration file, <Em>services[].endpoint</Em> points at where the agent is
				actually reachable. For a FrostyFi-hosted agent that&apos;s a frostylabs.ai subdomain. Move
				your agent off our infrastructure and that URL stops answering.
			</P>
			<P>
				The fix is one call: <Em>setAgentURI</Em>, pointing at a new metadata document with your own
				endpoint. Same token ID, same agent ID, reputation untouched. And critically —{' '}
				<Strong>that function is owner-only</Strong>. It&apos;s yours to call, and we could not block
				it if we wanted to.
			</P>
			<Callout>
				<Strong>The whole migration is repointing one URL.</Strong> Identity, history, and reputation
				were never ours to keep.
			</Callout>

			<H2>Reputation follows the identity, not the platform</H2>
			<P>
				The reason any of this matters is reputation. An identity you can move is worthless if the
				track record attached to it stays behind.
			</P>
			<P>
				On-chain feedback in ERC-8004 is keyed to the <Strong>agent ID</Strong> — not to the owner,
				not to the wallet that signs, and certainly not to the platform that hosted it. Transferring
				the NFT doesn&apos;t change the token ID, so the accumulated history goes with it.
			</P>
			<P>
				Worth knowing the flip side, because it cuts both ways: reputation travels{' '}
				<Em>with</Em> the NFT. Transfer an identity and its history transfers too. Portable identity
				and purchasable reputation are the same mechanism — that&apos;s a real property of the
				standard, and you should decide for yourself whether it&apos;s a feature.
			</P>

			<H2>Check it rather than trust it</H2>
			<P>
				Everything above is verifiable without asking us anything. Against the Identity Registry on
				Base, for agent 54630:
			</P>
			<UL>
				<LI>
					<Em>ownerOf(54630)</Em> — returns a user wallet, not a FrostyLabs one
				</LI>
				<LI>
					<Em>tokenURI(54630)</Em> — returns an <Em>ipfs://</Em> URI, not a frostylabs.ai URL
				</LI>
				<LI>
					<Em>getMetadata(54630, &quot;agentWallet&quot;)</Em> — the operating wallet, stored
					independently of ownership
				</LI>
			</UL>
			<P>
				That last one is the cleanest illustration of the whole idea: the standard keeps{' '}
				<Em>who owns the agent</Em> and <Em>which wallet the agent signs with</Em> in separate slots,
				precisely so they can change independently.
			</P>
			<P>
				Which is the real answer to the original question. The Vault holds a key. It never held your
				agent.
			</P>
		</>
	);
}
