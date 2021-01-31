import React from 'react';
import logo from '../../../assets/Images/loader.svg';

type PropsType = {}


let PreLoader:React.FC<PropsType> = () => {
    return <div style= { {backgroundColor: 'yellow'} }>
       < img src={ logo } /> 

    </div>
}

export default PreLoader;