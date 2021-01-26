import React from 'react';
import { PostType } from '../../../types/types';
import AddPostForm, { AddProsFormValuesType } from './AddPostForm/AddPostForm';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export type MapPropsType = {
  posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
  const postElements = [...props.posts]
  .reverse()
  .map(p => <Post key={p.id} message={p.message} likescount={p.likescount} />);

  const onAddPost = (values: AddProsFormValuesType) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
 <AddPostForm onSubmit={onAddPost}/>
      <div className={s.posts}>
        {postElements}
      </div>
    </div>
  )
}

export const MyPostsMemorized = React.memo(MyPosts)

export default MyPosts;




