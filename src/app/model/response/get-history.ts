export class GetHistory{
    ResponseCode:string;
    ResponseData:Array<HistoryData>;
}

export class HistoryData{
    historyId:string;
    orderNo:string;
    user:string;
    grandTotal:string;
    date:string;
}