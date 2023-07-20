import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import { MonacoBinding } from 'y-monaco';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

function MonacoEditor() {
  const editorRef = useRef(null);
  // const [count, setCount] = useState(0);
  // editor value -> yjs text value (a text value shared by multiple people)
  // one person deletes text -> deletes from the overal shared text value
  // handled by yjs

  // initialize yjs, tell it to listen to our monaco instance

  const handleEditorDidMount = (editor, monaco) => {
    // eslint-disable-next-line no-console
    console.log('handleEditorDidMount', editor);
    editorRef.current = editor;
    // initilize yjs
    const doc = new Y.Doc(); // a colleciton of shared objects -> Text
    // connect to peers (or start conneciton) with webrtc
    const provider = new WebrtcProvider('test-room2', doc); // room1, room2
    const type = doc.getText('monaco'); // doc { 'monaco' :  'whar out IDE is showing' }
    // bind yjs to monaco
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness, // connect everything to webrtc binding to testroom
    );

    // eslint-disable-next-line no-console
    console.log(provider.awareness);
    // eslint-disable-next-line no-console
    console.log(type);
  };

  return (
    <Editor
      height="20rem"
      width="30vw"
      // theme="vs-dark"
      // language="plaintext"
      language="md"
      onMount={handleEditorDidMount}
    />
  );
}
export default MonacoEditor;

// logic
// everyone is connected through webrtc  via a certain room name like 'test-room'
// through webrtc everyone is getting access to Y.Doc()
// Y.Doc()-> 'monaco' : theTextInYourIDE
// MonacoBinding : text delete ,text insert
// MonacoBinding is what changes the value of the Y.Doc()

// 'room1' -> acess to this specific provider
// 'room2' -> acess to this specific provider

// can check if user is authenticated
// and THEN give access to the WebRTC Provider

// only get into 'room2' if you are a member
// if (user is in room){
// allow the user to listen to WebRTC
// }
