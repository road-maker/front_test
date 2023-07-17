import { Box, Button, Center, Space, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactElement } from 'react';
import { Form, useNavigate } from 'react-router-dom';

function LoginForm(): ReactElement {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      terms: false,
      user: {
        email: '',
        password: '',
      },
    },
  });

  return (
    <Form method="post">
      <Box maw={320} mx="auto" mt="xl">
        <TextInput
          label="Email"
          name="email"
          placeholder="이메일을 입력해주세요."
          {...form.getInputProps('user.email')}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          mt="md"
          {...form.getInputProps('user.password')}
        />
        <Space h="md" />

        <Center>
          <Button mt="xl">로그인하기</Button>
        </Center>
        <Text ta="center" mt="xl">
          OR
        </Text>

        <Space h="md" />
        <Center>
          <Button>구글 계정으로 로그인하기</Button>
        </Center>
        <Space h="md" />
        <Text
          c="blue"
          td="underline"
          ta="center"
          sx={() => ({
            '&:hover': {
              cursor: 'pointer',
            },
          })}
          onClick={() => navigate('/users/signup')}
        >
          회원가입
        </Text>
      </Box>
    </Form>
  );
}

export default LoginForm;
