import React, { useState, useEffect } from 'react';
import Humans from './Dropdown_list'

import '../../App.css';

function Breaking_bad_api() {
  return (
      <>
        <div className='content_wrap'>
          <div className='title_line'></div>      
          <h1> Breaking Bad Api </h1>
          <div className='title_line'></div>      
          <Humans></Humans>
          <div className='title_line'></div>      
          <div className='text_wrap'>
            <body> For this case I chose to use a list selector to limit the options of the user, it also permits the website to fetch the data only once. This also permits me to view a “bug” as the episode api request is not using the same names as the character list, sometimes it refers to them by nicknames thus not all actors have episodes. </body>
          </div>
        </div>
      </>
    );
  }
// }

  export default Breaking_bad_api;