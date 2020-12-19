import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Field, reduxForm  } from 'redux-form';
import { maxLenghtCreator, required } from '../../Utils/Validators/validators';
import { Textarea } from '../Common/FormControls/FormsControls';
import s from './Dialogs.module.css'


const Dialogs = (props) => {
    let state = props.dialogsPage;

    const DialogItem = (props) => {

        return <div className={s.dialog + ' ' + s.active}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>;
    }

    const Message = (props) => {

        return <div className={s.dialog}>{props.message}</div>
    }

    let newMessageBody = state.newMessageBody;
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} />);

/*
    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
  }
  */

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    //if (!props.isAuth) return <Redirect to={'/login'} />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsitems}>
                {dialogsElements}

            </div>

            <div className={s.messages}>

                <div> {messagesElements}</div>
                
                <AddMessageFormRedux onSubmit={addNewMessage} />

            </div>



        </div>
    );
}

const maxLength50 = maxLenghtCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field 
                           component={Textarea}
                           validate={ [required, maxLength50] }
                           name="newMessageBody" placeholder="Enter your message" />
                    <div>
                            <button>Send</button>
                        </div>
                    </div>
                </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

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