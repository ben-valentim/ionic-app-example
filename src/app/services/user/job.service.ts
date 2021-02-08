import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/main';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  
  constructor(private http: HttpClient) { }
  
  getAll() {
    let url = BASE_URL + 'job/get/all';
    
    try {
      return this.http.get(url);
      
    } catch (error) {
      console.log('Fail');
      console.log(error);
    } 
  }
  
  create(job:any) {
    let url = BASE_URL + 'job/create';
    
    try {
      return this.http.post(url, JSON.stringify(job), OPTIONS);
    } catch (error) {
      console.log('Fail');
      console.log(error);
    } 
  }
  
  update(job:any) {
    let url = BASE_URL + 'job/update';
    
    try {
      return this.http.put(url, JSON.stringify(job), OPTIONS);
    } catch (error) {
      console.log('Fail');
      console.log(error);
    } 
  }
  
  updateStatus(job:any) {
    let url = BASE_URL + 'job/update/status';
    
    try {
      return this.http.put(url, JSON.stringify(job), OPTIONS);
      
    } catch (error) {
      console.log('Fail');
      console.log(error);
    } 
  }
  
  delete(id:number) {
    let url = BASE_URL + 'job/delete/' + id;
    
    try {
      return this.http.delete(url, OPTIONS);
      
    } catch (error) {
      console.log('Fail');
      console.log(error);
    } 
  }
  
}
