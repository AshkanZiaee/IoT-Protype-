import { Sensor } from '@/types/game'

interface ResultsComparisonProps {
  predictions: string[]
  actualPath: string[]
  sensors: Sensor[]
}

export function ResultsComparison({ predictions, actualPath, sensors }: ResultsComparisonProps) {
  const getSensorById = (id: string) => {
    return sensors.find(sensor => sensor.id === id)
  }

  const isCorrect = (predictionId: string, index: number) => {
    return predictionId === actualPath[index]
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6 text-center text-secondary">Prediction vs Actual Path</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary">YOUR PREDICTION</h4>
          <div className="space-y-3">
            {predictions.map((predictionId, index) => {
              const sensor = getSensorById(predictionId)
              const correct = isCorrect(predictionId, index)
              
              if (!sensor) return null
              
              return (
                <div
                  key={`prediction-${index}`}
                  className={`flex items-center gap-4 p-3 rounded-lg border ${
                    correct 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-red-900/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: sensor.color }}
                  />
                  <div className="flex-1">
                    <span className="font-medium text-white">{sensor.name}</span>
                    <span className="text-sm text-gray-400 ml-2">+{sensor.points} pts</span>
                  </div>
                  <div className="text-xl">
                    {correct ? 'CORRECT' : 'WRONG'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-secondary">ACTUAL PATH</h4>
          <div className="space-y-3">
            {actualPath.map((actualId, index) => {
              const sensor = getSensorById(actualId)
              const correct = isCorrect(predictions[index], index)
              
              if (!sensor) return null
              
              return (
                <div
                  key={`actual-${index}`}
                  className={`flex items-center gap-4 p-3 rounded-lg border ${
                    correct 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-gray-800/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: sensor.color }}
                  />
                  <div className="flex-1">
                    <span className="font-medium text-white">{sensor.name}</span>
                    <span className="text-sm text-gray-400 ml-2">+{sensor.points} pts</span>
                  </div>
                  <div className="text-xl">
                    {correct ? 'HIT' : 'MISS'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {predictions.filter((pred, i) => pred === actualPath[i]).length}
            </div>
            <div className="text-sm text-gray-400">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {predictions.filter((pred, i) => pred !== actualPath[i]).length}
            </div>
            <div className="text-sm text-gray-400">Incorrect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {((predictions.filter((pred, i) => pred === actualPath[i]).length / 3) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
