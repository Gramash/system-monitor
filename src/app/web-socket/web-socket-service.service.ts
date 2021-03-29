import {Injectable} from '@angular/core';
import {MessageResolverService} from './message-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private url = 'ws://ec2-54-175-188-47.compute-1.amazonaws.com:8081/chat';
  // private url = 'ws://localhost:8081/chat';
  private readonly webSocket!: WebSocket;

  constructor(private messageResolver: MessageResolverService) {
    this.webSocket = new WebSocket(this.url);
    this.webSocket.onmessage = (ev) => this.messageResolver.resolveMessage(ev);
  }

  public getWebSocket(): WebSocket {
    return this.webSocket;
  }

}
