import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  itemsPerPage: number = 5;
  eventDateFilter: string = '';
  currentPageIndex: number = 1;
  totalRecords: number;
  results: any[] = [];
  isNextDataAvailable: boolean;
  displayForm: boolean;
  selectedItem: any;

  constructor(private _cs: CommonService) {
    this.itemsPerPage = this._cs.gridItemsPerPage;
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  /**
   * Get all events stored in the Diary
   */
  getAllEvents() {
    let gridData = {
      'Max': this.itemsPerPage,
      'Skip': (this.currentPageIndex - 1) * this.itemsPerPage,
      'eventDate': this.eventDateFilter
    };

    this._cs.get('diary/events', gridData).subscribe(
      (response: any) => {
        if (response && response.type === this._cs.STR_SUCCESS) {

          this.totalRecords = response.data.totalRecords;
          this.results = response.data.result || [];
          this.isNextDataAvailable = (this.totalRecords > (this.itemsPerPage * this.currentPageIndex));
        }

      },
      error => {
        console.log("Error", error);
      }
    );
  }

  /**
   * Filter the events of the Diary
   */
  filter() {
    this.getAllEvents();
  }

  /**
   * Clearing the filters
   */
  clearFilter() {
    this.itemsPerPage = 5;
    this.eventDateFilter = '';
    this.getAllEvents();
  }

  /**
   * Creating a new event in the Diary
   */
  create() {
    this.selectedItem = null;
    this.displayForm = true;
  }

  /**
   * Edit an event in the DB
   * @param item 
   */
  edit(item) {
    this.selectedItem = item;
    console.log("edit", item)
    this.displayForm = true;
  }

  /**
   * Handling the events whenever an event is created or updated
   * @param $event 
   */
  closeEventForm($event) {
    if ($event) {
      this.getAllEvents()
      this.displayForm = false;
    }
  }

  /**
   * Deleting the event
   * @param event 
   */
  delete(event) {
    this._cs.delete('diary/event/' + event.id).subscribe(
      (response: any) => {
        if (response && response.type === this._cs.STR_SUCCESS) {
          this.getAllEvents();
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}