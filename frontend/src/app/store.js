import {configureStore} from '@reduxjs/toolkit'

import cartSlice from '../features/CartSlice'
import userSlice from '../features/UserSlice'

export const store=configureStore({
    reducer:{
     cart:cartSlice,
     user:userSlice
    }
})

