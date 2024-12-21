export interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
}

export interface IUserResponse extends IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
