import { Component } from '@angular/core';
import { Categorias } from './Classes/categorias';
import { Router } from '@angular/router';
import { CategoriasService } from './Service/categorias.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TiendaPC';
  categoria: Categorias[];

  constructor(private router: Router, private categoriaService: CategoriasService){}
    
  

@HostListener('window:scroll', ['$event'])

public onWindowScroll() {
    let css = '.menu-list li a:hover{ color: #ffffff; }';
    let element = document.querySelector('.navbar') as HTMLElement;
    let style = document.createElement('style');
    style.style.cssText = css;
    element.classList.remove('HoverClass2', 'HoverClass1')
    if (window.pageYOffset > element.clientHeight) {
      element.style.backgroundColor = '#2196f3';
    } else {
      element.style.backgroundColor = 'transparent';

    }
  }
}
