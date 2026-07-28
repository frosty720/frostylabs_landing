import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { Mission } from "@/components/about/Mission";

export const metadata = {
  title: "About - FrostyLabs.ai | Our Mission",
  description: "Learn about FrostyLabs.ai — our mission, technology, and the future of on-chain AI automation with simple USDC subscriptions, x402 payments, and ERC-8004 agent identity.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#05060b] text-white">
      <Navigation />
      <AboutHero />
      <Mission />
      <Footer />
    </main>
  );
}
