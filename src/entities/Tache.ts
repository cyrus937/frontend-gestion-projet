import { Projet } from "./Projet"
import { User } from "./User"

export type Tache = {
    id:string
    nom:string
    description:string
    delai: string
    auteur:User
    realisateur:User[]
    state:string
    projet:Projet
    dateCreation:string
}