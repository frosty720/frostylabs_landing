import { Navigation } from '@/components/Navigation';
import { ScrubHero } from '@/components/hero/ScrubHero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { OnchainProof } from '@/components/sections/OnchainProof';
import { StatsBand } from '@/components/sections/StatsBand';
import { Capabilities } from '@/components/sections/Capabilities';
import { Web3Native } from '@/components/sections/Web3Native';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<main className='min-h-screen bg-[#05060b] text-[#f2f0ff]'>
			<Navigation />
			<ScrubHero />
			<TrustStrip />
			<HowItWorks />
			<OnchainProof />
			<StatsBand />
			<Capabilities />
			<Web3Native />
			<Pricing />
			<FAQ />
			<Footer />
		</main>
	);
}
