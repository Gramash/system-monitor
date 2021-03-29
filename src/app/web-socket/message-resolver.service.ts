import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CPU, DiskIO, RAM, Response} from './response';

@Injectable({
  providedIn: 'root'
})
export class MessageResolverService {

  private response: Subject<Response> = new Subject<Response>();
  public observable$ = this.response.asObservable();

  constructor() {
  }

  public resolveMessage(msg: MessageEvent): void {
    console.log(msg);
    const response = this.getResponse(msg);
    const cpu: CPU = this.parseCPULine(response.get('cpu') as string);
    const ram: RAM = this.parseRamLine(response.get('ram') as string);
    const diskIO: DiskIO = this.parseDiskIO(response.get('io') as string);
    const res = {cpu, ram, diskIO};
    this.response.next(res);
    console.log(res);
  }

  private getResponse(message: MessageEvent): Map<string, string> {
    const map = new Map<string, string>();
    const result = message.data.trim()
      .replace('KiB Mem', 'split')
      .replace('xvda', 'split')
      .split('split');
    return map.set('cpu', result[0])
      .set('ram', result[1])
      .set('io', result[2]);
  }

  // total, free, used, buff/cache
  private parseRamLine(response: string): RAM {
    const result = response
      .replace(/\D+/g, ' ')
      .trim()
      .split(' ')
      // tslint:disable-next-line:radix
      .map(it => Number.parseInt(it))
      .map<number>(it => it / 997)
      .map<number>(it => +it.toFixed(2));
    return {
      total: result[0],
      free: result[1],
      used: result[2],
      cache: result[3]
    };
  }

  // user, sys, waiting
  private parseCPULine(response: string): CPU {
    const result = response.replace(/\D.\D+/g, ' ')
      .trim()
      .split(' ')
      .map(it => Number.parseFloat(it).toFixed(2)) as unknown as number[];
    return {
      idle: +result[3],
      load: 100 - result[3]
    };
  }

  private parseDiskIO(response: string): DiskIO {
    const result = response.replace(/\D.\D+/g, ' ')
      .trim()
      .split(' ')
      .slice(2, 4)
      .map(it => Number.parseFloat(it));
    return {
      read: result[0],
      write: result[1]
    };
  }

}
