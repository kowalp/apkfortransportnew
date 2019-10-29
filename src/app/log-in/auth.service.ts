import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    apiAddress = `http://51.68.143.24:5000/`;
    constructor(private router: Router, private httpClient: HttpClient) {}
    LogIn(email: string, password: string) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.httpClient.post<any>(this.apiAddress + 'account/login', {
            Email: email,
            Password: password
            }, {headers: reqHeader});
    }
    Logout() {
        localStorage.removeItem('email');
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        this.router.navigate(['/login']);
    }
    Register(form) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<any>(this.apiAddress + 'account/register', form, {headers: reqHeader});
    }
    ChangePassword(form) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<any>(this.apiAddress + 'account/changepassword', form, {headers: reqHeader});
    }
    getMaster() {
        return this.httpClient.get<any>(this.apiAddress + 'account/getall/master')
        .pipe(map((res) => {
            return res;
        }));
    }
}
