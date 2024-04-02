export interface User {
    _id: string,
    email: string,
    password: string,
    createPost: string[],
    __v: number
    
}

export interface UserAuth {
    _id: string,
    email: string,
    password: string,  
}

export interface UserProfil{
    _id: string,
    email: string,
    password: string,  
    createPost: string[],
}