import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
	constructor() { }

	// intercept request and add accessToken
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (sessionStorage.length > 0 && sessionStorage.getItem('accessToken') != undefined && request.url.indexOf('.json') < 0) {
			request = request.clone({
				setHeaders: {
					'x-access-token': sessionStorage.getItem('accessToken')
				}
			});
		}

		return next.handle(request)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
						if (event.headers.get('accessToken')) {
							sessionStorage.setItem('accessToken', event.headers.get('accessToken'));
						}
					}
				}, error => {
					// Route to error page
					console.log("error", error)
				})
			);
	}
}
