/* eslint-disable no-console */

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useAuth } from 'auth/useAuth';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from './common/hooks/useInput';
import { useUser } from './user/hooks/useUser';

function LoginForm(props: PaperProps): ReactElement {
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [type, toggle] = useToggle(['login', 'register']);
  const auth = useAuth();
  const { user } = useUser();

  if (user) {
    // eslint-disable-next-line no-alert
    alert(`${user}, 로그인 성공~`);
  }
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length < 8 || /^[A-Za-z0-9]{8,20}$/.test(val)
          ? '비밀번호는 영문, 숫자, 특수문자를 조합해서 8자 이상 입력해주세요'
          : null,
    },
    transformValues: (values) => ({
      email: `${values.email}`,
      password: `${values.password}`,
    }),
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        로그인
      </Text>

      <form
        onSubmit={form.onSubmit((values) => {
          setEmail(values.email);
          setPassword(values.password);
          console.log(values);
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="이메일 입력"
            value={email}
            onChange={onChangeEmail}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={onChangePassword}
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => {
              toggle();
              navigate('/users/signup');
            }}
            size="xs"
          >
            회원 가입
          </Anchor>
          <Button
            type="submit"
            radius="xl"
            onClick={() => auth.signin(email, password)}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
      <Divider label="Or" labelPosition="center" my="lg" />
      <Group grow mb="md" mt="md">
        <button type="button">구글 계정으로 로그인하기</button>
      </Group>
    </Paper>
  );
}
export default LoginForm;
