import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from '../../../shared/services/api'
import { UserDetails } from 'src/app/model/response/user_detail';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public user : any;
    public userDetail :UserDetails;
 
    constructor(
        private translate: TranslateService,
         public router: Router,
         public api : ApiProvider) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.user = JSON.parse(localStorage.getItem("user"));
        this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
        console.log(this.user);
        console.log(this.userDetail);
        
      
     
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        
       
       
    }
  
  
    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.clear();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
