import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const badValue = bad * -1
  const totalRatings = good + bad + neutral

  if (good !== 0 || neutral !== 0 || bad !== 0){
    return (
      <table>
        <tbody>
          <Statistic statistic="Statistic" value={<b>Number</b>}/>
          <Statistic statistic="Good" value={good}/>
          <Statistic statistic="Neutral" value={neutral}/>
          <Statistic statistic="Bad" value={bad}/>
          <Statistic statistic="Total Ratings" value={totalRatings}/>
          <Statistic statistic="Average" value={((good + badValue) / totalRatings).toFixed(2)}/>
          <Statistic statistic="Good Percentage" value={(good/totalRatings * 100).toFixed(0) + '%'}/>
          </tbody>
        </table>
    )         
  }
  else return ( <div>Give a rating to see statistics!</div>)
}

const Statistic = ({statistic, value}) => {
  return (
    <tr>
    <td><b>{statistic}</b></td>
    <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
     <h1>Unicafe Customer Feedback</h1>
     <Button onClick={() => setGood(good + 1)} text="Good"/>
     <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"/>
     <Button onClick={() => setBad(bad + 1)} text="Bad"/>
     <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)