import React, {useState} from 'react';
import PreLoader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus_withHooks';
import userPhoto from '../../../assets/Images/user.png';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

     let [editMode, setEditMode] = useState(false);
  //  let [status, setStatus] = useState(props.status);

     if (!profile) {
          //debugger
          return <PreLoader />
     }

     const onMainPhotoSelected = (e) => {
          if (e.target.files.length) {
               savePhoto(e.target.files[0]);
          }
     }

     const onSubmit = (formData) => {
         // console.log(formData);
         saveProfile(formData).then ( ()=> {
          setEditMode(false);         
         } );
          
     }


     return (
          <div>
               <div className={s.descriptionBlock}>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
           
                    { editMode 
                    ? <ProfileDataForm profile={profile} 
                                       onSubmit={onSubmit}
                                       initialValues={profile} /> 
                    : <ProfileData profile={profile} 
                                   isOwner={isOwner} 
                                   goToEditMode={() => {setEditMode(true)}} />}

                    {/*<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />*/}
                    <ProfileStatus status={status} updateStatus={updateStatus} />

               </div>
          </div>
     )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
     return <div>
{
  isOwner && <div> <button onClick={goToEditMode}>edit</button> </div>
}

     <div>
          <b>Full name:</b> {profile.fullName}
     </div>
     <div>
          <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
     </div>
     {profile.lookingForAJob && 
          <div>
               <b>My professional skills:</b> {profile.lookingForAJobDescription}
          </div>
     }

      <div>
          <b>About me:</b> {profile.aboutMe}
     </div>

      <div>
          <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
              return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key] } />
          }) }
     </div>

</div>

}


const Contact = ({contactTitle, contactValue}) => {
return <div className={s.contact}><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;