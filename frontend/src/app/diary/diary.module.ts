import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EventsComponent, EventFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DiaryRoutingModule
  ]
})
export class DiaryModule { }
