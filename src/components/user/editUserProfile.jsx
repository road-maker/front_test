import { Box, Button, Group, Paper, TextInput } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseUserInfo } from './hooks/useProfile';
import { useUser } from './hooks/useUser';

function EditUserProfile() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const { updateInfo } = UseUserInfo();
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (user?.member) {
      setInputs({
        nickname: user.member.nickname,
        bio: user.member.bio,
        baekjoonId: user.member.baekjoonId,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateInfo(inputs);
      updateUser({
        ...user,
        member: { ...user.member, ...inputs }, // user 객체의 member 속성 업데이트
      });
      console.log('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <Box maw={400} mx="auto" m={200}>
      <Paper radius="md" p="xl" withBorder>
        <h2>프로필 수정</h2>
        <form>
          <TextInput
            mt="xl"
            id="nickname"
            label="닉네임"
            name="nickname"
            value={inputs.nickname || ''}
            onChange={handleChange}
          />
          <TextInput
            mt="xl"
            id="자기소개"
            label="자기소개"
            name="bio"
            value={inputs.bio || ''}
            onChange={handleChange}
          />
          <TextInput
            mt="xl"
            id="백준 아이디"
            label="백준 아이디"
            name="baekjoonId"
            value={inputs.baekjoonId || ''}
            onChange={handleChange}
          />

          <Group position="apart" mt={30}>
            <Button
              type="button"
              variant="outline"
              color="indigo"
              onClick={handleSubmit}
            >
              수정하기
            </Button>
            <Button
              type="button"
              variant="outline"
              color="indigo"
              onClick={() => {
                navigate('..');
              }}
            >
              취소
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}

export default EditUserProfile;
