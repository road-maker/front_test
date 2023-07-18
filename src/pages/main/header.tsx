import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  Header,
  rem,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderMegaMenu() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {' '}
            ROAD_MAKER LOGO IMAGE
            <InputWithButton ml="5rem" />
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant="default" onClick={() => navigate('users/signin')}>
              Log in
            </Button>
            <Button onClick={() => navigate('users/signup')}>Sign up</Button>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="md"
      w="600px"
      rightSection={
        <ActionIcon
          size={32}
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
      placeholder="Search questions"
      rightSectionWidth={42}
      {...props}
    />
  );
}
