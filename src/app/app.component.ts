import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firebaseService: FirebaseService;
  customers;

  getCustomers(): void {
    this.firebaseService
      .getCustomers()
      .subscribe(customers => (this.customers = customers));
  }
}
