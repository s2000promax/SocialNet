import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css'

import { Button, Col, Row  } from 'antd';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectCurrentLogin } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';



export type MapPropsType = {

}



export const AppHeader: React.FC<MapPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentLogin)

    const dispatch = useDispatch()

    const logoutCallback= () => {
        dispatch(logout())
    }

    const { Header } = Layout;

    return <Header className="header">
  
    <Row>
         <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/developers" >Developers</Link></Menu.Item>
          </Menu>
         </Col>
        
    {isAuth 
        ?<> <Col span={2}>
             
        <Avatar style={{ backgroundColor: '#87d068'}} size={60}  >{login} </Avatar>
        
        </Col>

        <Col span={2}>
        <Button onClick={logoutCallback}>Log out</Button>
        </Col>
        </>
         : <Col span={2}>
             <Button>
              <Link to={'/login'}>Login</Link>
              </Button>
    </Col>}
    
    </Row>
    
    

  </Header>
    
    
  /*  
    <header className={s.header}>
             <img src='https://png.pngtree.com/element_pic/00/16/07/115783931601b5c.jpg'/>

             <div className={s.loginBlock}>
                 {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                  : <NavLink to={'/login'}>Login</NavLink>}
             </div>
    </header>
    */
}

export default AppHeader;