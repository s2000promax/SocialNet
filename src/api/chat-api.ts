

let subscribers = [] as SubsriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {

    start() {
        createChannel()
    },

    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },

   subscribe(callback: SubsriberType) {
    subscribers.push(callback)
    return () => {
        subscribers = subscribers.filter(s => s !== callback)
    }
   },

   unsubscribe(callback: SubsriberType) {
    subscribers = subscribers.filter(s => s !== callback)
   },

   senMessage(messsge: string) {
    ws?.send(messsge)
   }

}


type SubsriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}