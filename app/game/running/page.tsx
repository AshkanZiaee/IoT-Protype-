'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PinballAnimation } from '@/components/PinballAnimation'
import gameSimulation from '@/data/gameSimulation.json'

function GameRunningContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLaunching, setIsLaunching] = useState(true)
  const [countdown, setCountdown] = useState(3)

  const predictions = searchParams.get('predictions')?.split(',') || []
  const playerName = searchParams.get('player') || 'Player'

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setIsLaunching(false)
          
          setTimeout(() => {
            const actualPath = JSON.parse(sessionStorage.getItem('actualPath') || '[]')
            const duration = sessionStorage.getItem('gameDuration') || '3000'
            
            const resultsParams = new URLSearchParams({
              predictions: predictions.join(','),
              actual: actualPath.join(','),
              player: playerName,
              duration: duration
            })
            
            router.push(`/game/results?${resultsParams.toString()}`)
          }, 4500)
          
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [predictions, playerName, router])

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          {isLaunching ? (
            <>
              <h1 className="text-4xl font-bold mb-4 text-primary">
                LAUNCHING IN...
              </h1>
              <div className="text-8xl font-bold text-white animate-pulse">
                {countdown}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                GAME RUNNING...
              </h1>
              <p className="text-xl text-gray-300">
                Please wait while the ball is launched.
              </p>
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <PinballAnimation 
            isLaunching={isLaunching}
            predictions={predictions}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-secondary">Your Predictions</h3>
            <div className="flex justify-center gap-4">
              {predictions.map((prediction, index) => {
                const sensorNames = {
                  'sensor1': 'Touch Sensor 1',
                  'sensor2': 'Touch Sensor 2', 
                  'sensor3': 'Touch Sensor 3'
                }
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                      {index + 1}
                    </div>
                    <div className="text-sm text-gray-300">
                      {sensorNames[prediction as keyof typeof sensorNames] || prediction}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {!isLaunching && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-2">Calculating results...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function GameRunningPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading...</div>}>
      <GameRunningContent />
    </Suspense>
  )
}
