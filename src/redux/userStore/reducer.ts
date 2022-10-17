import { UserTypeAction } from './actions'
import { CREATE_USER } from './actionTypes'

export type UserStateType = {
  isConnected: boolean
  id: string
  last_name: string
  first_name: string
  phone_number: string
  email: string
  sex: string
  username: string
  admin: boolean
  password:string
  poste: string
  dateCreation: string
}
const INITIAL_STORE: UserStateType = {
  isConnected: false,
  id: '',
  last_name: '',
  first_name: '',
  phone_number: '',
  email: '',
  sex: '',
  username: '',
  admin: false,
  poste: '',
  password: '',
  dateCreation: '',
}

export const userReducer = (state = INITIAL_STORE, action: UserTypeAction) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data,
      }
    default:
      return state
  }
}
