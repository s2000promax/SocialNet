import React from 'react'
import s from '../Dialogs.module.css'

const Message = (props:any) => {

    return <div className={s.dialog}>{props.message}</div>
}

//let newMessageBody = state.newMessageBody;





//if (!props.isAuth) return <Redirect to={'/login'} />

export default Message