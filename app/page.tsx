import Link from 'next/link'
import { LeaderboardCard } from '@/components/LeaderboardCard'
import leaderboardData from '@/data/leaderboard.json'

export default function Home() {
  const topPlayers = leaderboardData.leaderboard.slice(0, 5)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">THM PINBALL</div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                HOME
              </Link>
              <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
                LEADERBOARD
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                ABOUT US
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                CONTACT US
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
            THM PINBALL
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Predict the ball path before the round starts. Get all three sensors correct to earn bonus points and continue your streak!
          </p>
          
          <Link 
            href="/game"
            className="inline-block bg-primary hover:bg-primary/80 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 glow-pink animate-float"
          >
            START GAME
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">3</div>
            <div className="text-gray-400">Touch Sensors Available</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">3</div>
            <div className="text-gray-400">Predictions Per Round</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">∞</div>
            <div className="text-gray-400">Rounds (Perfect Streak)</div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Top Players</h2>
            <Link 
              href="/leaderboard" 
              className="text-secondary hover:text-secondary/80 transition-colors font-medium"
            >
              View Full Leaderboard
            </Link>
          </div>
          
          <div className="grid gap-4">
            {topPlayers.map((entry, index) => (
              <LeaderboardCard 
                key={entry.id} 
                entry={entry} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-bold mb-2 text-secondary">1. Predict</h4>
              <p className="text-gray-400">Choose 3 touch sensors in the order you think the ball will hit them</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-2 text-warning">2. Launch</h4>
              <p className="text-gray-400">Press START and watch the ball navigate through the pinball machine</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-2 text-accent">3. Score</h4>
              <p className="text-gray-400">Earn points for each correct prediction. Perfect rounds unlock bonus rounds!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
