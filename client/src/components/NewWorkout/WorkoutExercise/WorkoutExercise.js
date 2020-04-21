import React from 'react';
import Select from 'react-select';

const WorkoutExercise = ({ workoutExercisesItems }) => {
  const selectOptions = workoutExercisesItems.map((it) => {
    return { value: it._id, label: it.name };
  });
  console.log(workoutExercisesItems);

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
          <tr class="table-primary">
            <th scope="row" ><Select options={selectOptions} /></th>
            <td>5</td>
            <td>15</td>
            <td><input name="weight" /></td>
          </tr>
        </tbody>
      </table>
    </div>


  )
}

export default WorkoutExercise;