import { useSyncedStore } from '@syncedstore/react';
import { useState } from 'react';

import CodeBoxEditor from './index';
import { connect, disconnect, store } from './store';

export default function Wrapper() {
  const [inspecting, setInspecting] = useState(false);
  const state = useSyncedStore(store);
  return (
    <div>
      <div className="toolbar">
        <input type="radio" name="sync" defaultChecked onChange={connect} />{' '}
        Online (enable sync)
        <input type="radio" name="sync" onChange={disconnect} /> Offline
        (disable sync)
        {inspecting && (
          <button
            type="button"
            onClick={() => setInspecting(false)}
            style={{ float: 'right' }}
          >
            Back
          </button>
        )}
        {!inspecting && (
          <button
            type="button"
            onClick={() => setInspecting(true)}
            style={{ float: 'right' }}
          >
            Inspect
          </button>
        )}
      </div>
      <div className="wrapper">
        {inspecting ? (
          <pre>{JSON.stringify(state, undefined, 2)}</pre>
        ) : (
          <CodeBoxEditor />
        )}
      </div>
    </div>
  );
}
