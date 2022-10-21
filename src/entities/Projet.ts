import { User } from "./User";

export type Projet = {
    id: string;
    nom: string;
    description: string
    state: string
    collaborateur: User[]
    auteur: User
    dateCreation: Date
}