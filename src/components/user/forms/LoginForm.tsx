/* eslint-disable no-console */
import {
  Anchor,
  Box,
  Button,
  // Divider,
  Group,
  // Image,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactElement } from 'react';
import { Form, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../auth/useAuth';
import { useInput } from '../../common/hooks/useInput';

function LoginForm(props: PaperProps): ReactElement {
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const auth = useAuth();
  // const { user } = useUser();
  // const { user } = useUser();
  // if (user) {
  // navigate('/');
  // }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    transformValues: (values) => ({
      email: `${values.email}`,
      password: `${values.password}`,
    }),
  });

  return (
    <Box maw={400} mx="auto" m={200}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          로그인
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          아직 계정이 없으신가요?
          <Anchor
            size="sm"
            component="button"
            ml={5}
            mb={20}
            onClick={() => {
              navigate('/users/signup');
            }}
          >
            회원가입
          </Anchor>
        </Text>

        <Form
          onSubmit={form.onSubmit((values) => {
            setEmail(values.email);
            setPassword(values.password);
          })}
        >
          <Stack>
            <TextInput
              required
              label="이메일 입력"
              placeholder="user@roadmaker.com"
              autoComplete="current-email"
              value={email}
              onChange={onChangeEmail}
              radius="md"
            />

            <PasswordInput
              required
              label="비밀번호"
              placeholder="Your password"
              autoComplete="current-password"
              value={password}
              onChange={onChangePassword}
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              type="submit"
              fullWidth
              variant="light"
              onClick={() => auth.signin(email, password)}
            >
              로그인
            </Button>
          </Group>
        </Form>
      </Paper>
    </Box>
  );
}
export default LoginForm;
