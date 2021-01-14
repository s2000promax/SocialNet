import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
             _state: {
                       profilePage : {
                                        posts : [
                                                  {id: 1, message: 'Hi, how are you?', likescount: 12},
                                                  {id: 2, message: 'Its my first post', likescount: 11},
                                                  {id: 3, message: 'Da-Da', likescount: 112},
                                                  {id: 4, message: 'Na-Na-NNNNNNNfff', likescount: 888}
                                                ],
                                        newPostText : 'it-kama.com'
                                     },
        
                       dialogsPage : {
                                         dialogs : [
                                                      {id: 1, name: 'Simych'},
                                                      {id: 2, name: 'Andrey'},
                                                      {id: 3, name: 'Sveta'},
                                                      {id: 4, name: 'Sasha'},
                                                      {id: 5, name: 'Victor'},
                                                      {id: 6, name: 'Valera'}
                                                   ],
                                         messages : [
                                                      {id: 1, message: 'Hi'},
                                                      {id: 2, message: 'How is you?'},
                                                      {id: 3, message: 'Yo'},
                                                      {id: 4, message: 'Yo'},
                                                      {id: 5, message: 'Yo'},
                                                      {id: 6, message: '>|<opa'}
                                                    ],
                                         newMessageBody: 'Delete me'
                                      },
                       sidebar: { }
                    },  //_state
                    
             _callSubscriber() { console.log('State changed'); },

            getState() { return this._state; },

            subscribe(observer) { this._callSubscriber = observer; },

            addPost() {                let newPost = {
                                        id: 5,
                                        message: this._state.profilePage.newPostText,
                                        likescount: 0
                                            };
                                            this._state.profilePage.posts.push(newPost);
                                            this._state.profilePage.newPostText = '';
                                            this._callSubscriber(this._state);
                                        },
            updateNewPostText(newText) {
                                        this._state.profilePage.newPostText = newText;
                                        this._callSubscriber(this._state);
                                        },
            dispatch(action) {
                this._state.profilePage = profileReducer(this._state.profilePage, action);
                this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
                this._state.sidebar = sidebarReducer(this._state.sidebar, action);

                this._callSubscriber(this._state);
            }

                }//store

export default store;

window.store = store;