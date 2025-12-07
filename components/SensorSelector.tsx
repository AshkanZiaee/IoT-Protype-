import { Sensor } from '@/types/game'

interface SensorSelectorProps {
  sensors: Sensor[]
  selectedSensors: string[]
  onSensorSelect: (sensorId: string) => void
}

export function SensorSelector({ sensors, selectedSensors, onSensorSelect }: SensorSelectorProps) {
  const getSensorOrder = (sensorId: string) => {
    const index = selectedSensors.indexOf(sensorId)
    return index >= 0 ? index + 1 : null
  }

  const isSensorSelected = (sensorId: string) => {
    return selectedSensors.includes(sensorId)
  }

  const canSelectSensor = (sensorId: string) => {
    return selectedSensors.length < 3 && !isSensorSelected(sensorId)
  }

  return (
    <div className="relative w-full h-full">
      {sensors.map((sensor) => {
        const order = getSensorOrder(sensor.id)
        const isSelected = isSensorSelected(sensor.id)
        const canSelect = canSelectSensor(sensor.id)
        
        return (
          <button
            key={sensor.id}
            onClick={() => canSelect && onSensorSelect(sensor.id)}
            disabled={!canSelect && !isSelected}
            className={`absolute w-16 h-16 rounded-lg border-2 transition-all duration-300 transform hover:scale-110 ${
              isSelected
                ? `border-blue-400 bg-opacity-90 shadow-lg shadow-blue-400/50`
                : canSelect
                ? `border-blue-400 hover:border-blue-300 bg-opacity-60 hover:bg-opacity-80`
                : 'border-gray-600 bg-opacity-20 cursor-not-allowed'
            }`}
            style={{
              left: `${(sensor.position.x / 600) * 100}%`,
              top: `${(sensor.position.y / 400) * 100}%`,
              backgroundColor: '#1a1a1a',
              transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.2)' : 'scale(1)'}`,
            }}
          >
            <div className="flex flex-col items-center justify-center h-full font-bold">
              {isSelected ? (
                <span className="text-xl" style={{ color: '#ff1493' }}>{order}</span>
              ) : (
                <div className="text-xs text-center px-1">
                  <span style={{ color: '#00ffff' }}>Touch </span>
                  <span style={{ color: '#8a2be2' }}>Sensor </span>
                  <span style={{ color: '#ff1493' }}>{sensor.id.slice(-1)}</span>
                </div>
              )}
            </div>
            
            {isSelected && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: sensor.color, opacity: 0.3 }}
              />
            )}
          </button>
        )
      })}
      
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="text-gray-400 text-sm font-medium">Pinball Machine</div>
      </div>
    </div>
  )
}
