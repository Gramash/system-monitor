import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SystemMonitorComponent} from '../components/ram-monitor/system-monitor.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'chat', component: SystemMonitorComponent},
      // { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ]
})
export class MyRouterModule {
}
