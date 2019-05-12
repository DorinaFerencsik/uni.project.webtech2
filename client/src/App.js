import React from 'react';
import './App.scss';

import HomeScreen from './components/HomeScreen'
import CommonNavbar from './components/CommonNavbar'
import Customer from './components/Customer'
import Worker from './components/Worker'
import Manager from './components/Manager'

function App() {
  return (
      <div>
          <CommonNavbar/>
          <div className="container" id="mainContainer">
           {/*<Customer/>*/}
            <HomeScreen/>
            {/*<Worker/>*/}
            {/*<Manager/>*/}

          </div>
      </div>
  );
}

export default App;
