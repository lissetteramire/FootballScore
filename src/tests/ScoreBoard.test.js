import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent } from "@testing-library/react"
import ScoreBoard from "../Components/ScoreBoard"
import useGames from "../Components/useGames"

jest.mock("../Components/useGames", () => ({
  __esModule: true,
  default: () => ({
    games: [],
    startGame: jest.fn(),
    getSummary: jest.fn().mockReturnValue([])
  })
}))

describe("ScoreBoard", () => {
  test("renders component correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ScoreBoard />)
    expect(getByText("Football World Cup Score Board")).toBeInTheDocument()
    expect(getByPlaceholderText("Home Team")).toBeInTheDocument()
    expect(getByPlaceholderText("Away Team")).toBeInTheDocument()
    expect(getByText("Start Game")).toBeInTheDocument()
  })

  test("calls startGame with correct values when Start Game button is clicked", () => {
    const startGameMock = jest.fn()
    useGames().startGame = startGameMock

    const { getByPlaceholderText, getByText } = render(<ScoreBoard />)
    const homeTeamInput = getByPlaceholderText("Home Team")
    const awayTeamInput = getByPlaceholderText("Away Team")
    const startGameButton = getByText("Start Game")

    fireEvent.change(homeTeamInput, { target: { value: "Team A" } })
    fireEvent.change(awayTeamInput, { target: { value: "Team B" } })
    fireEvent.click(startGameButton)

    expect(homeTeamInput.value).toBe("")
    expect(awayTeamInput.value).toBe("")
    expect(startGameMock).toBeCalledTimes(1)
    expect(startGameMock).toBeCalledWith("Team A", "Team B")
  })

  test("renders game summary correctly", () => {
    const summaryData = [
      { homeTeam: "Team A", awayTeam: "Team B", homeScore: 2, awayScore: 1 },
      { homeTeam: "Team C", awayTeam: "Team D", homeScore: 0, awayScore: 0 }
    ]
    useGames().getSummary.mockReturnValue(summaryData)

    const { getByText } = render(<ScoreBoard />)

    expect(useGames().getSummary).toHaveBeenCalledTimes(1)
    expect(getByText("Team A vs Team B")).toBeInTheDocument()
    expect(getByText("Team C vs Team D")).toBeInTheDocument()
    expect(getByText("Home Score: 2")).toBeInTheDocument()
    expect(getByText("Away Score: 1")).toBeInTheDocument()
    expect(getByText("Home Score: 0")).toBeInTheDocument()
    expect(getByText("Away Score: 0")).toBeInTheDocument()
  })
})
