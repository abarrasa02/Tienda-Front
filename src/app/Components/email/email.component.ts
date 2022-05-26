import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Email } from 'src/app/Classes/email';
import { EmailService } from 'src/app/Service/email.spec';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  email: Email;
  fileArchivo: Blob;
  selectedFiles: FileList;

  constructor(private emailService: EmailService, private spinner: NgxSpinnerService) { 

  }
 

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
     
      this.spinner.hide();
  }, 1000);
  }

  mostrarAlgo() {
    console.log('fich', this.fileArchivo)
  }

  public sendMail(email: NgForm) {
    console.log('fich', email);
  
    this.emailService.sendMail(email.value, this.fileArchivo).subscribe(
      (response: Email) => {
        console.log(response)
        email.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        email.reset();
      }
    )
  }
  public selectFile(event: any): void {



    this.selectedFiles = event.target.files;



    this.fileArchivo = this.selectedFiles[0];



  }
}
