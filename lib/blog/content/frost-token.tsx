import { A, Callout, H2, Lead, LI, P, Strong, UL } from '@/components/blog/prose';

export function FrostToken() {
	return (
		<>
			<Lead>
				Most AI tokens pay you in more of the token. That is just sell pressure with extra
				steps.
			</Lead>

			<P>
				The AI-token graveyard is full of the same design: emit the reward token to
				stakers, who sell it, forever. It looks like yield and behaves like inflation. When
				we designed FrostyFi&apos;s token we started from the opposite rule:{' '}
				<Strong>no reward is ever paid in a token whose only use is selling it.</Strong>{' '}
				Every emission is finite, every ongoing yield is paid in USDC, and every utility
				spend burns supply.
			</P>
			<P>
				Here is the whole thing — <Strong>$FROST</Strong>, the liquidity it builds, and how
				you earn it by paying for a product that already works.
			</P>

			<H2>Earned, not sold</H2>
			<P>
				$FROST has a <Strong>hard cap of 100,000,000</Strong> — no presale, no VC, no
				insider round. It is distributed to the people who pay for FrostyFi, through finite
				emissions that halve every $25,000 of product revenue — Bitcoin-shaped, verifiable
				on-chain, and impossible to fake without paying the protocol real money. You earn in
				proportion to what you pay; a free rider earns nothing.
			</P>
			<P>
				The one disclosed exception is a <Strong>10% dev reward</Strong>, minted only as
				paying customers earn theirs, on the exact same claim terms. No presale, no pre-mine,
				nothing at launch. We say &quot;a disclosed 10%,&quot; never &quot;0% fair
				launch&quot; — the Base audience reads the contract, and announcing a team share
				later is a rug no matter how sound the reasoning.
			</P>

			<H2>A reserve that only fills</H2>
			<P>
				A third of every payment routes on-chain to{' '}
				<Strong>Protocol-Owned Liquidity</Strong>. Before launch it accumulates as USDC in a
				public reserve that is never spent — you can watch the balance on Basescan. At
				launch, the whole reserve becomes permanent FROST/USDC liquidity that the protocol
				owns and never sells. After launch, every payment keeps market-buying into it, so
				revenue becomes real, verifiable buy pressure — not a batch you have to trust
				happens.
			</P>

			<H2>Lock for real yield — in USDC</H2>
			<P>
				<Strong>Holding $FROST alone earns nothing.</Strong> Lock it into a soulbound PERMA
				position — your locked FROST, non-transferable, like Curve&apos;s veCRV — and you
				earn a share of protocol revenue in <Strong>USDC</Strong> from two sources:
			</P>
			<UL>
				<LI>the USDC side of POL trading fees, 100%, and</LI>
				<LI>a disclosed cut of the DAO&apos;s earnings.</LI>
			</UL>
			<P>
				Because the DAO is not a piggy bank. It runs a fleet of first-party x402 agents,
				bribes for deeper liquidity, and invests its treasury under vote — an active earner
				that shares what it makes with lockers. When your term ends you unlock and your FROST
				returns; locking is escrow, not spending.
			</P>

			<H2>Burned on use</H2>
			<P>
				Every $FROST spent on a FrostyFi utility — FrostyG4 inference, Architect builds,
				priority execution — is <Strong>100% burned</Strong>. Deflation scales with real
				usage. FROST prices only things we self-host, so accepting a volatile token never
				forces us to sell it to cover a bill.
			</P>

			<H2>Accelerating the liquidity: bonds</H2>
			<P>
				Revenue builds POL steadily. Bonds build it fast. After launch, anyone can deposit
				USDC and receive $FROST at a public, demand-driven discount — around 10% at open,
				tightening automatically as bonding demand rises — vesting over about a week. The
				protocol keeps the USDC and deploys it straight into POL.
			</P>
			<P>
				It solves the two things a young token lacks at once: depth and float. The bonder
				gets size a thin pool could never fill; the protocol gets the liquidity it was
				missing — <Strong>a single $10k bond can add more depth than months of revenue</Strong>.
				It is permissionless and fair — a public discount, no whitelist, no insider price —
				backed by an 18M-FROST reserve and capped by a treasury debt ceiling so it can never
				over-issue. Bond principal is funding, not revenue: it never touches the emission
				schedule.
			</P>

			<H2>What is live today</H2>
			<P>The revenue engine is already on Base — deployed and source-verified:</P>
			<UL>
				<LI>
					<A href='https://basescan.org/address/0x5663213c20dd4d62E6f69ec240FE2f4e88B4dFd6#code'>
						Revenue Splitter
					</A>{' '}
					— splits every payment across five buckets in one transaction.
				</LI>
				<LI>
					<A href='https://basescan.org/address/0xad75685B9F297aab468b584bC2E084D7677E58cB'>
						POL Reserve
					</A>{' '}
					— the public address that only accumulates.
				</LI>
				<LI>
					Owned by a 48-hour timelock behind a multisig — nothing changes without public
					notice.
				</LI>
			</UL>
			<Callout>
				The token has not launched — TGE is to be determined, and nothing is required to use
				FrostyFi today. Everything above is published in advance so the terms are known, not
				sprung at launch. Read the full design in the{' '}
				<A href='https://docs.frostylabs.ai/docs/tokenomics'>tokenomics</A> and{' '}
				<A href='https://docs.frostylabs.ai/docs/pol'>POL</A> docs.
			</Callout>
		</>
	);
}
