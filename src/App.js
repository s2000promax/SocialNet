import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import UsersContainer from './Components/Users/UsersContainer';
import { connect } from 'react-redux';
import { getAuthUserData } from './redux/auth-reducer';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import PreLoader from './Components/Common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';


const DialogsContainer = React.lazy( () => import('./Components/Dialogs/DiaologsContainer'));
const ProfileContainer = React.lazy( () => import('./Components/Profile/ProfileContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <PreLoader />
        }


        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                        render={ withSuspense(DialogsContainer)} />

                    <Route path='/profile/:userId?' render={ withSuspense(ProfileContainer) } />

                    <Route path='/users' render={() => <UsersContainer />} />

                    <Route path='/login' render={() => <LoginPage />} />
                </div>
            </div>

        );

    }

}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
     connect(mapStateToProps, {initializeApp}))(App);
