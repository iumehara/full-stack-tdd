import {act, render, screen, waitFor, within} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Home, {RpsRepo} from "./Home"

describe('Home', () => {
  it('displays form', async () => {
    render(<Home rpsRepo={{playGame: jest.fn()}}/>)

    const player1Group = await screen.findByTestId('p1')
    expect(within(player1Group).getByText('Player 1')).toBeInTheDocument()
    expect(within(player1Group).getByRole('textbox')).toBeInTheDocument()

    const player2Group = await screen.findByTestId('p2')
    expect(within(player2Group).getByText('Player 2')).toBeInTheDocument()
    expect(within(player2Group).getByRole('textbox')).toBeInTheDocument()

    expect(screen.getByRole('button')).toHaveTextContent('Submit')
  })

  it('submits p1 and p2 values when submit is clicked', async () => {
    const playGameSpy = jest.fn().mockReturnValue(Promise.resolve('P2_WINS'))
    const rpsRepo = {playGame: playGameSpy} as RpsRepo

    render(<Home rpsRepo={rpsRepo}/>)

    const player1Group = await screen.findByTestId('p1')
    const p1Input = within(player1Group).getByRole('textbox')
    userEvent.type(p1Input, 'ROCK')

    const player2Group = await screen.findByTestId('p2')
    const p2Input = within(player2Group).getByRole('textbox')
    userEvent.type(p2Input, 'PAPER')

    userEvent.click(screen.getByRole('button'))

    expect(playGameSpy).toHaveBeenCalledWith('ROCK', 'PAPER')
    await screen.findByText('P2_WINS')
  })

  it('displays response after submit is clicked', async () => {
    const playGameSpy = jest.fn().mockReturnValue(Promise.resolve('P1_WINS'))
    const rpsRepo = {playGame: playGameSpy} as RpsRepo

    render(<Home rpsRepo={rpsRepo}/>)

    expect(screen.queryByText('P1_WINS')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))

    await screen.findByText('P1_WINS')
  })
})
