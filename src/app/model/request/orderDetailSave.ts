export class OrderDetailSave{
    createBy:string;
    username:string;
    orderNo:string;
    orderDetail:OrderDetail;
    payment:Payment;
    customerId:string;
    cod:string;
}

export class OrderDetail{
    totalCharge:string;
    addCharge:string;
    discount:string;
    totalQuantity:string;
    grandTotal:string;
}

export class Payment{
    paymentType:string;
    paymentImage:string;
    amount:string;
}