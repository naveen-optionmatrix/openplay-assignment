import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  submitted: boolean = false;
  errorMessage: string = null;

  constructor(private formBuilder: FormBuilder, public _cs: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  /** Initializing the form */
  resetForm(){
    this.signUpForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
  
  get f() { return this.signUpForm.controls; }

  /** Signing up a new user */
  onSubmit(){
    this.errorMessage = null;
    this.submitted = true;
    if(this.signUpForm.valid){
      this.submitted = false;
      this._cs.post('auth/signup', this.signUpForm.value).subscribe(
        (response: any) => {
          if(response.type == this._cs.STR_SUCCESS){
             this.router.navigateByUrl('/login')
          } else {
            this.errorMessage = response.data;
          }
        }, err => {
          console.log("err", err)
        }
      );
    } else {
      this._cs.markFormAsTouched(this.signUpForm)
    }
  }
}
