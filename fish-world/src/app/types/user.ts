export interface User {
    _id: string,
    email: string,
    gender: string,
    password: string,
    createPost: string[],
    __v: number

}

export interface UserAuth {
    _id: string,
    email: string,
    token: string,
}

export interface UserProfil {
    _id: string,
    email: string,
    gender: string,
    password: string,
    createPost: string[],
}
export interface UserProfilData {
    _id: string,
    email: string,
    gender: string,
    password: string,
    createPost: string[],
    fishs: [
        {
            _id: string,
            name: string;
            image: string;
            type: string;
            description: string;
            owner: string[];
            likedList: string[];
        }
    ]
}