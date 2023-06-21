import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Game from "../Components/Game"

describe("Game component", () => {
  const game = {
    homeTeam: "Home",
    awayTeam: "Away",
    homeScore: 0,
    awayScore: 0
  }

  it("renders game information correctly", () => {
    const { getByText } = render(<Game game={game} />)
    expect(getByText("Home 0 - Away 0")).toBeInTheDocument()
  })

  it("calls finishGame function when 'Finish Game' button is clicked", () => {
    const finishGameMock = jest.fn()
    const { getByText } = render(<Game game={game} finishGame={finishGameMock} />)

    const finishGameButton = getByText("Finish Game")
    fireEvent.click(finishGameButton)

    expect(finishGameMock).toHaveBeenCalledWith("Home", "Away")
  })

  it("calls updateScore function with updated home score when 'Update Home Score' button is clicked", () => {
    const updateScoreMock = jest.fn()
    const { getByText } = render(<Game game={game} updateScore={updateScoreMock} />)

    const updateHomeScoreButton = getByText("Update Home Score")
    fireEvent.click(updateHomeScoreButton)

    expect(updateScoreMock).toHaveBeenCalledWith("Home", "Away", 1, game.awayScore)
  })

  it("calls updateScore function with updated away score when 'Update Away Score' button is clicked", () => {
    const updateScoreMock = jest.fn()
    const { getByText } = render(<Game game={game} updateScore={updateScoreMock} />)

    const updateAwayScoreButton = getByText("Update Away Score")
    fireEvent.click(updateAwayScoreButton)

    expect(updateScoreMock).toHaveBeenCalledWith("Home", "Away", game.homeScore, 1)
  })
})
