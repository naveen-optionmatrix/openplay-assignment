import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitted: boolean = false;
  errorMessage: string = null;

  constructor(private formBuilder: FormBuilder, public _cs: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  /** Initializing the form */
  resetForm(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }

  /** Signing the user */
  onSubmit(){
    this.errorMessage = null;
    this.submitted = true;
    if(this.loginForm.valid){
      this.submitted = false;
      this._cs.post('auth/signin', this.loginForm.value).subscribe(
        (response: any) => {
          if(response.type == this._cs.STR_SUCCESS){
            this._cs.setSessionValue('name', response.data.name);
            this._cs.setSessionValue('accessToken', response.data.accessToken);
            this.router.navigateByUrl('/diary')
          } else {
            this.errorMessage = response.data;
          }
        }, err => {
          console.log("err", err)
        }
      );
    } else {
      this._cs.markFormAsTouched(this.loginForm)
    }
  }

}
