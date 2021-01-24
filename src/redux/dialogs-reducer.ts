import { BaseThunkType, InferActionsTypes } from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = { 
    dialogs : [
        {id: 1, name: 'Simych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'}
     ] as Array<DialogType>,
messages : [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: '>|<opa'}
      ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

export const actions = {
    sendMessage : (newMessageBody: string) => { return ( { type: 'SEND_MESSAGE', newMessageBody } ) as const }
}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkAction = BaseThunkType<ActionsType>

const dialogsReducer = (state = initialState, action: ActionsType) => {
    let stateCopy;
    
    switch(action.type) {
                          
                           case 'SEND_MESSAGE': 
                                               let body = action.newMessageBody;
                                               return {
                                                ...state,
                                                messages: [...state.messages, {id:6, message: body}]
                                                           };
                                               
                                               
                                            
                                                          

                           default: 
                                   return state;
} 

}




export default dialogsReducer;