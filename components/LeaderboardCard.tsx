import { LeaderboardEntry } from '@/types/game'

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  rank: number
}

export function LeaderboardCard({ entry, rank }: LeaderboardCardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'
      case 2:
        return 'text-gray-300 border-gray-300/20 bg-gray-300/5'
      case 3:
        return 'text-orange-400 border-orange-400/20 bg-orange-400/5'
      default:
        return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5'
    }
  }

  const getRankIcon = (rank: number) => {
    return `#${rank}`
  }

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 hover:scale-105 ${getRankColor(rank)}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">
            {getRankIcon(rank)}
          </span>
          <div>
            <h3 className="font-bold text-lg">{entry.playerName}</h3>
            <p className="text-sm opacity-70">{entry.gamesPlayed} games played</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{entry.score.toLocaleString()}</p>
          <p className="text-sm opacity-70">{entry.perfectRounds} perfect rounds</p>
        </div>
      </div>
      <div className="text-xs opacity-50">
        Last played: {new Date(entry.lastPlayed).toLocaleDateString()}
      </div>
    </div>
  )
}
