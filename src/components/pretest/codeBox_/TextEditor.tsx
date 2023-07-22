// /* eslint-disable react/state-in-constructor */
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import { convertToRaw, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';

// export default class TextEditor extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   };

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     // eslint-disable-next-line no-console
//     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         />
//       </div>
//     );
//   }
// }
