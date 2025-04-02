import React from 'react'
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Header from '../main/Header';

const TestMain = () => {
  return (
   <div className='container'>
      <Header/>
      <div className="d-flex rounded-4 mb-5 p-3" style={{
        borderWidth:'10px'
        ,borderStyle:'solid'
        ,borderColor:'#3F7D58'
      }}>
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow-1 p-3">
          <Dashboard /> 
        </div>
      </div>
   </div>
  )
}

export default TestMain