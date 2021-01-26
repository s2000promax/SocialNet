import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';
import {MapPropsType, DispatchPropsType} from './MyPosts'

const mapStateToProps = (state: AppStateType) => {
  return {
           posts: state.profilePage.posts
  } 
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;