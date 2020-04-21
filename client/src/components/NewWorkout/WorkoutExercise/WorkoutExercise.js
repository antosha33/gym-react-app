import React from 'react';

const WorkoutExercise = ({items}) => {

  if (!items) {
    return <span>Выберите комплекс </span>
  }

  return (
    <h1>exercises</h1>
  )
}

export default WorkoutExercise;