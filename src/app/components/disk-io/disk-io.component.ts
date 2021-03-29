import {Component, OnInit} from '@angular/core';
import {MessageResolverService} from '../../web-socket/message-resolver.service';

@Component({
  selector: 'app-disk-io',
  templateUrl: './disk-io.component.html',
  styleUrls: ['./disk-io.component.scss']
})
export class DiskIoComponent implements OnInit {
  public options: any;
  public updateOptions: any;

  constructor(private messageResolver: MessageResolverService) {
  }

  ngOnInit(): void {
    this.messageResolver.observable$.subscribe(it => {
        const read = it.diskIO?.read;
        const write = it.diskIO?.write;
        console.log(read, write);
        this.updateOptions = {
          series: [{
            data: [read,
              {
                value: write,
                itemStyle: {
                  color: '#a90000'
                }
              }]
          }]
        };
      }
    );

    this.options = {
      title: {
        text: 'Disk IO',
        subtext: 'KB/s',
      },
      xAxis: {
        type: 'category',
        data: ['Read', 'Write']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, {
          value: 170,
          itemStyle: {
            color: '#a90000'
          }
        }, 200],
        type: 'bar'
      }]
    };
  }

}
