import React from 'react';
import PreLoader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatus_withHooks';

const ProfileInfo = (props) => {


 
     if (!props.profile) {
          return <PreLoader />
     } 
          
    return <div>
    <div className={s.descriptionBlock}>
                                    
                                    {/* <div>
                                         <img src='https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'/>
                                    </div> */}
                                    
                                    
                                    <div className={s.descriptionBlock}> 
                                    <img src={props.profile.photos.large} />
                                           Ava + description
                                    </div> 
                                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                                    

                         
                         </div> 
                         

                         </div>

}

export default ProfileInfo;