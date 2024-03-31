export interface User {
    _id: string,
    email: string,
    password: string,
    createPost: string[],
    __v: number
    
}

export interface UserAuth {
    id: string,
    email: string,
    password: string,  
}

export interface UserProfil{
    id: string,
    email: string,
    password: string,  
    createPost: string[],
}