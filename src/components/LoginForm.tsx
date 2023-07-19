/* eslint-disable no-console */

import {
  Anchor,
  Button,
  Checkbox,
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

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length < 8 || /^[A-Za-z0-9]{8,20}$/.test(val)
          ? '비밀번호는 영문, 숫자, 특수문자를 조합해서 8자 이상 입력해주세요'
          : null,
    },
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
          console.log(form);
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            // value={form.values.email}
            // onChange={(event) =>
            //   form.setFieldValue('email', event.currentTarget.value)
            // }
            value={email}
            onChange={onChangeEmail}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={onChangePassword}
            // value={form.values.password}
            // onChange={(event) =>
            //   form.setFieldValue('password', event.currentTarget.value)
            // }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            // onClick={() => toggle()}
            onClick={() => {
              toggle();
              navigate('/users/signup');
            }}
            size="xs"
          >
            회원 가입
            {/* {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"} */}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
      <Divider label="Or" labelPosition="center" my="lg" />
      <Group grow mb="md" mt="md">
        <button type="button" onClick={() => auth.signin(email, password)}>
          구글 계정으로 로그인하기
        </button>
      </Group>
    </Paper>
  );
}
export default LoginForm;
