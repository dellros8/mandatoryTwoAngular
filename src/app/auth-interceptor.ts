import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username = 'dellros';
const password = 'hejhej';

// list of friends to return when the route /api/friends is invoked.
const friends = ['alice', 'bob']

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZWxscm9zIiwibmFtZSI6ImhlamhlaiJ9.5_E0HiLKZlU_FmEvrJZqAWhp2FSIE48huJEc7fEGpuA';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        const {
            body,       // object
            headers,    // object
            method,     // string
            url,        // string
        } = req;


        if (url.endsWith("/login")){
            if (body.username == username && body.password == password){
                 return makeResponse({token: token});
            } else {
                console.log("error")
                 return makeError(500, {});
            }
        }
        
        if (url.endsWith("/friends")){
        }
    // implement logic for handling API requests, as defined in the exercise instructions.
    }
}   