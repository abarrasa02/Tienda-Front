import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Service/usuarios.service';
import { Usuarios } from 'src/app/Classes/usuarios';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:Usuarios[];
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }
  public getUsuarios(): void {
    this.usuariosService.findAll().subscribe(
      (response: Usuarios[]) => {
        this.usuarios = response;
        console.log(this.usuarios);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
