import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <div>
    <h1>Welcome to {props.courseName}</h1>
  </div>
  
  )
}

const Content = (props) => {
  
  return (
    <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>

  
  )
}

const Part = (props) => {
  console.log('props part', props)
  return (
    <div>
      <p>{props.part.name} Exercise Number {props.part.exercises}</p>

    {/* <dl>
      <dt>{props.part1}</dt>
      <dd>Exercise Number: {props.exercises1}</dd>
      <dt>{props.part2}</dt>
      <dd>Exercise Number {props.exercises2}</dd>
      <dt>{props.part3}</dt>
      <dd>Exercise Number: {props.exercises3}</dd>
    </dl>  */}
    </div>
  )
}

const Total = (props) => {
  console.log('props total', props)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <h2>Course Parts </h2>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )


}

ReactDOM.render(<App />, document.getElementById('root'))