import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemMonitorComponent} from '../components/ram-monitor/system-monitor.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {CpuMonitorComponent} from '../components/cpu-monitor/cpu-monitor.component';
import {DiskIoComponent} from '../components/disk-io/disk-io.component';


@NgModule({
  declarations: [SystemMonitorComponent, CpuMonitorComponent, DiskIoComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [SystemMonitorComponent, CpuMonitorComponent, DiskIoComponent]
})
export class WebSocketModule {
}
