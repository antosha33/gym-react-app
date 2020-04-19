import React from 'react';

const WorkoutComplex = ({items }) => {
  console.log(items);
  if(!items){
    return <span>Выберите комплекс или упражнение</span>
  }
  return (
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Упражнение</th>
          <th scope="col">Количество подходов</th>
          <th scope="col">Количество повторений</th>
          <th scope="col">ВЕС</th>
        </tr>
      </thead>
      <tbody>
        {items.exercises.map((it) => {
          return (
            <tr class="table-primary">
              <th scope="row">{it.name.name}</th>
              <td>{it.approachCoantity}</td>
              <td>{it.repetitionsNumber}</td>
              <td>Column content</td>
            </tr>
          )
        })}



      </tbody>
    </table>
  )
}

export default WorkoutComplex;