import React from 'react';
import logo from '../../../assets/Images/loader.svg';


let PreLoader = (props) => {
    return <div style= { {backgroundColor: 'yellow'} }>
       < img src={ logo } /> 

    </div>
}

export default PreLoader;