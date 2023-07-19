// import { Box, Button, Center, Space, Text, TextInput } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { ReactElement } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginForm(): ReactElement {
//   const navigate = useNavigate();
//   const form = useForm({
//     initialValues: {
//       terms: false,
//       user: {
//         email: '',
//         password: '',
//       },
//     },
//   });

//   return (
//     <Box maw={320} mx="auto" mt="xl">
//       <TextInput
//         label="Email"
//         placeholder="이메일을 입력해주세요."
//         {...form.getInputProps('user.email')}
//       />
//       <TextInput
//         label="Password"
//         type="password"
//         placeholder="비밀번호를 입력해주세요."
//         mt="md"
//         {...form.getInputProps('user.password')}
//       />
//       <Space h="md" />

//       <Center>
//         <Button mt="xl">로그인하기</Button>
//       </Center>
//       <Text ta="center" mt="xl">
//         OR
//       </Text>

//       <Space h="md" />
//       <Center>
//         <Button>구글 계정으로 로그인하기</Button>
//       </Center>
//       <Space h="md" />
//       <Text
//         c="blue"
//         td="underline"
//         ta="center"
//         sx={() => ({
//           '&:hover': {
//             cursor: 'pointer',
//           },
//         })}
//         onClick={() => navigate('/users/signup')}
//       >
//         회원가입
//       </Text>
//       {/* <Text size="sm" weight={500} mt="xl">
//         Form values:
//       </Text>
//       <Code block mt={5}>
//         {JSON.stringify(form.values, null, 2)}
//       </Code> */}
//     </Box>
//   );
// }

// export default LoginForm;

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
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm(props: PaperProps): ReactElement {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(['login', 'register']);
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
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        로그인
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          // eslint-disable-next-line no-alert
          alert('로그인 처리해주기');
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            autoComplete="user-email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            autoComplete="user-password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
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
        <button type="button">구글 계정으로 로그인하기</button>
      </Group>
    </Paper>
  );
}
export default LoginForm;
