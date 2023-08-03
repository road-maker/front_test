import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Image,
  rem,
  Text,
} from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  author: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    fontSize: '13px',
  },
}));
export function Roadmap({ id, thumbnailUrl, title, ownerNickname, createdAt }) {
  const { classes, theme } = useStyles();
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  return (
    <Card key={id} radius="md" component="a" className={classes.card} ml={100}>
      <Card.Section>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title}.img`}
            height={160}
            width={260}
            style={{ cursor: 'pointer' }}
            onMouseOver={() => {
              setCurrentPage(id);
            }}
            onClick={() => {
              currentPage && navigate(`/roadmap/post/${currentPage}`);
            }}
          />
        ) : (
          <Image
            src="https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D"
            alt={`${title}.img`}
            height={160}
            width={260}
            style={{ cursor: 'pointer' }}
            onMouseOver={() => {
              setCurrentPage(id);
            }}
            onClick={() => {
              currentPage && navigate(`/roadmap/post/${currentPage}`);
            }}
          />
        )}
      </Card.Section>
      <Text className={classes.title} mt={10}>
        {createdAt}
      </Text>
      <Text
        className={classes.title}
        mt={10}
        onMouseOver={() => {
          setCurrentPage(id);
        }}
        onClick={() => {
          currentPage && navigate(`/roadmap/post/${currentPage}`);
        }}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </Text>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {ownerNickname}
      </Text>

      <Group spacing={5}>
        <ActionIcon>
          <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
        </ActionIcon>
        <ActionIcon>
          <IconBookmark
            size="1.2rem"
            color={theme.colors.yellow[6]}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon>
          <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
