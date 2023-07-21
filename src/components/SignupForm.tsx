/* eslint-disable no-alert */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Center,
  PaperProps,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'auth/useAuth';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useInput } from './common/hooks/useInput';
import { useUser } from './user/hooks/useUser';

function SignUpForm(props: PaperProps): ReactElement {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] =
    useInput('');
  const auth = useAuth();
  const { user } = useUser();
  const form = useForm({
    initialValues: {
      nickname,
      email,
      password,
      confirmPassword,
    },
    validate: {
      nickname: (value) =>
        value.length < 2 ? '닉네임은 2글자 이상이어야합니다.' : setNickname(''),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 8 || /^[A-za-z0-9]{8,20}$/.test(value)
          ? '비밀번호는 영문 , 숫자, 특수문자를 조합해서 8자 이상 입력해주세요.'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },

    transformValues: (values) => ({
      nickname: `${values.nickname}`,
      email: `${values.email}`,
      password: `${values.password}`,
      confirmPassword: `${values.confirmPassword}`,
    }),
  });

  if (user) {
    console.log('redirect to user page!');
  }

  return (
    <Box maw={400} mx="auto" m={200}>
      <Title order={1}>회원가입</Title>
      <form
        onSubmit={() => {
          setNickname(nickname);
          setEmail(email);
          setPassword(password);
          setConfirmPassword(confirmPassword);
        }}
        // onSubmit={form.onSubmit((values) => {
        //   setNickname(values.nickname);
        //   setEmail(values.email);
        //   setPassword(values.password);
        //   setConfirmPassword(values.confirmPassword);
        // })}
      >
        <TextInput
          mt="xl"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          withAsterisk
          autoComplete="username"
          value={nickname}
          onChange={onChangeNickname}
          {...form.getInputProps('nickname')}
        />
        <TextInput
          mt="xl"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          withAsterisk
          autoComplete="new-email"
          value={email}
          onChange={onChangeEmail}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="xl"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          withAsterisk
          value={password}
          autoComplete="new-password"
          onChange={onChangePassword}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="xl"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          withAsterisk
          autoComplete="current-password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          {...form.getInputProps('confirmPassword')}
        />
        <Button
          type="submit"
          mt="xl"
          onClick={() => auth.signup(email, password, nickname)}
        >
          회원가입
        </Button>
        <Text ta="center" mt={100}>
          OR
        </Text>
        <Center>
          <Button type="submit" mt="xl">
            구글 계정으로 회원가입
          </Button>
        </Center>
        <Text ta="center" mt="xl">
          <Link to="..">이미 계정이 있으신가요?</Link>
        </Text>
      </form>
    </Box>
  );
}

export default SignUpForm;
