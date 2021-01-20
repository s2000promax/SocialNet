import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, required } from '../../../Utils/Validators/validators';
import { Textarea } from '../../Common/FormControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';

const maxLength10 = maxLenghtCreator(10);

const MyPosts = (props) => {
  let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likescount={p.likescount} />);

  let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }
/*
  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }
  */

  return (
    <div className={s.postsBlock}>
      <h3>My Post</h3>
 <AddNewPostFormRedux  onSubmit={onAddPost}/>

      <div className={s.posts}>

        {postElements}

      </div>

    </div>

  )
}

let AddNewPostForm = (props) => {
  return(<form onSubmit={props.handleSubmit}>
    <div>
    <Field name="newPostText" component={Textarea} placeholder={"Post message"}
    validate={[required, maxLength10]} />
      
    </div>

    <div>
      <button>Add post</button>
    </div>
  </form>
  )
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;