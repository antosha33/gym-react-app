import React, { useContext, useState, SyntheticEvent, useEffect } from 'react';
import Select from 'react-select';


import ExerciseStateContext from '../../../context/exerciseState.context'


const WorkoutExerciseItem = ({ exercises, options, onExerciseChangeHandler, id }) => {

  const selectStyles = {
    menuList: (provided) => ({
      ...provided,
      color: 'grey'
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '14px'
    }),
    container: (provided) => ({
      ...provided,
      borderRadius: '2px'
    }),
  }

  return (

    <tr className="table-primary">
      <th scope="row" data-id={id}><Select options={options} onChange={onExerciseChangeHandler(id)} styles={selectStyles} placeholder={'Здесь можно воспользоваться поиском'} /></th>
      <td><input type="text" name="approachQuantity" onChange={onExerciseChangeHandler(id)} required value={exercises.id && exercises.id.approachQuantity} /></td>
      <td><input name="repetitionsNumber" onChange={onExerciseChangeHandler(id)} value={exercises.id && exercises.id.repetitionsNumber} /></td>
      <td><input name="weight" onChange={onExerciseChangeHandler(id)} value={exercises.id && exercises.id.weight} /></td>
    </tr>
  )
}

const WorkoutExercise = ({ workoutExercisesItems, exercises, setExercises }) => {


  const [exerciseData, setExersiseData] = useState({
    exercise: '',
    approachQuantity: '4',
    repetitionsNumber: '',
    weight: ''
  });

  const onExerciseChangeHandler = (id) => (ev) => {
    if (Object.getPrototypeOf(ev).constructor.name !== 'SyntheticEvent') {
      const newExercises = {
        ...exercises,
        [ev.value]: {}
      }
      delete newExercises.null;
      setExercises(
        {
          ...newExercises,
          null: {},
        }
      )
    } else {

      exercises[id][ev.target.name] = ev.target.value;
      setExercises(
        {
          ...exercises,
          null: []
        }
      )
    }
  }

  const onAddExerciseHandler = (ev) => {
    ev.preventDefault();
    exercises.push(exerciseData);
    setExersiseData({});
  }

  const selectOptions = () => {
    const unfiltered = workoutExercisesItems.map((it) => {
      return { value: it._id, label: it.name };
    });
    return unfiltered.filter((it) => !exercises[it.value]);
  }

  return (
    <div className="jumbotron workout-exercises">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Упражнение</th>
            <th scope="col">Подходы</th>
            <th scope="col">Повторения</th>
            <th scope="col">ВЕС</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(exercises).map((it) => {
            return <WorkoutExerciseItem id={it} options={selectOptions()} exercises={exercises} onExerciseChangeHandler={onExerciseChangeHandler} onAddExerciseHandler={onAddExerciseHandler} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WorkoutExercise;

