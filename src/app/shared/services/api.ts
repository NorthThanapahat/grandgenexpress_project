import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ConfigApi } from "./config";


@Injectable()
export class ApiProvider{

  headers = new HttpHeaders();
    constructor(public http:HttpClient){

    }
    setHeader(){
      let headers = new HttpHeaders();
       headers = headers.append("Accept", 'application/json');
       headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      return headers;
    }
    loginPost(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('login data ===>', data);
          console.log('login data json', req);
    
          this.http.post(ConfigApi.login_url, req, { headers: headers })
            .subscribe(res => {
              console.log('login response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    
      }
     UserDetailsPost(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('userDetail data json', req);
    
          this.http.post(ConfigApi.userDetails_url, req, { headers: headers })
            .subscribe(res => {
              console.log('userDetail response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    
      }

      CreateUser(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('userDetail data json', req);
    
          this.http.post(ConfigApi.createUser_url, req, { headers: headers })
            .subscribe(res => {
              console.log('userDetail response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }
      EditProduct(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('EditProduct data json', req);
    
          this.http.post(ConfigApi.editProduct_url, req, { headers: headers })
            .subscribe(res => {
              console.log('EditProduct response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

   

      SendRequestApi(url,data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log(url+' data json', req);
    
          this.http.post(url, req, { headers: headers })
            .subscribe(res => {
              console.log(url+' response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

     UserManageMent(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('userDetail data json', req);
    
          this.http.post(ConfigApi.userManageMent_url, req, { headers: headers })
            .subscribe(res => {
              console.log('userDetail response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    
      }

      ProductInquiry(data) {
        return new Promise((resolve, reject) => {
          let headers = this.setHeader();
          const req = JSON.stringify(data);
          console.log('ProductInquiry data json', req);
    
          this.http.post(ConfigApi.productInquiry_url, req, { headers: headers })
            .subscribe(res => {
              console.log('ProductInquiry response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
}
}