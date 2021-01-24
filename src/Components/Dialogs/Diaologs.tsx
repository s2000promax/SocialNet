import React from 'react';
import { InitialStateType } from '../../redux/dialogs-reducer';
import AddMessageForm from './AddMessageForm/AddMessageForm';
import DialogItem from './DialogItem/dialogItem';
import s from './Dialogs.module.css'
import Message from './Message/message';


type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}


const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key = {m.id} />);

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }
   
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsitems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

export default Dialogs;




/*

const DialogItem = (props) => {

      return <div className={s.dialog + ' ' + s.active}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
 </div>;
}

const Message = (props) => {

      return <div className={s.dialog}>{props.message}</div>
}



    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {
            props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch( updateNewMessageBodyCreator(body)  )
    }


*/