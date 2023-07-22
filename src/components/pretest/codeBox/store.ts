// /** ================================원본================================ */
// // import { getYjsDoc, syncedStore } from '@syncedstore/core';
// // import { WebrtcProvider } from 'y-webrtc';

// // // (optional, define types for TypeScript)
// // type Todo = { completed: boolean; title: string };

// // // Create your SyncedStore store
// // export const store = syncedStore({ todos: [] as Todo[], fragment: 'xml' });

// // // Create a document that syncs automatically using Y-WebRTC
// // const doc = getYjsDoc(store);
// // export const webrtcProvider = new WebrtcProvider('roadmap-room', doc);
// // // eslint-disable-next-line no-console
// // console.log('roadmap-room-docs', doc);
// // export const disconnect = () => webrtcProvider.disconnect();
// // export const connect = () => webrtcProvider.connect();
// /** ================================원본================================ */

// import { getYjsDoc, syncedStore } from '@syncedstore/core';
// import { WebrtcProvider } from 'y-webrtc';

// // (optional, define types for TypeScript)
// type Todo = { nodeInfo: Array<number>; completed: boolean; title: string };

// // Create your SyncedStore store
// export const store = syncedStore({
//   todos: [] as Todo[],
//   fragment: 'xml',
// });

// // Create a document that syncs automatically using Y-WebRTC
// const doc = getYjsDoc(store);
// export const webrtcProvider = new WebrtcProvider('roadmap-room', doc);
// // eslint-disable-next-line no-console
// console.log('roadmap-room-docs', doc);
// export const disconnect = () => webrtcProvider.disconnect();
// export const connect = () => webrtcProvider.connect();
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

const doc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'my-roomname',
  doc,
);

wsProvider.on('status', (event) => {
  // eslint-disable-next-line no-console
  console.log(event.status); // logs "connected" or "disconnected"
});
