import { createSlice } from '@reduxjs/toolkit'

export interface IAppState {
  collapsed: boolean
}

const initialState: IAppState = {
  collapsed: false
}

const namespaces = 'app'

const appSlice = createSlice({
  name: namespaces,
  initialState,
  reducers: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed
    }
  }
})

export const { setCollapsed } = appSlice.actions

export default appSlice.reducer
