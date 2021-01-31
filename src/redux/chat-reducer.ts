import { message } from 'antd'
import { Action, Dispatch } from 'redux'
import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api'
import { Auth } from '../api/auth-api'
import { chatAPI } from '../api/chat-api'
import { securityAPI } from '../api/security-api'
import { ChatMessageType } from '../pages/Chat/ChatPage'
import { BaseThunkType, InferActionsTypes } from './redux-store'

// s2000promax@gmail.com
// qh5S!C2s!x3MNvB
/*
export type InitialStateType2 = {
    userId : number | null, 
    email: string | null, 
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}
*/

let initialState = {
    messages: [] as ChatMessageType[]
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'MESSAGES_RECEIVED':

            return {

                ...state,
                messages: [...state.messages,
                ...action.payload.messages]
            }

        default:
            return state;
    }

}



export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'MESSAGES_RECEIVED', payload: { messages }
    } as const)

}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {


        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))

}

export const stoptMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()

}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.senMessage(message)
}


export default chatReducer;