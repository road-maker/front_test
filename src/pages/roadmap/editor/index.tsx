/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { RichTextEditor } from '@mantine/tiptap';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MainLayout from 'layout/mainLayout';
import { ReactElement, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { styled } from 'styled-components';

import { useInput } from '../../../components/common/hooks/useInput';
import RoadMapCanvas from '../../../components/editor/RoadMapEditor';

export default function RoadMapEditor(): ReactElement {
  // const { search } = useLocation();
  const [label, onChangeLabel, setLabel] = useInput('');
  const [id, onChangeId, setId] = useInput('');
  // const [toggle, setToggle] = useState(null);
  const [toggle, onChangeToggle, setToggle] = useInput('');
  const [search] = useSearchParams();
  // const [state, onChangeHandler, setState] = useInput('');
  const [state, setState] = useState([
    { id: '1', details: '' },
    { id: '2', details: '' },
  ]);
  const [roadmapDescription] = useState('');
  const [roadmapDifficulty] = useState('');
  const [roadmapRecommendedTime] = useState('');
  const [roadmapImage] = useState('');
  const [roadmapTag] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roadMapTitle, onRoadMapTitleChange, setRoadMapTitle] = useInput(
    // search.get('title') || '',
    '',
  );

  // useEffect(() => {//
  //   ydoc.current = new Y.Doc();
  //   const wsProvider = new WebsocketProvider(
  //     'ws://localhost:1234',
  //     // 'ws://192.168.177.1:1234',
  //     'stawp',
  //     ydoc.current,
  //     { connect: true, maxBackoffTime: 0 },
  //   );

  //   // wsProvider.on('status', (event) => {
  //   //   console.log(event.status); // logs "connected" or "disconnected"
  //   // });
  //   wsProvider.shouldConnect = false;

  //   ytext.current = ydoc.current.getText('600');
  //   ytext.current.observe(() => {
  //     console.log(ytext.current.toString());
  //     setState(ytext.current.toString());
  //     onChangeHandler(ytext.current.toString());
  //   });
  //   // return () => {
  //   //   wsProvider.destroy();
  //   // };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const editor = useEditor({
    extensions: [
      // StarterKit.configure({ history: false }), // history handled by  yjs
      StarterKit, // history handled by  yjs
      Placeholder.configure({
        placeholder: '로드맵 상세 내용을 입력해주세요.',
      }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: state.filter((v) => v.id === id)[0]?.details || '',

    onUpdate(e) {
      // console.log('ydoc', ydoc);
      // console.log('ytext', ytext);
      console.log(e.editor?.getHTML());
      setToggle(e.editor?.getHTML());
      console.log('e.editor', e.editor);
      // eslint-disable-next-line array-callback-return
      state.map((item, idx) => {
        if (item.id !== id) return;
        // console.log('state.map, item ,label', label);

        const copyState = [...state];
        // copyState.splice(idx, 1, {
        copyState.splice(idx, 1, {
          id: item.id,
          details: e.editor?.getHTML(),
        });
        setState(copyState);
      });

      // setState()
      // setState(e.editor?.getHTML());
    },
  });
  // const removeNode=useMemo(()=>{

  // },[label]);
  useMemo(() => {
    // console.log('state', state);
    // console.log('label', label);
    const filt = state.filter((v) => v.id === id);
    console.log('filt', filt);
    setToggle(filt);
    if (editor) {
      // mount 시 에러
      editor.commands.setContent(filt[0]?.details || '');
    }

    if (label !== '' && filt.length === 0) {
      setState([...state, { id, details: '' }]);
    }
    // console.log('state', state);
  }, [state, id, setToggle, label, editor]);

  const toggleEditor = useMemo(() => {
    if (toggle.length === 0) return <div />;
    // return label === toggle[0].id ? <div>hehe</div> : <div>hoho</div>;
    return id === toggle[0].id ? (
      <div>
        {/* 로드맵 제목 :{' '}
        <input
          //value={roadMapTitle || ''}
          value={roadMapTitle}
          onChange={onRoadMapTitleChange}
          placeholder="로드맵 제목을 입력해주세요."
        /> */}
        <div>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={5}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <div className="content">
              <RichTextEditor.Content />
            </div>
          </RichTextEditor>
        </div>
      </div>
    ) : (
      <div>
        <button type="button" onClick={() => setToggle(toggle[0].id)}>
          상세 내용 수정하기
        </button>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, id]);

  return (
    <MainLayout>
      <EditorWrap>
        <div>
          로드맵 제목 :{' '}
          <input
            // value={roadMapTitle || ''}
            value={roadMapTitle}
            onChange={onRoadMapTitleChange}
            placeholder="로드맵 제목을 입력해주세요."
          />
          {toggleEditor}
        </div>

        <div className="roadMapWrap">
          <ReactFlowProvider>
            <RoadMapCanvas
              state={state}
              // editor={state}
              editor={editor}
              id={id}
              roadMapTitle={roadMapTitle}
              onChangeId={onChangeId}
              onRoadMapTitleChange={onRoadMapTitleChange}
              setRoadMapTitle={setRoadMapTitle}
              setId={setId}
              label={label}
              onChangeLabel={onChangeLabel}
              setLabel={setLabel}
              setState={setState}
              roadmapImage={roadmapImage}
              roadmapDescription={roadmapDescription}
              roadmapRecommendedTime={roadmapRecommendedTime}
              roadmapTag={roadmapTag}
              roadmapDifficulty={roadmapDifficulty}
              // onChange={onChangeHandler}
              // ydoc={ydoc}
              // ytext={ytext}
            />
          </ReactFlowProvider>
        </div>
      </EditorWrap>
    </MainLayout>
  );
}

const EditorWrap = styled.div`
  display: inline-flex;
  width: 100vw;
  height: 100vh;
  & .editor {
    & > .content {
      width: 100%;
      /* height: 85vh; */
      overflow-y: scroll;
      /*
      ::-webkit-scrollbar {
        width: 0.2rem;
      }
      ::-webkit-scrollbar-thumb {
        height: 30%;
        background-color: '#cee6f3';
      }
      ::-webkit-scrollbar-track {
        background-color: '#cee6f3';
      } */
    }
  }

  & .roadMapWrap {
    /* height: 100%; */
    width: 100%;
  }
`;
