export class SearchCustomer{
    ResponseCode:string;
    ResponseData:Array<SearchCustomerData>;
}

export class SearchCustomerData{
    customerId: string;
    customerName:string;
    customerLastname: string;
    customerTel:string;
    customerAddress:string;
    customerEmail:string;
    customerOfUser: string;
}