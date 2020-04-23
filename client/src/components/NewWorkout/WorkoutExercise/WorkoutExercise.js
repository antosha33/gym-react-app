import React, { useContext, useState, SyntheticEvent } from 'react';
import Select from 'react-select';

import ExerciseStateContext from '../../../context/exerciseState.context'


const WorkoutExerciseItem = ({ options, onExerciseChangeHandler, onAddExerciseHandler }) => {

  const { onSelectExerciseChangeHandler } = useContext(ExerciseStateContext);

  return (

      <tr class="table-primary">
        <th scope="row" ><button type="submit" onClick={onAddExerciseHandler}> Click</button><Select options={options} onChange={onExerciseChangeHandler} /></th>
        <td><input type="text"  name="approachQantity" onChange={onExerciseChangeHandler} required/></td>
        <td><input name="repetitionsNumber" onChange={onExerciseChangeHandler} /></td>
        <td><input name="weight" onChange={onExerciseChangeHandler} /></td>
      </tr>
  )
}

const WorkoutExercise = ({ workoutExercisesItems }) => {

  const [exercises] = useState([]);

  const [exerciseData, setExersiseData] = useState({
    exercise: '',
    approachQantity: '4',
    repetitionsNumber: '',
    weight: ''
  });

  const onExerciseChangeHandler = (ev) => {
    if (Object.getPrototypeOf(ev).constructor.name !== 'SyntheticEvent') {
      setExersiseData({
        ...exerciseData,
        exercise: ev.value
      })
    } else {
      setExersiseData({
        ...exerciseData,
        [ev.target.name]: ev.target.value
      })
    }
  }

  const onAddExerciseHandler = (ev) => {
    ev.preventDefault();
    exercises.push(exerciseData);
    setExersiseData({});
  }

  console.log(exercises);

  const selectOptions = workoutExercisesItems.map((it) => {
    return { value: it._id, label: it.name };
  });

  return (
    <div class="jumbotron workout-complex">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Упражнение</th>
            <th scope="col">Подходы</th>
            <th scope="col">Повторения</th>
            <th scope="col">ВЕС</th>
          </tr>
        </thead>
        <tbody>
          <WorkoutExerciseItem options={selectOptions} onExerciseChangeHandler={onExerciseChangeHandler} onAddExerciseHandler={onAddExerciseHandler} />
          {exercises.map(() => {
            return <WorkoutExerciseItem options={selectOptions} onExerciseChangeHandler={onExerciseChangeHandler} onAddExerciseHandler={onAddExerciseHandler} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WorkoutExercise;

