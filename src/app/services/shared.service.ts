import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedService {
    user: any = null;

    constructor(private http: HttpClient) {}
}
