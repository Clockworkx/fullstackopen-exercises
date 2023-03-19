import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TopAnecdote = ({points, anecdotes}) => {
  if (Object.values(points).reduce((a, b) => a + b, 0) > 0){

    const topAnecdote = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b )

    return (
      <div>
        <h2>
          Highest Rated Anecdote
        </h2>
        {anecdotes[topAnecdote]}
      </div>
    )
  }
  else return <div>Give a Rating, to see the top rated anecdote.</div>
}

const DailyAnecdote = ({points, anecdotes, selected}) => {
  console.log(points, anecdotes, selected)
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]} <br/>
      Voted: {points[selected]} times<br/>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  console.log('btt')
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = (props) => {
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3:0, 4: 0, 5: 0 })

  const handleGetAnecdote = () => {
    const previous = selected
    let newNote = getRandomInt(0, 6)
    do {
      newNote = getRandomInt(0, 6)
    } while (previous === newNote);
     setSelected(newNote)
    }

  const handleLike = () => {
    const newPoints = {...points, [selected]: points[selected] + 1 }
    setPoints(newPoints)
  }

  return (
    <div>
      <DailyAnecdote anecdotes={props.anecdotes} selected={selected} points={points}/>
      <Button handleClick={handleGetAnecdote} text="Get Anecdote" />
      <Button handleClick={handleLike} text="Like" />
      <TopAnecdote points={points} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)