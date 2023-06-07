import React, {ChangeEvent, MouseEvent, useState} from "react"

export interface RpsRepo {
  playGame: (p1Hand: string, p2Hand: string) => Promise<string>
}

type HomeProps = {
  rpsRepo: RpsRepo
}

const Home = ({rpsRepo}: HomeProps) => {
  const [result, setResult] = useState<string>('')
  const [p1Hand, setP1Hand] = useState<string>('')
  const [p2Hand, setP2Hand] = useState<string>('')

  const onP1Changed = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setP1Hand(e.target.value)
  }

  const onP2Changed = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setP2Hand(e.target.value)
  }

  const onSubmitClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    rpsRepo.playGame(p1Hand, p2Hand)
      .then(setResult)
  }


  return (
    <div>
      <div data-testid={"p1"}>
        <label>Player 1</label>
        <input onChange={onP1Changed} value={p1Hand}/>
      </div>

      <div data-testid={"p2"}>
        <label>Player 2</label>
        <input onChange={onP2Changed} value={p2Hand}/>
      </div>

      <button onClick={onSubmitClicked}>Submit</button>

      <div>
        <div>RESULT:</div>
        <div>{result}</div>
      </div>
    </div>
  )
}

export default Home
