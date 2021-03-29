import {Component, OnInit} from '@angular/core';
import {MessageResolverService} from '../../web-socket/message-resolver.service';
import {WebSocketService} from '../../web-socket/web-socket-service.service';
import {Response} from '../../web-socket/response';

@Component({
  selector: 'app-cpu-monitor',
  templateUrl: './cpu-monitor.component.html',
  styleUrls: ['./cpu-monitor.component.scss']
})
export class CpuMonitorComponent implements OnInit {

  options: any;
  private cpuData: any;
  updateOptions: any;

  constructor(
    private webSocketService: WebSocketService,
    private messageResolver: MessageResolverService
  ) {
  }

  ngOnInit(): void {
    this.messageResolver.observable$.subscribe(response => {
      this.updateData(response);
    });

    this.options = {
      title: {
        text: 'CPU load',
        subtext: '%'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',

      },
      series: [
        {
          name: 'CPU',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'top'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            {value: 1048, name: 'load'},
            {value: 735, name: 'idle'}
          ]
        }
      ]
    };
  }

  private updateData(res: Response): void {
    const load = res.cpu?.load;
    const idle = res.cpu?.idle;
    this.updateOptions = {
      series: [{
        data: [
          {value: load, name: 'load'},
          {value: idle, name: 'idle'}
        ]
      }]
    };
  }
}
