import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customers: Observable<any>;

  // Form Related Stuff
  form = new FormGroup({
    name: new FormControl(null, {
      validators: Validators.minLength(3),
      updateOn: 'blur'
    }),
    location: new FormControl(null, {
      validators: Validators.minLength(4),
      updateOn: 'blur'
    })
  });

  constructor(private readonly fbs: FirebaseService) {
    this.customers = this.fbs.getCustomers$();
  }

  createCustomer() {
    const formStuff = {
      ...this.form.value,
      balance: 0,
      id: 27000 + Math.floor(Math.random() * 1000)
    };
    console.log(formStuff);
    this.fbs.addCustomer(formStuff);
  }

  modifyCustomer() {}

  deleteCustomer() {
    return this.fbs.getCustomers$().subscribe(value => {
      value.map(el => {
        console.log('map: ' + JSON.stringify(el));
        if (el.name == this.form.value.name) {
          const customer = el;
          console.log('customer' + JSON.stringify(customer));
          this.fbs.deleteCustomer(customer);
        }
      });
    });
  }
}
