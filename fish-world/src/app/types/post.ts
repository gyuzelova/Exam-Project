export interface Fish {
    _id: string,
    name: string;
    image: string;
    type: string;
    description: string;
    owner: string[];
    likedList: string[];
    __v: number;
    
}

export interface DetailsFish {
    name: string;
    image: string;
    type: string;
    description: string;
    
}