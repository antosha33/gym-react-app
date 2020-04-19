import React, { useState, useContext, useEffect } from 'react';
import { useRequest } from '../../hooks/request.hook';
import AuthContext from '../../context/auth.context';
import { emmiter } from '../Notification/Notification';
import Select from 'react-select';


const initialInputs = {
  name: '',
  level: 'Новичок',
  exercise: [],
}

const initialExercise = {
  name: '',
  approachCoantity: '4',
  repetitionsNumber: '',
}

const NewComplex = ({ getAllComplexes }) => {


  const [name, setName] = useState('Новый комплекс');
  const [inputs, setInputs] = useState(initialInputs);
  const [exerciseOptions, setExerciseOptions] = useState(null);
  const [exercise, setExercise] = useState(initialExercise)
  let [countOfExercise, setCountOfExercise] = useState(1)

  const { request, loading } = useRequest();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await request('/programs/exercise/', 'GET', null, { 'Authorization': `Bearer ${token}` });
        const options = response.map((it) => {
          return { value: it._id, label: it.name }
        });
        setExerciseOptions(options);
      } catch (error) {

      }
    })();
  }, [])

  const onChangeHandler = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value
    })
  }

  const selectExerciseHandle = (ev) => {
    if (ev.target) {
      setExercise({
        ...exercise,
        [ev.target.name]: ev.target.value
      })
    } else {
      setExercise({
        ...exercise,
        name: ev.value
      })
    }
  }

  const onAddExercise = (lastFlag) => {
    if (lastFlag) return inputs.exercise.push(exercise);
    inputs.exercise.push(exercise);
    setCountOfExercise(++countOfExercise);
  }

  const onSubmitHandler = async (ev) => {
    ev.persist();
    ev.preventDefault();
    onAddExercise(true);

    try {
      const response = await request('/programs/complex/create/', 'POST', inputs, { 'Authorization': `Bearer ${token}` });
      initialInputs.exercise = [];
      setInputs(initialInputs);
      setExercise(initialExercise);
      ev.target.reset();
      setName('Новый комплекс');
      setCountOfExercise(1);
      getAllComplexes();
      emmiter.emmit('notify', response.message);
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }

  }

  const exercisesInComplex = [];

  for (let i = 0; i < countOfExercise; i++) {
    exercisesInComplex.push(<NewExerciseInComplex exercise={exercise} exerciseOptions={exerciseOptions} selectExerciseHandle={selectExerciseHandle} />)
  }

  return (
    <form className="jumbotron new-copmlex"
      onSubmit={onSubmitHandler}
    >

      <h1 className="display-3">{inputs.name || 'Новый комплекс'}</h1>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Название комплекса</label>
        <input type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Введите название комплекса"
          name="name"
          value={inputs.name}
          required
          onChange={onChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleSelect1">Выберите уровень</label>
        <select className="form-control"
          name='level'
          onChange={onChangeHandler}
          value={inputs.level}
        >
          <option>Новичок</option>
          <option>Продолжающий</option>
          <option>Легенда</option>
        </select>
      </div>

      <div className="card  bg-primary mb-3">
        <h4>УПРАЖНЕНИЯ В КОМПЛЕКСЕ</h4>
        <br />
        {exercisesInComplex}
        <button type="button"
          className="btn btn-secondary"
          onClick={() => onAddExercise()}
        >Добавить еще упражнение</button>
      </div>
      <button type="submit"
        className="btn btn-success"
      >ДОБАВИТЬ КОМПЛЕКС</button>
    </form>
  )
}


const NewExerciseInComplex = ({ selectExerciseHandle, exerciseOptions }) => {



  return (
    <>
      <div className="exercise-manager">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Выберите Упражнение</label>
          <Select options={exerciseOptions}
            onChange={selectExerciseHandle}
            isSearchable={true}
            placeholder={'Здесь можно воспользоваться поиском'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Подходы</label>
          <input type="text"
            className="form-control"
            name="approachCoantity"
            placeholder="4"
            onChange={selectExerciseHandle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Повторения</label>
          <input type="text"
            className="form-control"
            name="repetitionsNumber"
            placeholder="Повторения"
            required
            onChange={selectExerciseHandle}

          />
        </div>
      </div>
    </>
  )
}


export default NewComplex;