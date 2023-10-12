import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './features/users/auth-slice'
import registerReducer from './features/users/register-slice'
import bookReducer from './features/books/bookList-slice'
import profileReducer from './features/users/profile-slice'
import editProfileReducer from './features/users/profile_edit-slice'
import commentReducer from './features/books/Comment-slice'
import bookDetailsReducer from './features/books/bookDetails-slice'
import bookUploadReducer from './features/books/bookUpload-slice'



const reducer = combineReducers({
    userLogin: authReducer,
    register: registerReducer,
    bookList: bookReducer,
    profile: profileReducer,
    updateProfile: editProfileReducer,
    comment: commentReducer,
    bookDetails: bookDetailsReducer,
    bookUpload: bookUploadReducer,
})

const UserInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: UserInfoFromStorage },
}

const middleware = [thunk]

export const store = configureStore({
    reducer,
    middleware,
    preloadedState: initialState,
    devTools: {
        name:"frontend",
    },

});