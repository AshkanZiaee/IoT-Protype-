'use client'

import { useState, useEffect } from 'react'
import sensorsData from '@/data/sensors.json'
import gameSimulation from '@/data/gameSimulation.json'

interface PinballAnimationProps {
  isLaunching: boolean
  predictions: string[]
}

export function PinballAnimation({ isLaunching, predictions }: PinballAnimationProps) {
  const [ballPosition, setBallPosition] = useState({ x: 90, y: 85 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [hitSensors, setHitSensors] = useState<string[]>([])
  const sensors = sensorsData.sensors

  useEffect(() => {
    if (!isLaunching && !isAnimating) {
      setIsAnimating(true)
      
      const randomResult = gameSimulation.gameResults[
        Math.floor(Math.random() * gameSimulation.gameResults.length)
      ]
      
      const animationSteps: Array<{ x: number; y: number; delay: number; hitSensor?: string }> = []
      
      animationSteps.push({ x: 90, y: 85, delay: 0 })
      
      randomResult.actualPath.forEach((sensorId, index) => {
        const sensor = sensors.find(s => s.id === sensorId)
        if (sensor) {
          const sensorX = (sensor.position.x / 600) * 100
          const sensorY = (sensor.position.y / 400) * 100
          
          const randomOffsetX = (Math.random() - 0.5) * 10
          const randomOffsetY = (Math.random() - 0.5) * 10
          
          if (index === 0) {
            animationSteps.push({ 
              x: sensorX + randomOffsetX, 
              y: sensorY + randomOffsetY + 20, 
              delay: 800 + (index * 1000) 
            })
          }
          
          animationSteps.push({ 
            x: sensorX, 
            y: sensorY, 
            delay: 1200 + (index * 1000),
            hitSensor: sensorId
          })
          
          animationSteps.push({ 
            x: sensorX + randomOffsetX * 2, 
            y: sensorY + randomOffsetY + 15, 
            delay: 1400 + (index * 1000) 
          })
        }
      })
      
      animationSteps.push({ x: 50, y: 90, delay: 4000 })

      animationSteps.forEach((step) => {
        setTimeout(() => {
          setBallPosition({ x: step.x, y: step.y })
          if (step.hitSensor) {
            setHitSensors(prev => [...prev, step.hitSensor!])
          }
        }, step.delay)
      })
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('actualPath', JSON.stringify(randomResult.actualPath))
        sessionStorage.setItem('gameDuration', randomResult.duration.toString())
      }
    }
  }, [isLaunching, isAnimating, sensors])

  return (
    <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-900/40"></div>
      
      <div className="relative h-96 bg-gray-800/50 rounded-xl border border-gray-600 overflow-hidden">
        
        {sensors.map((sensor) => {
          const isHit = hitSensors.includes(sensor.id)
          const isPredicted = predictions.includes(sensor.id)
          
          return (
            <div
              key={sensor.id}
              className={`absolute w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                isHit 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/50 animate-ping' 
                  : isPredicted 
                  ? 'border-blue-400 shadow-lg shadow-blue-400/50 animate-pulse opacity-90' 
                  : 'border-blue-400 opacity-60'
              }`}
              style={{
                left: `${(sensor.position.x / 600) * 100}%`,
                top: `${(sensor.position.y / 400) * 100}%`,
                backgroundColor: isHit ? '#fbbf24' : '#1a1a1a',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex items-center justify-center h-full font-bold text-xs text-center px-1">
                <div>
                  <span style={{ color: '#00ffff' }}>Touch </span>
                  <span style={{ color: '#8a2be2' }}>Sensor </span>
                  <span style={{ color: '#ff1493' }}>{sensor.id.slice(-1)}</span>
                </div>
              </div>
            </div>
          )
        })}

        <div
          className={`absolute w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-lg transition-all duration-500 ${
            isAnimating ? 'animate-bounce' : ''
          } ${isLaunching ? 'animate-pulse' : ''}`}
          style={{
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          }}
        />

        {isAnimating && (
          <div
            className="absolute w-3 h-3 bg-white rounded-full opacity-30 transition-all duration-700"
            style={{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        <div className="absolute right-4 top-4 bottom-4 w-8 bg-gray-700 rounded-full border border-gray-600">
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>
      </div>

      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-400">
          <div className={`w-2 h-2 rounded-full ${isLaunching ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
          <span>{isLaunching ? 'Ready to Launch' : 'Ball in Play'}</span>
        </div>
      </div>
    </div>
  )
}
