import { Sensor } from '@/types/game'

interface PredictionDisplayProps {
  predictions: string[]
  sensors: Sensor[]
  onRemove: (index: number) => void
}

export function PredictionDisplay({ predictions, sensors, onRemove }: PredictionDisplayProps) {
  const getSensorById = (id: string) => {
    return sensors.find(sensor => sensor.id === id)
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-center text-secondary">Your Prediction</h3>
      
      {predictions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Select 3 touch sensors in the order you predict the ball will hit them</p>
        </div>
      ) : (
        <div className="space-y-3">
          {predictions.map((predictionId, index) => {
            const sensor = getSensorById(predictionId)
            if (!sensor) return null
            
            return (
              <div
                key={`${predictionId}-${index}`}
                className="flex items-center justify-between bg-gray-800/50 border border-gray-600 rounded-lg p-4 transition-all duration-300 hover:bg-gray-800/70"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: sensor.color }}
                  />
                  <div>
                    <span className="font-medium text-white">{sensor.name}</span>
                    <span className="text-sm text-gray-400 ml-2">+{sensor.points} pts</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemove(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1"
                  title="Remove prediction"
                >
                  X
                </button>
              </div>
            )
          })}
          
          {Array.from({ length: 3 - predictions.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="flex items-center gap-4 bg-gray-800/20 border border-gray-700 border-dashed rounded-lg p-4"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-gray-400 font-bold">
                {predictions.length + index + 1}
              </div>
              <span className="text-gray-500">Select a sensor...</span>
            </div>
          ))}
          
          {predictions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Potential Score:</span>
                <span className="text-xl font-bold text-accent">
                  +{predictions.reduce((total, predictionId) => {
                    const sensor = getSensorById(predictionId)
                    return total + (sensor?.points || 0)
                  }, 0)} pts
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Perfect prediction = Bonus round + Extra points!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
