import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = environment.baseUrl;

  public STR_SUCCESS = "@Success";
  public STR_ERROR = "@Error";

  gridItemsPerPage:number = 5;

  constructor(private http: HttpClient) {
  }

  private getHttpParams(parameter: any) {
    let queryParams: HttpParams = new HttpParams()

    if (parameter) {
      for (var key in parameter) {
        queryParams = queryParams.set(key, parameter[key]);
      }
    }
    return queryParams;
  }

  getAPIUrl(url: string) {
    return this.baseUrl + url;
  }

  get(url: string, parameter: any = undefined) {
    const options = { params: this.getHttpParams(parameter) };
    return this.http.get(this.getAPIUrl(url), options);
  }

  post(url: string, body: any) {
    return this.http.post(this.getAPIUrl(url), body);
  }

  put(url: string, body: object) {
    return this.http.put(this.getAPIUrl(url), body);
  }

  delete(url: string) {
    return this.http.delete(this.getAPIUrl(url));
  }

  setSessionValue(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getSessionValue(key: string) {
    return sessionStorage.getItem(key);
  }

  cleanSessionValue(key: string) {
    return sessionStorage.setItem(key, "");
  }

  isLoggedIn() {
    console.log("commons server loogged in")
    if (sessionStorage.getItem('accessToken') == null) {
      return false;
    } else {
      return true;
    }
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  markFormAsTouched(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  /**
   * Used to check if a form field is valid and touched to apply specific scc
   * @param form 
   * @param field 
   */
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  /**
   *  Used to apply css to form fields
   * @param form 
   * @param field 
   */
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
}

