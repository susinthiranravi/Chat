import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class ChatService {

    constructor(private httpClient : HttpClient){}

    public getTwilioToken(name):Observable<any>{
       return this.httpClient.post('/chat/token',{identity:name});
    }
}