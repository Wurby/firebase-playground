import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  customers: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.customers = db.collection('customers').valueChanges();
  }

  getCustomers() {
    return this.customers;
  }
}
