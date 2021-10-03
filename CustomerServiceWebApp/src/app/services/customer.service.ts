import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from 'src/models/customer.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Fields
  private url: string = 'https://localhost:5001/api/customer';

  // Ctors
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Get all Customers
  getCustomers(): Observable<Customer[]> {
    
    return this.httpClient.get<Customer[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Get one Customer
  getCustomerById(id : string) : Observable<Customer>{
    
    return this.httpClient.get<Customer>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Post one Customer
  saveCustomer(customer : Customer) : Observable<Customer>{
    return this.httpClient.post<Customer>(this.url, JSON.stringify(customer), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update one Customer
  updateCustomer(customer : Customer) : Observable<Customer>{

    return this.httpClient.put<Customer>(this.url + '/' + customer.id, JSON.stringify(customer), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Delete one Customer
  deleteCustomer(customer : Customer){

    return this.httpClient.delete<Customer>(this.url + '/' + customer.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handler
  handleError(error: HttpErrorResponse) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      // Error client side
      errorMessage = error.error.message;
    } else {

      // Error server side
      errorMessage = `Error code: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
