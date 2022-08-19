import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  URL = 'http://localhost:3000/patient/';

  constructor(private http: HttpClient) {}
  // get
  getPatient() {
    return this.http.get<any>(this.URL);
  }
  /// get patient on waiting
  getPatientOnWaiting() {
    return this.http.get<any>(this.URL + '?service=3&service=4&_embed=ticket');
  }
  // post
  createPatient(data: any) {
    return this.http.post<any>(this.URL, data);
  }
  // put -> change service status
  serviceProgress(data: any, id: number) {
    return this.http.put<any>(this.URL + id, data);
  }
  ////
  // put -> change service status
  getPatientWithID(id: number) {
    return this.http.get<any>(this.URL + '?id=' + id + '');
  }
  /// get patient on service
  getPatientOnService() {
    return this.http.get<any>(this.URL + '?service=4');
  }
  //// get patient On Queue
  patientOnQueue() {
    return this.http.get<any>(this.URL + '?service=3');
  }
  //// get completed patient
  completedPatient() {
    return this.http.get<any>(this.URL + '?service=5');
  }
  //// get patient On Hold
  patientOnHold() {
    return this.http.get<any>(this.URL + '?service=2');
  }
  //////////////////////////////////////////////////////////////////////
  URL2 = 'http://localhost:3000/ticket/';
  /// add to queue
  Queue(data: any) {
    return this.http.post<any>(this.URL2, data);
  }
  /// get sorted queue
  removeTicket(id: number) {
    return this.http.delete<any>(this.URL2 + id);
  }
  //// get all ticket
  getAllTicket() {
    return this.http.get<any>(this.URL2);
  }
  /////////////////////////////////////////////////////////////////////
  URL3 = 'http://localhost:3000/doctor/';
  /// change doctor status
  doctorStatus(id: number, data: any) {
    return this.http.put<any>(this.URL3 + id, data);
  }
  //// get doctor status
  getDoctorStatus() {
    return this.http.get<any>(this.URL3 + '?id=1');
  }
}
