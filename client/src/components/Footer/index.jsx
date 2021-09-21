import {
  Flex,
  Box,
  Container,
  Link,
  Stack,
  //   Switch,
  Grid,
  useColorModeValue,
  //   useColorMode,
} from '@chakra-ui/react';

import { Logo } from './Logo';

export const Footer = () => {
  return (
    <Box
      minW="full"
      pt={2}
      pb={{ base: 8, md: 4 }}
      // position="absolute"
      // bottom="0"
      // shrink="false"
      as="footer"
      flexShrink="false"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Logo />
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/upload'}>Submission</Link>
          <Link href="mailto:ludi@illinois.edu">Contact</Link>
        </Stack>
      </Container>
    </Box>
  );
};

export const WithFooter = ({ children }) => {
  return (
    <Grid h="100vh" templateRows="repeat(2, 1fr)" gap={10}>
      <Box>{children}</Box>
      <Box mt="auto">
        <Footer />
      </Box>
    </Grid>
  );
};
