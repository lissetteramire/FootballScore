import React from "react"

const Game = ({ game, finishGame, updateScore }) => {
  return (
    <div>
      <p>
        {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
      </p>
      <button onClick={() => finishGame(game.homeTeam, game.awayTeam)}>Finish Game</button>
      <button onClick={() => updateScore(game.homeTeam, game.awayTeam, game.homeScore + 1, game.awayScore)}>Update Home Score</button>
      <button onClick={() => updateScore(game.homeTeam, game.awayTeam, game.homeScore, game.awayScore + 1)}>Update Away Score</button>
    </div>
  )
}

export default Game
