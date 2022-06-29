import { createSlice } from '@reduxjs/toolkit'
import { login, userInfo } from '@/api/login'
import { setStorage } from '@/utils/storage'
import { ILoginForm } from '@/pages/login'

export interface ICounterState {
  userInfo: object
  token: string
}

const initialState: ICounterState = {
  userInfo: {},
  token: ''
}

const namespaces = 'user'

const userSlice = createSlice({
  name: namespaces,
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload
    },
    setUserInfo(state, { payload}) {
      state.userInfo = payload
    }
  }
})

export const { setToken, setUserInfo } = userSlice.actions

export const fetchLogin = (payload: ILoginForm) => async (dispatch: any) => {
  const { token } = await login(payload)
  dispatch(setToken(token))
  setStorage('token', token)
}

export const getUserInfo = () => async (dispatch: any) => {
  const data = await userInfo()
  dispatch(setUserInfo(data))
}

export default userSlice.reducer
