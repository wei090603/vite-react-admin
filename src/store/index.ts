import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './modules/app'
import userReducer from './modules/user'

export const store = configureStore({
  // 合并子reducer
  reducer: {
    app: appReducer,
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
