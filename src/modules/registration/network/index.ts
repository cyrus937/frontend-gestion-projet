import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'

export const createLearner = (user: any): Promise<any> => {
  return customFetch.post(API_ROUTES.REGISTRATION, user)
}
