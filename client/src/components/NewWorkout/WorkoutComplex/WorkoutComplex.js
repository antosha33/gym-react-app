import React, { useContext } from 'react';
import ExerciseStateContext from '../../../context/exerciseState.context'

const WorkoutComplex = ({onWeightChangeHandler, exerciseWeight }) => {

  const {toTableItems : items} = useContext(ExerciseStateContext);

  if (!items) {
    return null
  }

  return (

    <div className="jumbotron workout-complex">
      <div className="top-panel">
        <span className="complex-name">{items.name}</span>
        <span className="badge badge-pill badge-dark">{items.level}</span>
      </div>
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
          {items.exercises.map((it) => {
            return (
              <tr className="table-primary">
                <th scope="row" >{it.name.name}</th>
                <td>{it.approachQuantity}</td>
                <td>{it.repetitionsNumber}</td>
                <td><input name="weight" onChange={onWeightChangeHandler(it.name._id)} value={exerciseWeight[it.name._id] || ''} /></td>
              </tr>
            )
          })}



        </tbody>
      </table>
    </div>



  )
}

export default WorkoutComplex;