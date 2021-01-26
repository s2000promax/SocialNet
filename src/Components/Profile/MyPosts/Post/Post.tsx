import React from 'react';
import { PostType } from '../../../../types/types';
import s from './Post.module.css';

type PropsType = {
    message: string
    likescount: number

}

const Post: React.FC<PropsType> = (props) => {

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