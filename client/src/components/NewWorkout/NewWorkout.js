import React, { useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { useGetData } from '../../hooks/getData.hook';
import { useRequest } from '../../hooks/request.hook.js';
import { getFullDate } from '../../helpers/getFullDate';
import ExerciseStateContext from '../../context/exerciseState.context';
import AuthContext from '../../context/auth.context';
import { emmiter } from '../Notification/Notification';

import Calendar from 'react-calendar';
import Select from 'react-select';
import WorkoutComplex from './WorkoutComplex';
import WorkoutExercise from './WorkoutExercise';


import './newworkout.sass';

const NewWorkout = () => {

  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { getAllComplexes, getAllExercises, loading } = useGetData();
  const { request, lodging } = useRequest();
  const { token } = useContext(AuthContext);

  const [workoutComplexesItems, setWorkoutComplexesItems] = useState([]);
  const [workoutExercisesItems, setWorkoutExercisesItems] = useState([]);
  const [exercises, setExercises] = useState({
    null: {},
  });

  const [toTableItems, setToTableItems] = useState(null);
  const [isExercises, setIsExercises] = useState(true);
  const [exerciseWeight, setEcerciseWeight] = useState({});

  const onWeightChangeHandler = (id) => (ev) => {
    setEcerciseWeight({
      ...exerciseWeight,
      [id]: ev.target.value
    })
  }

  useEffect(() => {
    (async function () {
      const complexes = await getAllComplexes();
      const exercises = await getAllExercises();
      setWorkoutComplexesItems(complexes);
      setWorkoutExercisesItems(exercises);
    })();
  }, [getAllComplexes, getAllExercises])


  const onRadioClickHandler = (ev) => {
    setExercises({
      null: [],
    })
    setToTableItems(null);
    ev.target.value === 'complexes' ? setIsExercises(true) : setIsExercises(false)
  }

  const showCalendarHandler = () => {
    if (!showCalendar) {
      setShowCalendar(!showCalendar);
      setTimeout(() => {
        const calendar = document.querySelector('.react-calendar.show');
        if (calendar) {
          calendar.classList.add('animate');
        }
      }, 0);
    } else {
      const calendar = document.querySelector('.react-calendar.show');
      calendar.classList.remove('animate');
      setTimeout(() => {
        setShowCalendar(!showCalendar);
      }, 200);
    }
  }


  const onDateChange = (selectDate) => {
    setDate(selectDate);
  }

  const onSelectComplexChangeHandler = (ev) => {
    setEcerciseWeight({});
    const items = workoutComplexesItems.filter((it) => it._id === ev.value);
    setToTableItems(...items);
  }

  const onSubmitComplexHandler = () => {
    const newWorkout = {
      date: date,
      name: toTableItems.name,
      level: toTableItems.level,
      exercises: toTableItems.exercises.map((it) => {
        return {
          id: it.name._id,
          approachQuantity: it.approachQuantity,
          repetitionsNumber: it.repetitionsNumber,
          weight: exerciseWeight[it.name._id]
        }
      })
    }
    console.log(newWorkout);
  }

  const onSubmitExerciseHandler = async () => {
    try {
      const exercisesValues = Object.keys(exercises).map(it => {
        return {
          exercise: it,
          approachQuantity: exercises[it].approachQuantity,
          repetitionsNumber: exercises[it].repetitionsNumber,
          weight: exercises[it].weight,
        }
      });
      const newWorkout = {
        date: date,
        exercises: exercisesValues.filter((it) => it.exercise !== 'null')
      }

      const response = await request('/workout/create', 'POST', { ...newWorkout }, { 'Authorization': `Bearer ${token}` });
      setExercises({
        null: [],
      })

      setToTableItems(null);
      setIsExercises(true);
      
      emmiter.emmit('notify', response.message);

    } catch (e) {
      emmiter.emmit('notify', e.message);
    }

  }


  const selectOptions =
    workoutComplexesItems.map((it) => {
      return { value: it._id, label: it.name };
    })


  return (
    <>

      <div className='container'>
        <div className='row'>
          <div class="jumbotron new-workout">
            <div className="top-newworkout">
              <h1 class="display-3">{getFullDate(date)}</h1>
              <div class='calendar-ico' onClick={showCalendarHandler}><FontAwesomeIcon icon={faCalendarPlus} size="2x"></FontAwesomeIcon></div>
            </div>
            <div className='calendar-wrapper'>
              <Calendar onChange={onDateChange} view={'month'} className={showCalendar && 'show'} />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input type="radio" class="form-check-input" id="complexes" value="complexes" onClick={onRadioClickHandler} checked={isExercises} readOnly />
                <label class="form-check-label" htmlFor="complexes">Комплексы</label>

              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="exercises" value="exercises" onClick={onRadioClickHandler} checked={!isExercises} readOnly />
                <label class="form-check-label" htmlFor="exercises">Упражнения</label>
              </div>
            </div>
            {isExercises && <Select options={selectOptions}
              isSearchable={true}
              onChange={onSelectComplexChangeHandler}
              placeholder={'Выберите комплекс'}
            />}
            <ExerciseStateContext.Provider value={{ toTableItems }}>
              {isExercises && <WorkoutComplex onWeightChangeHandler={onWeightChangeHandler} exerciseWeight={exerciseWeight} />}
              {!isExercises && <WorkoutExercise exercises={exercises} setExercises={setExercises} workoutExercisesItems={workoutExercisesItems} items={toTableItems} onWeightChangeHandler={onWeightChangeHandler} exerciseWeight={exerciseWeight} />}
            </ExerciseStateContext.Provider>
          </div>
          {isExercises && <button type="button" class="btn btn-success" onClick={onSubmitComplexHandler}>Комплекс</button>}
          {!isExercises && <button type="button" class="btn btn-success" onClick={onSubmitExerciseHandler}>Упражнения</button>}

        </div>
      </div>
    </>
  )
}

export default NewWorkout;