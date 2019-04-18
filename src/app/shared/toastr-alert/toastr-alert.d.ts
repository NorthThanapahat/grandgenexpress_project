import { ToastrService } from 'ngx-toastr';
export declare class ToastrAlertDirective {
    private toastr;
    constructor(toastr: ToastrService);
    success(msg: any): void;
    info(msg: any): void;
    warning(msg: any): void;
    error(msg: any): void;
}
