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
import { ReactElement, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { styled } from 'styled-components';

import { useInput } from '../../../components/common/hooks/useInput';
import RoadMapCanvas from '../../../components/editor/RoadMapEditor';
import PostedRoadmap from './postedRoadmap';
import InteractionFlow from './userRoadmap';

export default function CompleteRoadmap(): ReactElement {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roadMapTitle, onRoadMapTitleChange, setRoadMapTitle] = useInput(
    search.get('title') || '',
  );
  const ydoc = useRef(null);
  const ytext = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
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
      console.log(e.editor?.getHTML());
      setToggle(e.editor?.getHTML());
      console.log('e.editor', e.editor);

      state.map((item, idx) => {
        if (item.id !== id) return;

        const copyState = [...state];
        // copyState.splice(idx, 1, {
        copyState.splice(idx, 1, {
          id: item.id,
          details: e.editor?.getHTML(),
        });
        setState(copyState);
      });
    },
  });
  useMemo(() => {
    const filt = state.filter((v) => v.id === id);
    console.log('filt', filt);
    setToggle(filt);
    if (editor) {
      editor.commands.setContent(filt[0]?.details || '');
    }

    if (label !== '' && filt.length === 0) {
      setState([...state, { id, details: '' }]);
    }
    // console.log('state', state);
  }, [state, id, setToggle, label, editor]);

  const toggleEditor = useMemo(() => {
    if (toggle.length === 0) return <div />;
    return id === toggle[0].id ? (
      <div>
        로드맵 제목 :{' '}
        <input
          value={roadMapTitle}
          onChange={onRoadMapTitleChange}
          placeholder="로드맵 제목을 입력해주세요."
        />
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
  }, [toggle, id]);

  return (
    <EditorWrap>
      <div>{toggleEditor}</div>
      <div className="roadMapWrap">
        <ReactFlowProvider>
          <InteractionFlow
            state={state}
            // editor={state}
            editor={editor}
            id={id}
            onChangeId={onChangeId}
            setId={setId}
            label={label}
            onChangeLabel={onChangeLabel}
            setLabel={setLabel}
            setState={setState}
            // onChange={onChangeHandler}
            // ydoc={ydoc}
            // ytext={ytext}
          />
        </ReactFlowProvider>
      </div>
    </EditorWrap>
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
