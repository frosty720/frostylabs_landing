import { A, Callout, Em, Figure, H2, LI, Lead, P, Strong, UL } from '@/components/blog/prose';

export function AgentCustody() {
	return (
		<>
			<Lead>
				An agent that can spend real money is only as safe as the worst thing it can be tricked into
				signing.
			</Lead>

			<P>
				Agents are starting to spend real money — paying for their own inference, buying data,
				tipping other agents, settling on-chain. That part is exciting, and we just shipped it: a
				FrostyFi agent can pay any x402 endpoint from its own wallet, autonomously.
			</P>
			<P>
				But &quot;my agent can pay&quot; is the easy half. The hard question — the one that decides
				whether you&apos;d actually let it near a wallet — is this:
			</P>
			<P>
				<Strong>When your agent does something you didn&apos;t intend, how much can it lose?</Strong>
			</P>
			<P>
				Because it <Em>will</Em> do something you didn&apos;t intend. A prompt gets injected. A tool
				returns something weird. A model hallucinates a destination address. This isn&apos;t paranoia;
				it&apos;s the failure mode of every autonomous system that touches money. The only real
				question is what happens next.
			</P>

			<H2>The pattern that keeps going wrong</H2>
			<P>
				The tempting shortcut is to hand the agent a private key. Drop it in an env var, pass it to
				the workflow, let the agent sign whatever it needs. It works in a demo. It&apos;s also handing
				your agent the keys to the entire wallet — every dollar in it, forever, for any transaction it
				can be talked into.
			</P>
			<P>
				One leaked key, one clever prompt, one compromised dependency, and there&apos;s no ceiling on
				the damage. The agent had permission to sign <Em>anything</Em>, so it did.
			</P>
			<P>
				We think that&apos;s the wrong model. An agent shouldn&apos;t hold the keys. It should hold a{' '}
				<Strong>permission</Strong> — narrow, scoped, and revocable.
			</P>

			<H2>How FrostyFi does it</H2>
			<Figure
				src='/screenshots/vault-operations-menu.jpg'
				alt="The Vault node's operation menu: get wallet, sign message, sign typed data, sign transaction, sign authorization, and the Solana equivalents"
				width={926}
				height={695}
				caption="The agent doesn't get a key. It gets a menu — sign this, sign that, and nothing outside it."
			/>
			<P>
				Two layers of custody, plus the guards we stack on top. It matters which layer does what — so
				here&apos;s the honest breakdown.
			</P>
			<P>
				<Strong>1. The key never leaves the vault.</Strong> Every FrostyFi agent wallet is created
				inside <A href='https://portal.thirdweb.com/vault'>ThirdWeb Vault</A>. The private key is
				generated and held there. When we create a wallet, we get back an address and an id —{' '}
				<Em>not</Em> a key. The raw private key never touches your workflow, never touches the agent,
				never touches our servers. There is no key to leak, because nobody downstream ever has one.
			</P>
			<P>
				<Strong>2. The agent signs through a scoped, revocable token — not a key.</Strong> Instead of
				a key, the agent signs through a Vault access token. That token is policy-restricted: it can
				be locked to a specific wallet, and to specific operations — sign a transaction, sign typed
				data, sign a message, and nothing else. Tokens expire, and you can revoke one at any time.
				Revoke it, and the agent is instantly powerless — no redeploy, no key rotation, no drama.
			</P>
			<P>
				<Strong>Plus: extra guards on the nodes that spend.</Strong> Custody decides{' '}
				<Em>who can sign what</Em>. On top of that, individual nodes add their own limits. Our x402
				Pay node, for instance, enforces a hard per-call spend cap — it checks the amount an endpoint
				demands against the ceiling <Em>you</Em> set <Em>before</Em> it ever asks the Vault to sign,
				and refuses anything over the line. It also won&apos;t pay itself or reach private URLs.
				That&apos;s not custody — it&apos;s belt-and-suspenders on the spend path.
			</P>

			<H2>What this actually buys you</H2>
			<P>
				Put the layers together and walk the worst case. Say an attacker fully hijacks the prompt and
				tells your agent to drain the wallet:
			</P>
			<UL>
				<LI>It can&apos;t reach a private key — there isn&apos;t one to reach.</LI>
				<LI>
					It can only touch the wallet its token is scoped to, using the operations that token allows
					— nothing outside the menu.
				</LI>
				<LI>On a spend node, it can&apos;t even authorize a payment over the cap you set.</LI>
				<LI>Suspect something&apos;s off? Revoke the token and it&apos;s over, immediately.</LI>
			</UL>
			<P>
				That&apos;s not &quot;trust the agent.&quot; It&apos;s <Strong>defense in depth</Strong> — the
				keys locked in the Vault, the token scoped to a wallet and a set of operations, and a spend
				cap on top wherever money moves. Even a completely compromised agent runs into a wall it
				can&apos;t climb.
			</P>

			<H2>This isn&apos;t a whitepaper — it&apos;s shipped</H2>
			<P>
				We didn&apos;t design this on a napkin. Vault-signed transactions are already going out across
				chains — swaps and bridges settling on-chain, USDC payments over x402 on Base — every one of
				them signed through the Vault, with the private key never once in the picture.
			</P>
			<Figure
				src='/screenshots/vault-bridge-completed.jpg'
				alt='A workflow node that signs a bridge transaction with the Vault, broadcasts it, and shows a completed on-chain result'
				width={1664}
				height={911}
				caption={`"Signs with Vault, broadcasts, polls for completion" — a real COMPLETED transaction. The key never surfaced.`}
			/>
			<P>
				And it isn&apos;t one chain or one trick — the same Vault wallet signs across EVM and Solana:
			</P>
			<Figure
				src='/screenshots/vault-solana-transfer.jpg'
				alt='A Vault Sol Wallet node feeding a Solana transfer step in the workflow builder'
				width={1363}
				height={896}
				caption='One Vault, any chain — plug the wallet into the step, it signs, you never touch a key.'
			/>
			<Callout>
				Receipt: a Vault-signed payment, settled on{' '}
				<A href='https://basescan.org/tx/0xf332a99a5494910d9036eaf9d57f83d1e04820fd57be6fadfbcbdb690015f06a'>
					Base
				</A>{' '}
				— the authorization signed inside the Vault, the private key never exposed.
			</Callout>

			<H2>Give your agent a wallet — not the keys</H2>
			<P>
				If you&apos;re building agents that spend, the question was never &quot;can it pay?&quot;
				It&apos;s &quot;what&apos;s the blast radius when it goes wrong?&quot; We built FrostyFi so the
				answer is: small, scoped, and revocable. Give your agent a wallet. Just don&apos;t give it the
				keys.
			</P>
		</>
	);
}
