import React, { useState, useContext, useEffect } from 'react';
import { useRequest } from '../../hooks/request.hook';
import AuthContext from '../../context/auth.context';
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
  weight: '',
}

const NewComplex = () => {


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

  const onChangeNameHandler = (ev) => {
    if (!ev.target.value) return setName('Новый комплекс')
    if (ev.target.name == 'name') {
      setName(ev.target.value);
      setInputs({
        ...inputs,
        [ev.target.name]: ev.target.value
      })
    }
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
    ev.preventDefault();
    onAddExercise(true);
    // setInputs(initialInputs);
    // setExercise(initialExercise);
    // inputs.exercise = [];
    // ev.target.reset();
    // setName('Новый комплекс');
    // setCountOfExercise(1);
    try {
      const response = await request('/programs/complex/create/', 'POST', inputs, { 'Authorization': `Bearer ${token}` });
    } catch (error) {
      console.log(error);
    }

  }

  const exercisesInComplex = [];

  for (let i = 0; i < countOfExercise; i++) {
    exercisesInComplex.push(<NewExerciseInComplex exercise={exercise} exerciseOptions={exerciseOptions} selectExerciseHandle={selectExerciseHandle} />)
  }

  return (
    <form class="jumbotron new-copmlex"
      onSubmit={onSubmitHandler}
    >

      <h1 class="display-3">{name}</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Название комплекса</label>
        <input type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Введите название комплекса"
          name="name"
          value={inputs.name}
          required
          onChange={onChangeNameHandler}
        />
      </div>
      <div class="form-group">
        <label for="exampleSelect1">Выберите уровень</label>
        <select class="form-control"
          name='level'
          onChange={onChangeNameHandler}
        >
          <option>Новичок</option>
          <option>Продолжающий</option>
          <option>Легенда</option>
        </select>
      </div>

      <div class="card  bg-primary mb-3">
        <div class="card-header">УПРАЖНЕНИЯ В КОМПЛЕКСЕ</div>
        {exercisesInComplex}
        <button type="button"
          class="btn btn-secondary"
          onClick={() => onAddExercise()}
        >Добавить еще упражнение</button>
      </div>
      <button type="submit"
        class="btn btn-success"
      >ДОБАВИТЬ КОМПЛЕКС</button>
    </form>
  )
}


const NewExerciseInComplex = ({ selectExerciseHandle, exerciseOptions }) => {



  return (
    <>
      <div className="exercise-manager">
        <div className="form-group">
          <label for="exampleInputEmail1">Выберите Упражнение</label>
          <Select options={exerciseOptions}
            onChange={selectExerciseHandle}
            isSearchable={true}
            placeholder={'Здесь можно воспользоваться поиском'}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Подходы</label>
          <input type="text"
            class="form-control"
            name="approachCoantity"
            placeholder="4"
            onChange={selectExerciseHandle}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Повторения</label>
          <input type="text"
            class="form-control"
            name="repetitionsNumber"
            placeholder="Повторения"
            required
            onChange={selectExerciseHandle}

          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Вес</label>
          <input type="text"
            class="form-control"
            name="weight"
            placeholder="Вес"
            required
            onChange={selectExerciseHandle}
          />
        </div>
      </div>
    </>
  )
}


export default NewComplex;