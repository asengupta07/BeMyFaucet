import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import LeaderboardPreview from "@/components/leaderboard-preview"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black p-4 antialiased ">
      {/* Particle background */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <LeaderboardPreview />
        <Footer />
      </div>
    </main>
  )
}

