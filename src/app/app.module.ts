import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';
import { DetallePedidosComponent } from './Components/detalle-pedidos/detalle-pedidos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from './Service/categorias.service';
import { EmailComponent } from './Components/email/email.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SobreNosotrosComponent } from './Components/sobre-nosotros/sobre-nosotros.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    UsuariosComponent,
    PedidosComponent,
    DetallePedidosComponent,
    CategoriasComponent,
    EmailComponent,
    SobreNosotrosComponent,
   
    


  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    
  
  ],
  exports:[
    NgxPaginationModule,
    
    
  ],
  providers: [CategoriasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
