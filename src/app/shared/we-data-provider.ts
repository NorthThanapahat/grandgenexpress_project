import { Injectable } from '@angular/core';
import { UserDetails } from '../model/response/user_detail';
import * as moment from 'moment';

@Injectable()
export class WeDataProvider {

    public userDetail: UserDetails;


    GetUserDetail():UserDetails {
       return JSON.parse(localStorage.getItem('userDetail'));

    }
}