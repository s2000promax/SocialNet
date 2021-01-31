import { follow } from "./users-reducer"
import { usersAPI } from "../api/users-api"
import { ResultCodeEnum, ResponseType } from "../api/api"

jest.mock('../api/users-api')
const UserAPIMock = usersAPI

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}
//@ts-ignore
UserAPIMock.follow.mockReturnValue(result)

test('follow success thunk', async ()=> {
    
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    //@ts-ignore
    await thunk(dispatchMock)
  
    expect(dispatchMock).toBeCalledTimes(3)
    
  }
  )