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
  // post
  createPatient(data: any) {
    return this.http.post<any>(this.URL, data);
  }
  // put -> change service status
  startService(data: any) {
    return this.http.put<any>(this.URL, data)
  }
}
