import React from 'react';
import s from './Post.module.css';


const Post = (props) => {

    return (
    <div className={s.item}>
        {props.message}
            <div>
              <img  src='https://i.imgur.com/I80W1Q0.png'/>
              <span >like</span> {props.likescount}
             </div>
    </div>
);

}

export default Post;