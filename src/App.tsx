import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import UsersContainer from './Components/Users/UsersContainer';
import { connect, Provider } from 'react-redux';
import { getAuthUserData } from './redux/auth-reducer';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import PreLoader from './Components/Common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
import store from './redux/redux-store';


const DialogsContainer = React.lazy( () => import('./Components/Dialogs/DiaologsContainer'));
const ProfileContainer = React.lazy( () => import('./Components/Profile/ProfileContainer'));

const SuspensedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
                                alert("Some error occured")
                                //console.error(PromiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                    <Switch>
                        <Route exact path='/' render={()=> <Redirect to={"/profile"} />} />

                    <Route path='/dialogs' render={()=> <SuspensedDialogs /> } />

                    <Route path='/profile/:userId?' render={()=> <SuspendedProfile /> } />

                    <Route path='/users' render={() => <UsersContainer pageTitle={"Самураи"} />} />

                    <Route path='/login' render={() => <LoginPage />} />

                    <Route path='*'
                    render={()=> <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>

        );

    }

}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType> (
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
    <Provider store = {store}>
        <AppContainer />
    </Provider>
    </BrowserRouter>
}


export default SamuraiJSApp    
