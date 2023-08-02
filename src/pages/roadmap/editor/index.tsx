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
  const [label, onChangeLabel, setLabel] = useInput(''); // 노드 상세 내용
  const [color, onChangeColor, setColor] = useInput(''); // 노드 색
  // const [gptDetails, onChangeGptDetails, setGptDetails] = useInput(''); // 노드 색
  const [id, onChangeId, setId] = useInput('');
  const [toggle, onChangeToggle, setToggle] = useInput('');
  const [search] = useSearchParams();
  const [state, setState] = useState([
    // tiptap 에디터 내용
    { id: '1', details: '' },
    { id: '2', details: '' },
  ]);
  const [roadmapDescription, setRoadmapDescription] = useState('');
  const [roadmapImage, setRoadmapImage] = useState('');

  const [roadmapTag, setRoadmapTag] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roadMapTitle, onRoadMapTitleChange, setRoadMapTitle] = useInput('');

  const editor = useEditor({
    extensions: [
      StarterKit, // history handled by  yjs if set to true
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
    content: state.filter((v) => v?.id === id)[0]?.details || '',

    onUpdate(e) {
      // console.log(e.editor?.getHTML());
      setToggle(e.editor?.getHTML());
      // console.log('e.editor', e.editor);
      // eslint-disable-next-line array-callback-return
      state.map((item, idx) => {
        if (item?.id !== id) return;
        const copyState = [...state];
        copyState.splice(idx, 1, {
          id: item?.id,
          details: e.editor?.getHTML(),
        });
        setState(copyState);
      });
    },
  });

  useMemo(() => {
    const filt = state.filter((v) => v?.id === id);
    // console.log('filt', filt);
    setToggle(filt);
    if (editor) {
      // mount 시 에러
      editor.commands.setContent(filt[0]?.details, false, {
        preserveWhitespace: 'full', // 빈칸 인식 X 에러 해결
      });
    }

    if (label !== '' && filt.length === 0) {
      setState([...state, { id, details: '' }]);
    }
  }, [state, setToggle, editor, label, id]);

  const toggleEditor = useMemo(() => {
    // const toggleEditor = useCallback(() => {
    return (
      id === toggle[0]?.id && (
        <div>
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
      )
    );
  }, [id, toggle]);

  return (
    <MainLayout>
      <EditorWrap>
        <div className="roadMapWrap">
          <ReactFlowProvider>
            <RoadMapCanvas
              state={state}
              editor={editor}
              id={id}
              toggleEditor={toggleEditor}
              roadMapTitle={roadMapTitle}
              onChangeId={onChangeId}
              onRoadMapTitleChange={onRoadMapTitleChange}
              setRoadMapTitle={setRoadMapTitle}
              setId={setId}
              label={label}
              color={color}
              onChangeColor={onChangeColor}
              setColor={setColor}
              onChangeLabel={onChangeLabel}
              setLabel={setLabel}
              setState={setState}
              roadmapImage={roadmapImage}
              roadmapDescription={roadmapDescription}
              roadmapTag={roadmapTag}
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
  /* height: 100vh; */
  & .editor {
    /* & > .content {
      width: 100%;
      overflow-y: scroll;
    } */
  }

  & .roadMapWrap {
    /* height: 100%; */
    width: 100%;
  }
`;
