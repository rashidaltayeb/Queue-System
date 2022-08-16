import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  URL = 'http://localhost:3000/patient/';
  URL2 = 'http://localhost:3000/ticket/';

  constructor(private http: HttpClient) {}
  // get
  getPatient() {
    return this.http.get<any>(this.URL);
  }
  /// get patient on waiting
  getPatientOnWaiting() {
    return this.http.get<any>(this.URL + '?service=3&_embed=ticket&_sort=ticketId');
  }
  // post
  createPatient(data: any) {
    return this.http.post<any>(this.URL, data);
  }
  // put -> change service status
  startService(data: any, id: number) {
    return this.http.put<any>(this.URL + id, data);
  }
  /// add to queue
  Queue(data: any) {
    return this.http.post<any>(this.URL2, data);
  }
  // /// get sorted queue
  // getSortedQueue() {
  //   return this.http.get<any>(this.URL2);
  // }
}
