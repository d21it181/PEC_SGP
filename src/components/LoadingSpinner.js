import React from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

import { useState } from 'react';

function LoadingSpinner() {
    let [loading, setLoading] = useState(true);
  
    return (
        <div className='backLoader' style={{
            padding : '5px 0',
          display: 'flex',
        
          justifyContent: 'center',
      }} >
        <LoadingOverlay
        
  active={true}
  spinner
  text='Running testcases'
  
  >
  <p>Some content or children or something.</p>
</LoadingOverlay>
      </div>
    );
  }
export default LoadingSpinner;