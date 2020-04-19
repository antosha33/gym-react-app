import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth.context';
import { useRequest } from '../../hooks/request.hook';
import { useGetData } from '../../hooks/getData.hook';

import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

import './newworkout.sass';

const NewWorkout = () => {

  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { getAllComplexes, loading } = useGetData();

  useEffect( () => {
    (async function(){
      const res = await getAllComplexes();
      console.log(res);
    })();
  }, [getAllComplexes])

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


  const getFullDate = (date) => {
    let log = '';
    log = date.getDate() < 10 ? log + `0${date.getDate()}` : log + `${date.getDate()}`;
    log = date.getMonth() < 10 ? log + `.0${date.getMonth() + 1}` : log + `.${date.getMonth() + 1}`;
    log = log + `.${date.getFullYear() % 100}`;
    return log;
  }

  const onDateChange = (selectDate) => {
    setDate(selectDate);
  }

  return (
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
          <p>some text</p>
        </div>
      </div>
    </div>

  )
}

export default NewWorkout;