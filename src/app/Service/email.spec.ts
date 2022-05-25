import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/Classes/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrls: string;

  constructor(private http: HttpClient) {
    this.emailUrls = environment.apiBaseUrl;
  }
  public sendMail(email: Email, fileArchivo: Blob): Observable<Email>{
    const formData: FormData = new FormData();
    formData.append('email', JSON.stringify(email));
    formData.append('file', fileArchivo);
    return this.http.post<Email>(`${this.emailUrls}/email/send`, formData);
  }
}