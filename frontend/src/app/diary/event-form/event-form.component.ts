import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Output() onCloseClick = new EventEmitter();
  @Input() selectedItem:any = null;
  submitted: boolean = false;
  errorMessage: string = null;
  eventForm: any;

  constructor(private formBuilder: FormBuilder, public _cs: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();

    if(this.selectedItem && this.selectedItem.id){
      this.selectedItem.eventDate = formatDate(this.selectedItem.eventDate, 'yyyy-MM-dd', 'en-US')
      this.eventForm.patchValue(this.selectedItem)
    }
  }

  /** Initializing the form */
  resetForm(){
    this.eventForm = this.formBuilder.group({
      id: [null],
      comment: [null, Validators.required],
      eventDate: [null, [Validators.required]]
    });
  }
  
  get f() { return this.eventForm.controls; }

  /** Saving the form */
  onSubmit(){
    this.errorMessage = null;
    this.submitted = true;
    if(this.eventForm.valid){
      this.submitted = false;

      if(this.eventForm.value.id){
        //update the form
        this._cs.put('diary/event/'+this.eventForm.value.id, this.eventForm.value).subscribe(
          (response: any) => {
            if(response.type == this._cs.STR_SUCCESS){
               this.onCloseClick.emit(true);
            } else {
              this.errorMessage = response.data;
            }
          }, err => {
            console.log("err", err)
          }
        );

      } else {
        //create the event
        this._cs.post('diary/event', this.eventForm.value).subscribe(
          (response: any) => {
            if(response.type == this._cs.STR_SUCCESS){
               this.onCloseClick.emit(true);
            } else {
              this.errorMessage = response.data;
            }
          }, err => {
            console.log("err", err)
          }
        );
      }
    } else {
      this._cs.markFormAsTouched(this.eventForm)
    }
  }

}
