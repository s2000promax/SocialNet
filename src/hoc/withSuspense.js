import React from 'react';
import PreLoader from '../Components/Common/Preloader/Preloader';

export const withSuspense = (Component) => {

 return (props) => {
                    return <React.Suspense fallback={<PreLoader />}>
                    <Component {...props} />
                    </React.Suspense>  
 };
}