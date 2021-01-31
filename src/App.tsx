import React from 'react';
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AppHeader from './Components/Header/Header';
import {Login} from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import {UsersPage} from './Components/Users/UsersContainer';
import { connect, Provider } from 'react-redux';
import { getAuthUserData } from './redux/auth-reducer';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import PreLoader from './Components/Common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
import store from './redux/redux-store';
import s from './Components/Navbar/Navbar.module.css'

import { Button, Col, Row } from 'antd';
import 'antd/dist/antd.css'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const DialogsContainer = React.lazy( () => import('./Components/Dialogs/DiaologsContainer'))
const ProfileContainer = React.lazy( () => import('./Components/Profile/ProfileContainer'))
const ChatPage = React.lazy( () => import('./pages/Chat/ChatPage'))

const SuspensedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

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
<Layout>
    <AppHeader />
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >

            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
              <Menu.Item key="1"><Link to="/profile" >Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dialogs" >Messages</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/chat" >Chat</Link></Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to="/developers" >Developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>

        <Switch>
                        <Route exact path='/' render={()=> <Redirect to={"/profile"} />} />

                    <Route path='/dialogs' render={()=> <SuspensedDialogs /> } />

                    <Route path='/profile/:userId?' render={()=> <SuspendedProfile /> } />

                    <Route path='/developers' render={() => <UsersPage pageTitle={"Самураи"} />} />

                    <Route path='/login' render={() => <Login />} />

                    <Route path='/chat' render={() => <SuspendedChatPage />} />

                    <Route path='*'
                    render={()=> <div>404 NOT FOUND
                        
                    </div>} />
                    </Switch>

        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Samurai Social NetWork ©2018 </Footer>
  </Layout>


     /*       <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={()=> <Redirect to={"/profile"} />} />

                    <Route path='/dialogs' render={()=> <SuspensedDialogs /> } />

                    <Route path='/profile/:userId?' render={()=> <SuspendedProfile /> } />

                    <Route path='/users' render={() => <UsersPage pageTitle={"Самураи"} />} />

                    <Route path='/login' render={() => <Login />} />

                    <Route path='*'
                    render={()=> <div>404 NOT FOUND
                        
                    </div>} />
                    </Switch>
                </div>
            </div>
*/
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
