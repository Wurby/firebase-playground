import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private customerCollection: AngularFirestoreCollection;
  customers$: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.customerCollection = db.collection('customers');
    this.customers$ = this.customerCollection
      .valueChanges()
      .pipe(shareReplay());
  }

  editCustomer() {}

  addCustomer(customer) {
    this.customerCollection.doc(`${customer.id}`).set(customer);
  }

  deleteCustomer(customer) {
    this.customerCollection.doc(`${customer.id}`).delete();
  }

  getCustomers$() {
    return this.customers$;
  }

  getCustomersState() {
    return this.customers$;
  }
}
