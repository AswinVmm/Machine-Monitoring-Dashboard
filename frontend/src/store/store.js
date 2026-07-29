import { configureStore } from '@reduxjs/toolkit'
import machinesReducer from './machinesSlice'

export const store = configureStore({ reducer: { machines: machinesReducer } })