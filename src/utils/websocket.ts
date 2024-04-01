import { ws_prefix } from '@/utils';
import { bus } from './bus';
import { start } from './mock';

let conn: WebSocket | undefined = undefined;

enum WebSocketCode {
  WarnList = 801,
  AttackType = 802,
  RefreshRank = 803,
  ReportResult = 804,
  ResouceRefresh = 805,
}
interface WebSocketData {
  code: WebSocketCode;
  msg: string;
  data: any;
}

const init = (token: string, exerciseId: string) => {
  const socket = new WebSocket(
    `${ws_prefix}/targetRangeExercise/${token.split(/\s/)?.[1]}/${exerciseId}`,
  );

  // Connection opened
  socket.addEventListener('open', (event) => {
    console.log('connect');
  });

  setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('keep');
    }
  }, 30000);

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
    const data: WebSocketData = event.data;
    switch (data.code) {
      case WebSocketCode.WarnList:
        bus.emit('ws:refresh:warn', data.data);
        break;
      case WebSocketCode.AttackType:
        bus.emit('ws:refresh:pie', data.data);
        break;
      case WebSocketCode.RefreshRank:
        bus.emit('ws:refresh:rank', data.data);
        break;
      case WebSocketCode.ReportResult:
        bus.emit('ws:refresh:report', data.data);
        break;
      case WebSocketCode.ResouceRefresh:
        bus.emit('ws:refresh:resource', data.data);
        break;
    }
  });
  conn = socket;
  // start();
};

const connect = (token: string, exerciseId: string) => {
  init(token, exerciseId);
};

const disconnect = () => {
  conn?.close();
};

export const connectWS = connect;
export const disconnectWS = disconnect;
