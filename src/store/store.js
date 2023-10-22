import {configureStore} from '@reduxjs/toolkit'
import emailSlice from './emailSlice'
const store=  configureStore({

    reducer:{
        email:emailSlice
    }




})


export default store