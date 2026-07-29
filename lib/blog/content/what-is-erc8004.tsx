import { A, Callout, Em, H2, LI, Lead, OL, P, Strong, UL } from '@/components/blog/prose';

export function WhatIsErc8004() {
	return (
		<>
			<Lead>
				ERC-8004 gives an AI agent three things it can&apos;t otherwise have: a permanent identity, a
				reputation that follows it, and attestations from third parties. All on-chain, all readable
				by anyone, none of it owned by a platform.
			</Lead>

			<P>
				If you&apos;ve only skimmed the name, here is the short version. ERC-8004 is an Ethereum
				standard made of <Strong>three registries</Strong>. Each answers one question about an
				autonomous agent:
			</P>
			<UL>
				<LI>
					<Strong>Identity</Strong> — who is this agent, and who controls it?
				</LI>
				<LI>
					<Strong>Reputation</Strong> — what do people who used it say?
				</LI>
				<LI>
					<Strong>Validation</Strong> — has a third party independently verified anything about it?
				</LI>
			</UL>
			<P>
				That&apos;s the whole standard. Everything else is detail. We&apos;ve been running agents
				against the live registries on Base since June, so what follows is what it does in practice,
				not just what the spec says.
			</P>

			<H2>The problem it exists to solve</H2>
			<P>
				Agents are starting to transact with each other. One agent calls another&apos;s API, pays for
				it, and uses the result. That works fine when a human vetted both ends. It stops working the
				moment an agent has to decide, unattended, whether to trust a counterparty it has never seen.
			</P>
			<P>
				Every option before ERC-8004 was a walled garden. A marketplace vouches for its listings, a
				platform hosts its own reviews, an API key implies a relationship. All of it dies when you
				leave the platform, and none of it is legible to an agent running somewhere else.
			</P>
			<P>
				ERC-8004 moves the three things that matter — identity, reputation, attestation — onto chains
				where nobody has to be asked for permission to read them.
			</P>

			<H2>Identity: an agent is an NFT</H2>
			<P>
				The Identity Registry is an ERC-721 contract. Registering an agent mints a token to whoever
				sends the transaction, and that token <Em>is</Em> the identity. Ownership is by address, so
				the identity is transferable, and the owner can point its metadata anywhere.
			</P>
			<P>
				That metadata — the registration file — is a JSON document naming the agent, describing what
				it does, and listing the endpoints where it can actually be reached. Store it on IPFS and the
				identity survives any platform that helped create it. We wrote about{' '}
				<A href='/blog/agent-identity-portability'>why that matters for lock-in</A> separately.
			</P>
			<P>
				Agents are addressed as <Em>chainId:tokenId</Em> — so <Em>8453:54630</Em> is agent 54630 on
				Base. Globally unique, no registrar required.
			</P>

			<H2>Reputation: feedback anyone can write</H2>
			<P>
				The Reputation Registry stores feedback signals against an agent ID. Each one carries a signed
				numeric value with a decimal precision, one or two tags describing what&apos;s being rated,
				the endpoint reviewed, and optionally an IPFS pointer to a longer payload.
			</P>
			<P>
				The tags are what make it more than a star rating. The same registry holds{' '}
				<Em>starred</Em> for a 1-to-5 review, <Em>uptime</Em> and <Em>successRate</Em> as percentages,{' '}
				<Em>responseTime</Em>, even <Em>tradingYield</Em>. Reading reputation means picking a tag and
				asking for the aggregate under it.
			</P>
			<Callout>
				<Strong>Feedback is permissionless.</Strong> The only thing the contract enforces is that you
				can&apos;t review your own agent. Anyone can write anything about anyone else, for the cost of
				gas — which means a raw review count is not a usage count, and any application that cares
				should gate writes itself.
			</Callout>
			<P>
				Because it&apos;s keyed to the agent ID rather than to a wallet or a host, reputation survives
				the agent moving. That&apos;s the property that makes it worth accumulating.
			</P>

			<H2>Validation: attestations from someone else</H2>
			<P>
				The third registry is the least used and the most interesting. An agent&apos;s owner requests
				validation from a specific validator address. The validator does whatever checking it does
				off-chain — a TEE attestation, a staking proof, a manual audit — and writes back a score from
				0 to 100 plus an IPFS pointer to its evidence.
			</P>
			<P>
				Reputation is what users claim. Validation is what a designated third party will put its name
				behind. The standard doesn&apos;t say who validators should be; that market hasn&apos;t really
				formed yet.
			</P>

			<H2>What it deliberately doesn&apos;t do</H2>
			<P>Worth being clear, because the name invites bigger assumptions:</P>
			<OL>
				<LI>
					<Strong>It isn&apos;t a payment system.</Strong> Agents paying each other is a separate
					problem, solved by things like <A href='/blog/agent-that-earns'>x402</A>. ERC-8004 says who
					an agent is, not how it gets paid.
				</LI>
				<LI>
					<Strong>It doesn&apos;t verify capability.</Strong> Nothing checks that an agent does what
					its registration file claims. That&apos;s what the Validation Registry is for, and using it
					is optional.
				</LI>
				<LI>
					<Strong>It doesn&apos;t make reputation trustworthy.</Strong> It makes reputation{' '}
					<Em>portable and readable</Em>. Whether a given score means anything is still your judgment
					call.
				</LI>
				<LI>
					<Strong>There is no token.</Strong> ERC-8004 is a set of contracts, not a network or an
					asset.
				</LI>
			</OL>

			<H2>Where it&apos;s actually live</H2>
			<P>
				The registries deploy to deterministic vanity addresses beginning <Em>0x8004</Em>, which are
				the same across many chains — Ethereum, Base, and a growing list of others.
			</P>
			<P>
				One warning, because it cost us real time: <Strong>identical-looking addresses are not
				interchangeable across networks.</Strong> Two sets get deployed to every chain, and on any
				given network only one of them is the upgraded, canonical registry. The other is a live
				placeholder that answers calls and returns nothing useful. Check{' '}
				<Em>getVersion()</Em> before you trust an address —{' '}
				<A href='/blog/erc8004-silent-failures'>we wrote up that failure mode and three others</A>.
			</P>

			<H2>Should you use it</H2>
			<P>
				If you&apos;re building an agent that only ever talks to your own systems, no — you already
				know who it is.
			</P>
			<P>
				It starts paying off the moment your agent is called by software you don&apos;t control, or
				calls software that doesn&apos;t know you. That&apos;s when a portable identity and a
				readable track record stop being nice-to-haves and start being the thing that lets a stranger
				decide whether to transact with you.
			</P>
			<P>
				That&apos;s the bet, anyway. The standard is young, the validator market barely exists, and
				the tooling has sharp edges. It&apos;s still the most credible answer anyone has to a question
				that gets more urgent every month.
			</P>
		</>
	);
}
