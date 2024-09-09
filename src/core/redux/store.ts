import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/login/reducers/auth.reducer';
import registerReducer from '@app/features/auth/register/reducers/register.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store