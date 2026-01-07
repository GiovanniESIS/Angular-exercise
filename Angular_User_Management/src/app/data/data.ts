import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users';
import { ActionsService } from './actions.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-data',
  imports: [CommonModule],
  templateUrl: './data.html',
  styleUrls: ['./data.css']
})
export class DataComponent implements OnInit {

  actions: any[] = [];
  selectedDate: string = '';

  constructor(private users: Users, private actionsService: ActionsService) {}

  ngOnInit() {
    const email = this.users.getSelectedEmail();

    if (email) {
      const tutte = this.users.getAzioniGenerali();
      this.actions = tutte.filter(a => a.email === email);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
  }

  filtered() {
    if (!this.selectedDate) return this.actions;
    return this.actions.filter(a => a.date === this.selectedDate);
  }
}
