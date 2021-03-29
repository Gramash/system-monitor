import {Component, OnInit} from '@angular/core';
import {MessageResolverService} from '../../web-socket/message-resolver.service';
import {Response} from '../../web-socket/response';
import * as echarts from 'echarts';


@Component({
  selector: 'app-system-monitor',
  templateUrl: './system-monitor.component.html',
  styleUrls: ['./system-monitor.component.scss']
})
export class SystemMonitorComponent implements OnInit {

  options: any;
  updateOptions: any;
  private ram: (number)[] = [];

  constructor(
    private messageResolver: MessageResolverService
  ) {

  }

  ngOnInit(): void {
    this.messageResolver.observable$.subscribe(response => {
      this.updateRam(response.ram?.free);
      this.updateGraph(response);
    });

    this.options = {
      title: {
        text: 'RAM load',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['ram']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category'
        }
      ],
      yAxis: [
        {
          name: 'Mb',
          type: 'value',
          max: 100
        }
      ],
      series: [
        {
          name: 'ram',
          type: 'line',
          stack: 'counts',
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(128, 255, 165)'
            }, {
              offset: 1,
              color: 'rgba(1, 191, 236)'
            }])
          },
          data: this.ram
        }
      ]
    };
  }

  private updateRam(value: any): void {
    if (this.ram.length < 10) {
      this.ram.push(value);
    } else {
      this.ram.shift();
      this.ram.push(value);
    }
  }

  private updateGraph(res: Response): void {
    this.updateOptions = {
      yAxis: {
        max: res.ram?.total
      },
      series: [{
        data: this.ram
      }]
    };
  }


}
