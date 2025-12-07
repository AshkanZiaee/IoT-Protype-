export interface Sensor {
  id: string
  name: string
  position: {
    x: number
    y: number
  }
  color: string
  points: number
}

export interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  gamesPlayed: number
  perfectRounds: number
  lastPlayed: string
}

export interface GameResult {
  id: string
  actualPath: string[]
  duration: number
  timestamp: string
}

export interface GameSession {
  id: string
  playerName: string
  predictions: string[]
  actualPath: string[]
  score: number
  correctPredictions: number
  totalPredictions: number
  isComplete: boolean
  rounds: GameRound[]
  startTime: string
  endTime?: string
}

export interface GameRound {
  roundNumber: number
  predictions: string[]
  actualPath: string[]
  score: number
  correctCount: number
  isComplete: boolean
  isPerfect: boolean
}

export interface GameState {
  currentSession: GameSession | null
  isPlaying: boolean
  isLoading: boolean
  currentRound: number
}

export type GameStatus = 'idle' | 'predicting' | 'running' | 'results' | 'complete'
