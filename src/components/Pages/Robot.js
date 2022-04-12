
import React, {useEffect, useState} from 'react';
import '../../App.css';
import MySketch from './Sketch';

const Robot = () => {
  
  // Load index value from local storage
  const storedValueAsNumber = Number(localStorage.getItem('index'));

  // Set the initial index as the stored value or as 0 if there is none
  const [index, setIndex] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 0
  )

  useEffect(() => {
    //save the value localy to avoid the refresh 
    localStorage.setItem('index', String(index));
  }, [index]);

  // Check the change of the option
  const onChange = (q) => {
    // Set the new index
    setIndex(q);
    // Reload the page 
    window.location.reload(false);    
  }
  // Initial msg drop down menu option
  let msg = ["0 0 NORTH A",
            "7 3 NORTH RAALAL",
            "0 0 NORTH L",
            "0 0 NORTH R",
            "0 0 NORTH AAAALAAAALAAAALAAAAL"
          ];

      return (
        <>
          <div className='content_wrap'>

            <div className='title_line'></div>      
            <h1> Robot </h1>
            <div className='title_line'></div>      

            <select id="selection" value = {index} onChange={(e) => onChange(e.target.value)}>
              <option value = '0'> {msg[0]}</option>
              <option value = '1'> {msg[1]}</option>
              <option value = '2'> {msg[2]}</option>
              <option value = '3'> {msg[3]}</option>
              <option value = '4'> {msg[4]}</option>
            </select>
            <MySketch index = {index}></MySketch>
            <div className='title_line'></div>      
            <body> There is still an refresh bug that dublicate + loading the P5.js sketch that need fixing. </body>
          </div>
        </>
      );
    }
  

  
  export default Robot;