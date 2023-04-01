import { Dispatch,SetStateAction } from "react"

export const SERVER_URL = 'http://localhost:3000/files'

export interface FileProp {
    id:number,
    name:string,
    url:string,
    size:number,
    updatedAt:string,
    createdAt:string
}

export interface IProp {
    files: FileProp[]
    setFiles: Dispatch<SetStateAction<FileProp[]>>
}
