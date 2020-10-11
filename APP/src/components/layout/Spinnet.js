import React from 'react';
import fluidLoader from '../../images/fluid-loader-opt-3.gif';

const Spinnet = () => (
   <div>
        <img src={fluidLoader}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt={'Loading...'} />
   </div>
);

export default Spinnet;