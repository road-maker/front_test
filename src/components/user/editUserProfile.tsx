import { Box, Button, Paper, TextInput } from '@mantine/core';
// import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Form, Formik } from 'formik';

// import { useRef } from 'react';
// import { useInput } from '../common/hooks/useInput';
import { usePatchUser } from '../common/hooks/usePatchUser';
import { useUser } from './hooks/useUser';

function EditUserProfile() {
  const { user } = useUser();
  const patchUser = usePatchUser();
  //   const openRef = useRef<() => void>(null);
  const formElements = ['닉네임', '자기소개', '백준 아이디'];
  interface FormValues {
    nickname: string;
    text: string;
    bjid: string;
  }
  //   const [files, setFiles] = useState<FileWithPath[]>([]);

  //   const previews = files.map((file, index) => {
  //     const imageUrl = URL.createObjectURL(file);
  //     return (
  //       <Image
  //         key={index}
  //         src={imageUrl}
  //         imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
  //       />
  //     );
  //   });

  return (
    <Box maw={400} mx="auto" m={200}>
      <Paper radius="md" p="xl" withBorder>
        <h2>프로필 수정</h2>
        {/* <Button onClick={() => openRef.current()}>프로필 사진 업로드</Button> */}
        <Formik
          enableReinitialize
          initialValues={{
            nickname: user?.nickname ?? '',
            text: user?.text ?? '',
            bjid: '',
            // bjid: user?.bjid ?? '',
          }}
          onSubmit={(values: FormValues) => {
            patchUser({ ...user, ...values });
          }}
        >
          <Form>
            {formElements.map((element) => (
              <TextInput mt="xl" id={element} label={element} />
            ))}
            <Button mt={6} type="submit">
              수정하기
            </Button>
          </Form>
        </Formik>
      </Paper>
    </Box>
  );
}

export default EditUserProfile;
