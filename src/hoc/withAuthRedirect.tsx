import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
     isAuth: state.auth.isAuth 
    } as MapPropsType )

    type MapPropsType = {
        isAuth: boolean
    }
type DispatchPropsType = {

}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        
        const {isAuth, ...restProps} = props
        
    if (!isAuth) return <Redirect to={'/login'} />

    return <WrappedComponent {...restProps as unknown as WCP} />
   
 }
 
 let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)
 return ConnectedAuthRedirectComponent;
}