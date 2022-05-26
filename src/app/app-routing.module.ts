import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DetallePedidos } from './Classes/detalle-pedidos';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { DetallePedidosComponent } from './Components/detalle-pedidos/detalle-pedidos.component';
import { EmailComponent } from './Components/email/email.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { SobreNosotrosComponent } from './Components/sobre-nosotros/sobre-nosotros.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'categoria/all', component: CategoriasComponent },
  { path: 'detallePedidos/all', component: DetallePedidosComponent },
  { path: 'pedidos/all', component: PedidosComponent },
  { path: 'productos/all', component: ProductosComponent },
  { path: 'usuarios/all', component: UsuariosComponent },
  {path: 'email', component: EmailComponent},
  {path: 'productos/export', component:ProductosComponent},
  {path: 'sobrenosotros', component:SobreNosotrosComponent}
];
const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({

  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
