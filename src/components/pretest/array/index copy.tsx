// /* eslint-disable no-console */
// import { useEffect, useRef, useState } from 'react';
// import { WebsocketProvider } from 'y-websocket';
// import * as Y from 'yjs';

// export default function Basic() {
//   const ydoc = useRef(null);
//   const ytext = useRef(null);

//   useEffect(() => {
//     ydoc.current = new Y.Doc();
//     const wsProvider = new WebsocketProvider(
//       // 'wss://dev.yjs.zelevate.io',
//       //   'wss://localhost:5555',
//       'ws://localhost:1234',
//       'please',
//       ydoc.current,
//     );

//     wsProvider.on('status', (event) => {
//       console.log(event.status); // logs "connected" or "disconnected"
//     });

//     ytext.current = ydoc.current.getText('600');
//     ytext.current.observe(() => {
//       console.log(ytext.current.toString());
//       setState(ytext.current.toString());
//     });
//   }, []);

//   const [state, setState] = useState('');

//   const onChangeHandler = (e) => {
//     ydoc.current.transact(() => {
//       ytext.current.delete(0, ytext.current.toString().length);
//       ytext.current.insert(0, e.target.value);
//     });
//   };

//   return (
//     <>
//       {/* <input
//         value={state}
//         onChange={onChangeHandler}
//         style={{ color: 'purple' }}
//       /> */}
//       <div>
//         <p style={{ color: 'purple' }}>{state}</p>
//       </div>
//     </>
//   );
// }
