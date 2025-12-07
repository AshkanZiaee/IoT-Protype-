import Link from 'next/link'
import { LeaderboardCard } from '@/components/LeaderboardCard'
import leaderboardData from '@/data/leaderboard.json'

export default function LeaderboardPage() {
  const leaderboard = leaderboardData.leaderboard

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">PINBALL</div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                HOME
              </Link>
              <Link href="/leaderboard" className="text-primary hover:text-primary/80 transition-colors">
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            LEADERBOARD
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Top pinball prediction masters
          </p>
          
          <Link 
            href="/game"
            className="inline-block bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 glow-pink"
          >
            Play Now
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {leaderboard.length}
            </div>
            <div className="text-gray-400">Total Players</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">
              {leaderboard[0]?.score.toLocaleString() || '0'}
            </div>
            <div className="text-gray-400">Highest Score</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {Math.max(...leaderboard.map(p => p.perfectRounds))}
            </div>
            <div className="text-gray-400">Most Perfect Rounds</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              {Math.round(leaderboard.reduce((sum, p) => sum + p.gamesPlayed, 0) / leaderboard.length)}
            </div>
            <div className="text-gray-400">Avg Games Played</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {leaderboard.map((entry, index) => (
              <LeaderboardCard 
                key={entry.id} 
                entry={entry} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-secondary">Think You Can Do Better?</h3>
            <p className="text-gray-300 mb-6">
              Master the art of pinball prediction and climb to the top of the leaderboard!
            </p>
            <Link 
              href="/game"
              className="inline-block bg-accent hover:bg-accent/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 glow-green"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
