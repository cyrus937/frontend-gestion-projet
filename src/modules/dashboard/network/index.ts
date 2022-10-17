import { Projet } from "../../../entities/Projet"
import { User } from "../../../entities/User"
import { customFetch } from "../../../shared/customFetch"
import { API_ROUTES } from "../../shared/ApiRoutes"

export const getUser = (): Promise<User[]> => {
    return customFetch.get(API_ROUTES.USER)
  }

  export const getProjets = (): Promise<Projet[]> => {
    return customFetch.get(API_ROUTES.PROJET)
  }
  
  export const createProjet = (projet: any): Promise<any> => {
    return customFetch.post(API_ROUTES.PROJET, projet)
  }