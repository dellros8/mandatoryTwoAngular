import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

const username = 'dellros';
const password = 'hejhej';

const mockFriends = ['Alice', 'Bob', "Edward", "Rick"]

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTaW1vbiBEZWxscm9zIiwibmFtZSI6IlNpbW9uIERlbGxyb3MifQ.Si1zcSuEyX8oPfetU60H0c5YmGU1dqzowxe4rAeUEtM';

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


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        const {
            body,       // object
            headers,    // object
            method,     // string
            url,        // string
        } = req;


        if (url.endsWith("/login")) {
            if (body.username == username && body.password == password) {
                return makeResponse({ token: token });
            } else {
                return makeError(500, {});
            }
        } else if (url.endsWith("/friends")) {
            if (headers.has("Authorization")) {
                if (headers.get("Authorization") === `Bearer ${token}`) {
                    return makeResponse({
                        friends: mockFriends,
                    })
                } else {
                    return makeError(401, {});
                }
            } else {
                return makeError(401, {});
            }
        } else {
            return makeError(500, {});
        }
    }
}   