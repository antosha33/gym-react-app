import React, { useState } from 'react';
import CreateClient from '../../components/CreateClient';
import AllClients from '../../components/AllClients';

import './mainpage.sass';


const MainPage = () => {

  const [isUpdate, setIsUpdate] = useState(false);

  const updateHandler = () => {
    setIsUpdate(!isUpdate);
  }

  return (
    <>
      <div className="main-page">
        <CreateClient update={updateHandler} />
        <AllClients updater={isUpdate}></AllClients>
      </div>
    </>
  )
}

export default MainPage;