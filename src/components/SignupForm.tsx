/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// import { ReactElement } from 'react';
// import { Link } from 'react-router-dom';

// function SignupForm(): ReactElement {
//   return (
//     <>
//       <form>
//         <h1>회원가입</h1>
//         <p>이름</p>
//         <input type="text" />
//         <p>닉네임</p>
//         <input type="text" />
//         <p>이메일</p>
//         <input type="email" />
//         <p>비밀번호</p>
//         <input type="password" />
//         <button type="button">회원가입</button>
//       </form>
//       <p>OR</p>
//       <button type="button">구글 계정으로 회원가입하기</button>
//       <p>
//         <Link to=".." relative="path">
//           이미 계정이 있으신가요?
//         </Link>
//       </p>
//     </>
//   );
// }

import { Box, Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: 'secret',
      confirmPassword: 'sevret',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? '닉네임은 2글자 이상이어야합니다' : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : '유효한 이메일이 아닙니다',
      confirmPassword: (value, values) =>
        value !== values.password || value === ''
          ? '비밀번호가 일치하지 않습니다'
          : null,
      password: (value) =>
        value.length < 8 ? '비밀번호는 8자 이상 입력해주세요' : null,
    },
  });

  return (
    <Box maw={400} mx="auto" m={200}>
      <Title order={1}>회원가입</Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          mt="xl"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="xl"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          withAsterisk
          {...form.getInputProps('email')}
        />

        <PasswordInput
          mt="xl"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          withAsterisk
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt="xl"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          withAsterisk
          {...form.getInputProps('confirmPassword')}
        />

        <Button type="submit" mt="xl">
          회원가입
        </Button>
      </form>
    </Box>
  );
}

export default Demo;
