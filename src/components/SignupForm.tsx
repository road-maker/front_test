/* eslint-disable no-console */
import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Image,
  Paper,
  PaperProps,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'auth/useAuth';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from './common/hooks/useInput';
import { useUser } from './user/hooks/useUser';

function SignUpForm(props: PaperProps): ReactElement {
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] =
    useInput('');
  const auth = useAuth();
  const { user } = useUser();
  const form = useForm({
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      nickname: (value) =>
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
    transformValues: (values) => ({
      nickname: `${values.nickname}`,
      email: `${values.email}`,
      password: `${values.password}`,
      confirmPassword: `${values.confirmPassword}`,
    }),
  });

  if (user) {
    console.log('redirect to user page!');
    // return <Redirect to={`/users/${user.id}`} />;
  }

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
          회원가입
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          이미 계정이 있으신가요?
          <Anchor
            size="sm"
            component="button"
            ml={5}
            mb={20}
            onClick={() => {
              navigate('/users/signin');
            }}
          >
            로그인
          </Anchor>
        </Text>
        <form
          onSubmit={form.onSubmit((values) => {
            setNickname(values.nickname);
            setEmail(values.email);
            setPassword(values.password);
            setConfirmPassword(values.confirmPassword);
          })}
        >
          <TextInput
            mt="xl"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            withAsterisk
            value={nickname}
            onChange={onChangeNickname}
          />
          <TextInput
            mt="xl"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            withAsterisk
            value={email}
            onChange={onChangeEmail}
          />
          <PasswordInput
            mt="xl"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            withAsterisk
            value={password}
            onChange={onChangePassword}
          />
          <PasswordInput
            mt="xl"
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요"
            withAsterisk
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <Center>
            <Button
              type="submit"
              mt="xl"
              onClick={() => auth.signup(email, password, nickname)}
            >
              회원가입
            </Button>
          </Center>
          <Divider label="Or" labelPosition="center" my="lg" />
          <Group grow mb="md" mt="md">
            <Button variant="default">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAADjCAMAAADdXVr2AAABRFBMVEX////qQzU0qFNChfT7vAUtfPPt9P4+g/RnmfZsnPb7uAD7ugDqPzDpMR7qPS7qQDHpNyYeo0Utpk7pMiD97ezpOSkYokL1sa38wQAlpEn/+/sqevM4gPT62df0paDwhn/sVUn50c786ef//vfg8ORkuXny+fQxqUi23L/3wL37393rSTv2ubX8zV7pOTX94qdxvoPV4vyn1bLl7f2KyJnE48vvd27tXlPtaWDyk4ztZ178yEf+8tXtYj394qbvcDv803X+6r/+9uL8zmX7xDOgvvmCqvf93ZX92Ie+0vvW7NtZkvVJr2M+rFtMltOaz6bwf3jxjYbvemP0kTX4qSbxgDb2ni75syH+57fvayuYuPh9p/fI2PuKtEfuvh9YrlPNui+etD+3tjRsrkl+vXMypWVGj95NnMFIpJdLoK5IqIZ/w4/UiDJ1AAALp0lEQVR4nO2c63vayBXGxcWXALpi4QhzdQCDIV1CDAYn3WbT2LvGcnG6226bpNvutmm39f//vSOukhBoRjqakXjyPk8+7O4D4pdz5rxzZo6W44LXUbHaKY3Kg6vLSrvdjqE/lcvh4P2o1KkWjyg8Pyjli63RoM3zfFZSVSEjirGFRFEQVFXKov9WGYw6xTzrn0qofPH4ocLzkiqsmJwlCqrEZy8fjqPCmK+WrjK85ApmhZR4YVgKPeLp8UDg1QwB2UqCymcGnfAux/NSBUXNE9oSUeIvS2EkPDqu8CpJQm6SiAiPw0WYbw15CYJtSTiosmZa6nSUyfrLyXUJfDscSVodwCSlXaIklc9Zw7UqPHTgVlL5QZElXKedDSJwKwn8FTPATixguBngkEmKtioU4GaAD6e04YpXPB24KWB2RHW7dvQQYEFxktRu0aM7llSqcEgiP6Rkg+eVLG04QwJfokE3orjorMpeBl5iihWJEVzMCOBxsHQlZqGbiR8EWEKPrpisOrMEMbBWouWzVwWRGFSFGfGs0WbKDgNI0Pwlw5pildoGr6Dn7RAk5kJiFngBtihtnzElwjpEKSTLbiV+BEf3PnR0qMA8QNENmLudk/gBDN0wNCXTLCEG0kHkL6k3PzgS2l/o3OkqIbK7lTIwmcmFlC4DQ3cVysyEohuEkg6oZnIP4XQEoA31KJRunonB0B2HcCeG6EQYumo46QSYdXcKeNkKJ6iama94m24IVlDrLpyWAEYH3b6K0xkrY8jKUDYrqQJ5doDRFQHpjIEjXhy+L3Va1eI5UrFYbR2PylcSnyU6WBSB1h2XJxqY2oqW5dvvN42LHVVLDxnsOR9Rhbohgll4osrHyi2333TaeRBwpkagaibHdSBSU+DbI8xL/3y17EoItu64I/87TVHKPhCdROZbV/y2lIGj44Z+WzwxG/MwUHRe3gwoAu3EOP+pKWbbHW9PPhptABRVMLojn22CFPMIN3142WkiAZCOG/hKTVX1eTt1Oly7H4XqEQz56hNEvuz/aqoVs2YoYFXhuLYPQ5cqIONf+QfzXzFk7LiSd1MQ4S41TLfAogBI58Py1AzgldvR4qpUlCAvKsued2NZ4ImF2Z0UaOy4c891Bf46v4MqaCYDesns1RTA74INVSUBsqp47/KEdiDzpOfAAwJ/9BY8oRKKiXU3vU797jce6NTLsL/4M9Or9NPvyfnUS9a/G0+vU8nk0x/ahHRCROi45+kk4kv9liiAQiUamcm9RcEz9PRPBHwizBUwBb1JJ+d8f8bmg90yBalnCzrE92MbE5APz1taLvo6lTQJzyGCnvwF1Lu0GQ/LIVSwqafA9doSvKlDuAGKbdY/Gl9v0kkbn6tD8MzfrcPWMzudu0NkqbwzAaO/pNbxtjtEZHYrhp47RG+7Q0QoNblnTsHb6hBShFLTOTe3OYQYY/2TSeScmzM+xx6Cp/gynW9tzs2ks0NkolRXuG+24Tk5BM/0bWtSrXm6nc/mEALQjDYlJV3w7A4RreC93Z6bM5kcQhiy/sVE+goHz+QQ0enyptpiC2a+hUOIFdY/mEyuS2/Ol5w5hOTjcpmBsJbeDHDqEFJEzsbm2rwjW+dDDiGUWf9gMrm5noXvx3bECgv3igAP6a+sfy+ZnBr1LUq/8fm8fXoyHmc/RHJR6hufeHcne3R0kjAeR1BZptHzScc9OUhQ0p7xuG+JkjP9PEJ4L9Djfk+El/oqOniFW85+PO2K9zZCeNfocWS5mfRLRxHv4MblIGIdz/fSo4l3SOoLqW8jhJdIuJ6z2PH8uh5VvD3MXnaF57uy0MQ72Se0veSzKOEh4/uOBC/9zjcdTbzCJ6J2CKJwUsW7xTxoWeB9Fy28a7JuL/V11PCI9mT+d5x08T5w7wjoIGyPJh7alZHQJVOvv+CFCO8jIZ7/TQtVvCdf8KKLlzjc6bW3+3jviPCi5XsG3g7vWlBp2eU9J8Lb5Y4B2fou93sIb5e7dbTn3OWzFtQQ7fJJGWpnd/mcE+Ht8il14XaX7xiMg8AdviGa3l/u7v1eYu/lLt/OGncMZL4eqbv1RIHb5cmIxB1Hf66F4u3sE47+VBLF0YEb43lEHV86+TefeIeFA+8iwzMmI4haovRPf8+N/eHdHPoQGd4n43kEtSX9j3hcufAZPj9KkMTv5KXxEfxp3OTPcSSFHd3LPQK6g4PZhzBnqdPJfxp0ca3JDO+2QIJ3N/sQ3nFL+qf4TIrODO8jSW7OCifm7Ef6l/hCss/i4l1EpXM6McdhLT7kB0u6uNJlRPeCZOnN5h0NuS4+5Adxk+QaG7wPJEsvUdiff8zN+Qw/MItV+EjglpXFfa7s57hNOSbhI8vNwofF57YeSCz8wBK+Ogu8G7LcvF1+cIs1LP3AGj4GxXOfiG7aqs+1eV9m8gNL+Bh43zUZXmL1yU3ZafEDi7QedTwyuIWpT+WcnTY/sPI1KNMRbcgW7cJcjtlp9wO21YUseIm9fdNnHVv2NT+wSKa7s74mcgWT60215uxOfmBLT5rmt1/w0qkvZT9QcvYDa3rSrJ5knrdoZVeyHlZv8ANb+Oj17S9OyOgSd7YvMP+frjb7gVU5asuPEM6em5biss0PbHyUlh9papq3LHMti8tWP7BJoeJ+t2RVc61uGlo2tdv9wIanU+B7SVg1HXKTm+9c3P3AxkfB3e+Iz7UL++vfYngDhh/YpAXOd0i68Ix5Fge9Sid/IaULnu8jMV1i75PTF71O4fkBVT7iomnI+av+pXjBC5TvA2nRTDgXFkPjnCe8AOvnjQc6a7NgVtdb+OKKEszhhId1Z2tkLap5DF8w+7P9Oy90a7tpkx41z3yP0HQvCG8r55peOW9QwzNeXLuH3YBekzYJcy3P3p3Ukz3zKTLg8dL+oZei4hI8pHvPePG4XIcKYPPzvz2tO5fgeTeHeQAnEHC1uqyc/cdT+Jz3YyZ5NYeZtLjvEtq4kI2fcPYrcaOQcGr07N/uvbpMJet9X3QTef4Dzj6TG8Nmz1uq6b26TKXkvAM2lnDGFyl/IEzQA6dOyK66r/ScAXpK0dqFZk2ds/+SJeim3ab1r9BnehqAmjIhrKKNZj239vd69r8EUYJiPanpp3oupMl6D5uw0e9qmlPSnOkEDnHi2Oetq+s/fnEjhLI+wdhrj3t1Td60IJBD4G5fCm6msBQE3ZxQrk/6G6NY60/qsuwYt6VwHQKrrswfC5GeK8Scpj9Omv1xrdFocOhPbdxv9i6697mcc0ra+PAcYu/WnWuhHiDflFHRUCBzC8lGyLALNJZDFLZvNm3y3hoFIQyHOMBOzal0v+4HKleHcD4d2ywA94OUi0Ng7MZs8tU7wGtrD+FwqeAqEHcH1Nmvm44nCDzBpInPzTW0NjoE7nbFpnCVT5SgcUeH2MPZSTsJZncGKCeHwN+MrakeOr41h/BSVpbSQ8d3b3WIA7wuKDJ8NofwVDRNCl1+Whyi4HZ2FEW+pUMUth9rRpRv4RAQdMgfQubv8blDuBxJY+siZPuz+NQhoOjg21sAnX32XVVW6mOcGlCVAnvhVrsPFZ8GfZ/fqIeowMgBvAgzCc0CzIFctNk1xj/dClKK7O8SaqNCkaCaHtwYaW/jcTkt5QKdca6xbSEULaDEXGqyflFFTbl68POxNZ3RClQovXXd1BhkqJLr0npxqfFIvcTI90GvOrNqDnfFAUqj/kpdn94SVHKPtF+oMwDvqQCiRcfoVfLmfeBrkB2cIZSiQQJq8iNDOEPjrhyQTSiycsFgzdlVm8QDCKHX4aYg1K/nQI8rjMAxzkqrGj0dilCRc12aHo6pWk93mcHBQNNk7TGEbDM1ml3FM6KCPoo1p8VU40ldyRGM5Syjpl/0Q1AoMdQY9x51WcaZqVKMwTNZ7/bG0UBbqjFuTgfHECWKpSWaxj+ifyvncprenTSjRmZWY9xvTi4eu3Vdv5++R3Cv6/Xu48WkZwzRBfro/wPHK/P8GMOtFAAAAABJRU5ErkJggg=="
                width={20}
                height={20}
                mr={10}
              />
              구글 계정으로 회원가입하기
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}

export default SignUpForm;
