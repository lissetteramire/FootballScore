import React, { useState } from "react"
import Game from "./Game"
import useGames from "./useGames"

const ScoreBoard = () => {
  const { games, startGame, finishGame, updateScore, getSummary } = useGames()
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")

  const handleStartGame = () => {
    startGame(homeTeam, awayTeam)
    setHomeTeam("")
    setAwayTeam("")
  }

  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <input type="text" value={homeTeam} onChange={e => setHomeTeam(e.target.value)} placeholder="Home Team" />
      <input type="text" value={awayTeam} onChange={e => setAwayTeam(e.target.value)} placeholder="Away Team" />
      <button onClick={handleStartGame}>Start Game</button>
      {getSummary().map((game, index) => (
        <Game key={index} game={game} finishGame={finishGame} updateScore={updateScore} />
      ))}
    </div>
  )
}
export default ScoreBoard
