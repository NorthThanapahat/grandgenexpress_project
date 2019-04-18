import { Component, OnInit, enableProdMode, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        if (environment.production) {
            enableProdMode();

            window.console.log = function () { };

        }
    }

}

