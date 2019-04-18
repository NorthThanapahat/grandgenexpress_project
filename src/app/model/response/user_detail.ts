export class UserDetails{
    ResponseCode : string;
    ResponseData : UserData;

}   

class UserData{
    username : string = '';
    Firstname:string = '';
    Lastname:string = '';
    userRole:string = '';
    email:string = '';
    userRef:string=  '';
}