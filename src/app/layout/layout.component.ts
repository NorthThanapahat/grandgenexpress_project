import { Component, OnInit } from '@angular/core';
import { WeDataProvider } from '../shared/we-data-provider';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor(public weProvider:WeDataProvider) {}

    ngOnInit() {

        console.log(this.weProvider.userDetail);

    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
