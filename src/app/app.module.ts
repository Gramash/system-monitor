import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';
import {AppComponent} from './app.component';
import {MyRouterModule} from './router/router.module';
import {WebSocketModule} from './web-socket/web-socket.module';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MyRouterModule,
    WebSocketModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
