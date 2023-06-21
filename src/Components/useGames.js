import { useState } from "react"

const useGames = () => {
  const [games, setGames] = useState([])

  const startGame = (homeTeam, awayTeam) => {
    setGames(prevGames => [...prevGames, { homeTeam, awayTeam, homeScore: 0, awayScore: 0 }])
  }

  const finishGame = (homeTeam, awayTeam) => {
    setGames(prevGames => prevGames.filter(game => game.homeTeam !== homeTeam && game.awayTeam !== awayTeam))
  }

  const updateScore = (homeTeam, awayTeam, homeScore, awayScore) => {
    setGames(prevGames =>
      prevGames.map(game => {
        if (game.homeTeam === homeTeam && game.awayTeam === awayTeam) {
          return { ...game, homeScore, awayScore }
        }
        return game
      })
    )
  }

  const getSummary = () => {
    return games.sort((a, b) => b.homeScore + b.awayScore - (a.homeScore + a.awayScore))
  }

  return { games, startGame, finishGame, updateScore, getSummary }
}

export default useGames
