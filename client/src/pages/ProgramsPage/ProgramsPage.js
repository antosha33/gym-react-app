import React, {useState} from 'react';
import Exercises from '../../components/Exercises';

import './exercisespage.sass'

const ProgramsPage = () => {

 const [block, setBlock] =  useState();


  return (
    <div className="container">
     <Exercises />
    </div>

  )
}

export default ProgramsPage;