import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/models/customer.model';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public customers: Customer[] = [];
  public customer : Customer = {} as Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

    this.getCustomers();
  }

  // Get all Customers
  getCustomers() {

    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  // Save Customer
    public saveCustomer(form: NgForm) {

      if (this.customer.id !== undefined) {

        this.customerService.updateCustomer(this.customer).subscribe(() => {
          this.cleanForm(form);
        });
      } else {

        this.customerService.saveCustomer(this.customer).subscribe(() => {
          this.cleanForm(form);
        });
      }
    }

    // Delete Customer
    public deleteCustomer(customer: Customer){
      this.customerService.deleteCustomer(customer).subscribe(() => {
        this.getCustomers();
      });
    }

    // Edit Customer
    public editCustomer(customer : Customer){
      this.customer.id = customer.id;
      this.customer.firstName = customer.firstName;
      this.customer.lastName = customer.lastName;
      this.customer.email = customer.email;
      this.customer.phone = customer.phone;
    }

    // Clean form
    public cleanForm(form : NgForm){
      
      this.getCustomers();
      form.resetForm();
      this.customer = {}  as Customer;
    }
}
