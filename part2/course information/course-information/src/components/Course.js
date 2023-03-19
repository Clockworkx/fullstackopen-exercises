import React from 'react'

const Header = ({courseName}) => {
    return (
    <div>
      <h1>Welcome to {courseName}</h1>
    </div>
    
    )
  }
  
  const Content = ({parts}) => {
    const exerciseTotal = parts.reduce( (accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    console.log(exerciseTotal)
    
    return (
      <div>
        <ul>
        {parts.map(part => 
            <Part key={part.id} part={part}/>
            )}
        </ul>
        <Total exerciseTotal={exerciseTotal}/>
      </div>
    )
  }
  
  const Course = ({course}) => {
    console.log(course)
    return (
      
      <div>
        <li>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        </li>
        
        
      </div>
    )
  }
  
  const Part = ({part}) => {
    console.log('props part', part)
    return (
  
      <div>
        <p><li>{part.name} Exercise Number {part.exercises}</li></p>
      </div>
    )
  }
  
  const Total = ({exerciseTotal}) => {
    
    return (
      <div>
        <p>Number of exercises: {exerciseTotal}</p>
      </div>
    )
  }

  export default Course