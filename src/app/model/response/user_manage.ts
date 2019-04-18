
export class UserManageMent{
    ResponseCode:string;
    ResponseData:Array<UserData>;
}

export class UserData{
    username:string;
    Firstname:string;
    Lastname:string;
    userRole:string;
    userRef:string;
}