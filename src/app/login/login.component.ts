import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { ApiProvider } from '../shared/services/api';
import { UserDetails } from '../model/response/user_detail';

import { WeDataProvider } from '../shared/we-data-provider';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    error = false;
    errorItem: any;
    message = '';
    public userDetail :UserDetails;
    constructor(
        private translate: TranslateService,
        public router: Router,
        public api: ApiProvider,
        public weProvider:WeDataProvider
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.errorItem = {
            username: false,
            password: false
        }
    }
    GetUserDetails(data){
        this.api.UserDetailsPost(data).then(async (result : any)=>{
            this.userDetail =  <UserDetails> await result;
            console.log(this.userDetail);
            if(this.userDetail.ResponseCode === "Success"){
             
                this.weProvider.userDetail = this.userDetail;
                localStorage.setItem("userDetail",JSON.stringify(this.userDetail));
                this.router.navigate(['/dashboard']);
                
            }else{
                console.log("asdasd");
            }
        });
    }
    ngOnInit() { }
    Validate(){
        if (this.username == '' || this.password == '') {
            if (this.username == '') {
                this.errorItem.username = true;
            }
            if (this.password == '') {
                this.errorItem.password = true;
            }
            return false;
        }
        return true;

    }
    onLoggedin() {
        console.log(this.Validate());
        if (!this.Validate()) {
            this.message = "กรุณากรอกให้ครบถ้วน"
        }else {
            let data = {
                username: this.username,
                password: this.password
            }
            this.api.loginPost(data).then((result: any) => {
                console.log(result);
                if (result.ResponseCode == "Success") {
                    let user:any = {
                        username : this.username,
                        token:result.token
                    }
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('user', JSON.stringify(user));
                    let userData:any = {
                        username:this.username
                    }
                    this.GetUserDetails(userData);
                    this.error = false;

                } else {
                    this.message = result.ResponseMessage;
                    this.error = true;
                }
            });
        }

    }

    GetUserDetail(){
        if(this.Validate()){
            
        }
    }
}
