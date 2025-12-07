'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ResultsComparison } from '@/components/ResultsComparison'
import sensorsData from '@/data/sensors.json'

export default function GameResultsPage() {
  const searchParams = useSearchParams()
  
  const predictions = searchParams.get('predictions')?.split(',') || []
  const actualPath = searchParams.get('actual')?.split(',') || []
  const playerName = searchParams.get('player') || 'Player'
  const duration = parseInt(searchParams.get('duration') || '0')

  const sensors = sensorsData.sensors

  const correctPredictions = predictions.filter((prediction, index) => 
    prediction === actualPath[index]
  ).length

  const totalPossiblePoints = predictions.reduce((total, predictionId) => {
    const sensor = sensors.find(s => s.id === predictionId)
    return total + (sensor?.points || 0)
  }, 0)

  const earnedPoints = predictions.reduce((total, predictionId, index) => {
    if (predictionId === actualPath[index]) {
      const sensor = sensors.find(s => s.id === predictionId)
      return total + (sensor?.points || 0)
    }
    return total
  }, 0)

  const isPerfectRound = correctPredictions === 3
  const bonusPoints = isPerfectRound ? 100 : 0
  const finalScore = earnedPoints + bonusPoints

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">PINBALL</div>
            <div className="text-gray-400">
              Player: <span className="text-white font-medium">{playerName}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            RESULT
          </h1>
          
          {isPerfectRound ? (
            <div className="mb-6">
              <div className="text-2xl font-bold text-accent mb-2">PERFECT PREDICTION!</div>
              <div className="text-lg text-gray-300">All sensors predicted correctly!</div>
            </div>
          ) : (
            <div className="mb-6">
              <div className="text-xl text-gray-300">
                {correctPredictions} out of 3 predictions correct
              </div>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-secondary">Points Earned</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Correct Predictions:</span>
                <span className="text-white font-medium">{correctPredictions}/3</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Base Points:</span>
                <span className="text-white font-medium">+{earnedPoints}</span>
              </div>
              
              {isPerfectRound && (
                <div className="flex justify-between items-center text-accent">
                  <span>Perfect Bonus:</span>
                  <span className="font-medium">+{bonusPoints}</span>
                </div>
              )}
              
              <div className="border-t border-gray-600 pt-3">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Score:</span>
                  <span className="text-accent">{finalScore.toLocaleString()} Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <ResultsComparison 
            predictions={predictions}
            actualPath={actualPath}
            sensors={sensors}
          />
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{(duration / 1000).toFixed(1)}s</div>
              <div className="text-sm text-gray-400">Game Duration</div>
            </div>
            <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning">{((correctPredictions / 3) * 100).toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {isPerfectRound && (
            <Link
              href={`/game?player=${encodeURIComponent(playerName)}`}
              className="px-8 py-3 bg-accent hover:bg-accent/80 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 glow-green"
            >
              EXTRA TURN EARNED!
            </Link>
          )}
          
          <Link
            href={`/game?player=${encodeURIComponent(playerName)}`}
            className="px-8 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Play Again
          </Link>
          
          <Link
            href="/"
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Home
          </Link>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 max-w-md mx-auto">
            {isPerfectRound 
              ? "Amazing! You've earned an extra turn. Keep the streak going!"
              : correctPredictions >= 2
              ? "Great job! You're getting the hang of it. Try again!"
              : "Keep practicing! Each game helps you understand the ball physics better."
            }
          </p>
        </div>
      </main>
    </div>
  )
}
