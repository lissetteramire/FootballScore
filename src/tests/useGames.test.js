import { renderHook, act } from "@testing-library/react-hooks"
import useGames from "../Components/useGames"

describe("useGames hook", () => {
  it("should start a game and update the games list", () => {
    const { result } = renderHook(() => useGames())

    act(() => {
      result.current.startGame("Home", "Away")
    })

    expect(result.current.games).toEqual([{ homeTeam: "Home", awayTeam: "Away", homeScore: 0, awayScore: 0 }])
  })

  it("should finish a game and remove it from the games list", () => {
    const { result } = renderHook(() => useGames())

    act(() => {
      result.current.startGame("Home", "Away")
      result.current.finishGame("Home", "Away")
    })

    expect(result.current.games).toEqual([])
  })

  it("should update the score of a game", () => {
    const { result } = renderHook(() => useGames())

    act(() => {
      result.current.startGame("Home", "Away")
      result.current.updateScore("Home", "Away", 3, 2)
    })

    expect(result.current.games[0]).toEqual({
      homeTeam: "Home",
      awayTeam: "Away",
      homeScore: 3,
      awayScore: 2
    })
  })

  it("should return the games sorted by total score", () => {
    const { result } = renderHook(() => useGames())

    act(() => {
      result.current.startGame("Team A", "Team B")
      result.current.startGame("Team C", "Team D")
      result.current.updateScore("Team A", "Team B", 5, 3)
      result.current.updateScore("Team C", "Team D", 1, 2)
    })

    const summary = result.current.getSummary()
    expect(summary).toEqual([
      { homeTeam: "Team A", awayTeam: "Team B", homeScore: 5, awayScore: 3 },
      { homeTeam: "Team C", awayTeam: "Team D", homeScore: 1, awayScore: 2 }
    ])
  })
})
