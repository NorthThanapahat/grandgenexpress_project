import { ProductData } from "./product";
import { OrderSave } from "../request/orderSave";
import { OrderDetailSave, OrderDetail } from "../request/orderDetailSave";

export class inquiryOrder{
    ResponseCode:string;
    ResponseData:Data;
}

export class Data{
   
    data:Array<DataInvoiceDetails>;
}

export class DataInvoiceDetails{
    orderNo:string;
    totalCharge:string;
    addCharge:string;
    discount:string;
    totalQuantity:string;
    grandTotal:string;
    customerId:string;
    orderDate:string;
    user:string;
    paymentId:number;
    paymentType:string;
    paymentImage:string;
    amount:string;
    paymentDate:string;
    cod:number;
    status:string;
    customerName:string;
    customerTel:string;
    customerAddress:string;
    customerEmail:string;
    customerOfUser:string;
    customerRefNo:string;
    createBy:string;
    order:Order;
}
export class Order{
    orderId:string;
    orderNo:string;
    productId:string;
    quantity:number;
    user:string;
}

