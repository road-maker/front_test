/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Center,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

function Demo() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        value.length < 8 || /^[A-Za-z0-9]{8,20}$/.test(value)
          ? '비밀번호는 영문, 숫자, 특수문자를 조합해서 8자 이상 입력해주세요'
          : null,
    },
  });

  return (
    <Box maw={400} mx="auto" m={200}>
      <Title order={1}>회원가입</Title>
      <form
        onSubmit={form.onSubmit(async () => {
          await fetch('https://road-test-27b00-default-rtdb.firebaseio.com/');
        })}
      >
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

export default Demo;
