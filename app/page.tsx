import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { VideoDemo } from "@/components/VideoDemo";
import { Stats } from "@/components/Stats";
import { PoweredBy } from "@/components/PoweredBy";
import { UseCases } from "@/components/UseCases";
import { Features } from "@/components/Features";
import { SecurityTrustBadge } from "@/components/SecurityTrustBadge";
import { Pricing } from "@/components/Pricing";
import { LaunchTimeline } from "@/components/LaunchTimeline";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-arctic text-white">
      <Navigation />
      <Hero />
      <VideoDemo />
      <PoweredBy />
      <Stats />
      <UseCases />
      <Features />
      <SecurityTrustBadge />
      <Pricing />
      <LaunchTimeline />
      <FAQ />
      <Footer />
    </main>
  );
}
