//Презентационная компонента

import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/Images/user.png'
import { NavLink } from 'react-router-dom';

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
             <span>
                 <div>
                    <NavLink to={'/profile/'+user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.usersPhoto} />
                    </NavLink>
                  </div>

                  <div> 
                      { user.followed 
                      ? <button disabled={followingInProgress.some( id => id === user.id) } 
                      onClick={ () => {/*debugger;*/ unfollow(user.id);} }>UFollow</button> 
                      : <button disabled={followingInProgress.some( id => id === user.id) } 
                      onClick={ ()=> {/*debugger;*/ follow(user.id);} }>Follow</button>}
                      
                  </div>
             </span>

            <span> 
                  <span>
                         <div>{user.name}</div>
                         <div>{user.status}</div>
                       </span>
                  <span> 
                      <div>{"u.location.country"}</div>
                      <div>{"u.location.city"}</div>
                  </span>
            </span>


             </div>)         
}

export default User;