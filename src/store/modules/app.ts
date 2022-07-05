import { createSlice } from '@reduxjs/toolkit'

export interface IAppState {
  isCollapse: boolean
}

const initialState: IAppState = {
  isCollapse: false
}

const namespaces = 'app'

const appSlice = createSlice({
  name: namespaces,
  initialState,
  reducers: {
    setCollapsed(state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export const { setCollapsed } = appSlice.actions

export default appSlice.reducer
