import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Service/usuarios.service';
import { Usuarios } from 'src/app/Classes/usuarios';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:Usuarios[];
  updateUsuarios:Usuarios;
  deleteUsuarios:Usuarios;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];
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
  public AddUsuarios(addForm: NgForm): void {
    document.getElementById('add-Usuarios-form')?.click();
    this.usuariosService.addUsuarios(addForm.value).subscribe(
      (response: Usuarios) => {
        console.log(response);
        this.getUsuarios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUsuarios(usuarios: Usuarios): void {
    console.log('Usuariosedit', usuarios);
    
     this.usuariosService.updateUsuarios(usuarios).subscribe(
       (response: Usuarios) => {
       console.log(response);
       this.getUsuarios();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteUsuarios(usuarioId: number): void {
    this.usuariosService.deleteUsuarios(usuarioId).subscribe(
      (response: Usuarios) => {
        console.log(response);
        this.getUsuarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(usuarios: Usuarios, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUsuariosModal');
    }
    if (mode === 'edit') {
      this.updateUsuarios = usuarios;
      button.setAttribute('data-target', '#updateUsuariosModal');
    }
    if (mode === 'delete') {
      this.deleteUsuarios = usuarios;
      button.setAttribute('data-target', '#deleteUsuariosModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public abrir(usuarios: Usuarios | null, mode: string){
    if(mode == 'eliminar'){
      document.getElementById('id02').style.display = 'block';
      this.deleteUsuarios = usuarios;
    }
    if(mode == 'add'){
      document.getElementById('id01').style.display = 'block';
    }
    if(mode == 'update'){
      document.getElementById('id03').style.display = 'block';
      this.updateUsuarios = usuarios;
    }
  }
  public cerrar(mode: string){
    if(mode == 'eliminar'){
    document.getElementById('id02').style.display = 'none';
  }
  if(mode == 'add'){
    document.getElementById('id01').style.display = 'none';
  }
  if(mode == 'update'){
    document.getElementById('id03').style.display = 'none';
  }
}
}
