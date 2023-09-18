/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  LoadingOverlay,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';
import { useInput } from 'components/common/hooks/useInput';
import { usePromptAnswer } from 'components/prompts/hooks/usePromptResponse';
import { useUser } from 'components/user/hooks/useUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();
  const [prompt, onPromptChange] = useInput('');
  // const { getprompt } = usePrompt();
  const navigate = useNavigate();
  const { user } = useUser();
  // const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { clearGptAnswer, updateGptAnswer } = usePromptAnswer();
  // const [promptResponse, setPromptResponse] = useState();
  const [promptResponse, setPromptResponse] =
    useState<AxiosResponse | null | void>(null);

  // const onRequestPrompt = useCallback(() => {
  const onRequestPrompt = () => {
    updateGptAnswer({ keyword: prompt });
    setPromptResponse(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRequestPrompt();
    }
  };
  useEffect(() => {
    // @Pyotato : 페이지 안넘어가던 문제 해결~
    if (promptResponse) {
      navigate(`/roadmap/editor`);
    }
  }, [promptResponse, navigate]);
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        value={prompt}
        onChange={onPromptChange}
        onKeyDown={handleKeyDown}
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="md"
        w="600px"
        rightSection={
          <ActionIcon
            size={32}
            onClick={() => {
              if (!user?.accessToken) {
                // eslint-disable-next-line no-alert
                alert('로그인 후 이용가능합니다.');
                navigate('/users/signin');
              }
              // onRequestPrompt();
              onRequestPrompt();
            }}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            {theme.dir === 'ltr' ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        rightSectionWidth={42}
        placeholder="키워드를 입력하세요"
        {...props}
      />
    </>
  );
}
