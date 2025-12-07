'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SensorSelector } from '@/components/SensorSelector'
import { PredictionDisplay } from '@/components/PredictionDisplay'
import sensorsData from '@/data/sensors.json'
import { Sensor } from '@/types/game'

export default function GamePage() {
  const [predictions, setPredictions] = useState<string[]>([])
  const [playerName, setPlayerName] = useState('')
  const sensors: Sensor[] = sensorsData.sensors

  const handleSensorSelect = (sensorId: string) => {
    if (predictions.length < 3 && !predictions.includes(sensorId)) {
      setPredictions([...predictions, sensorId])
    }
  }

  const handleRemovePrediction = (index: number) => {
    setPredictions(predictions.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setPredictions([])
  }

  const canStart = predictions.length === 3 && playerName.trim().length > 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">PINBALL</div>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            START GAME
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Predict the ball path before the round starts
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-300 mb-2">
            Enter Your Name
          </label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            maxLength={20}
          />
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-900/40"></div>
            
            <div className="relative h-96 bg-gray-800/50 rounded-xl border border-gray-600">
              <SensorSelector 
                sensors={sensors}
                selectedSensors={predictions}
                onSensorSelect={handleSensorSelect}
              />
              
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg animate-pulse"></div>
                <div className="text-xs text-gray-400 mt-1 text-center">Ball</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <PredictionDisplay 
            predictions={predictions}
            sensors={sensors}
            onRemove={handleRemovePrediction}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleClear}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            disabled={predictions.length === 0}
          >
            Clear
          </button>
          
          <Link
            href={canStart ? `/game/running?predictions=${predictions.join(',')}&player=${encodeURIComponent(playerName)}` : '#'}
            className={`px-12 py-3 font-bold rounded-lg text-xl transition-all duration-300 transform ${
              canStart
                ? 'bg-primary hover:bg-primary/80 text-white hover:scale-105 glow-pink'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!canStart) {
                e.preventDefault()
              }
            }}
          >
            START
          </Link>
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4 text-secondary">Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <span className="text-primary font-medium">Step 1:</span> Enter your player name
            </div>
            <div>
              <span className="text-secondary font-medium">Step 2:</span> Click 3 touch sensors in order
            </div>
            <div>
              <span className="text-accent font-medium">Step 3:</span> Press START to launch!
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
