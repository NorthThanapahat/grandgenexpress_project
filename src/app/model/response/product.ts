export class Product{
    ResponseCode:string;
    ResponseData:Array<ProductData>
}

export class ProductData{
    detailModify:string;
    itemCode:string;
    itemName:string;
    itemStatus:string;
    itemPrice:string;
    productId:string;
    productInUser:string;
    user:string;
    price:string;
    priceString:string;
    quantity:string;
    quantityItem:string;
}