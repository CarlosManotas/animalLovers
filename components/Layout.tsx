import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeFilled, HeartTwoTone } from '@ant-design/icons';

import Footer from './Footer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  h1 {
    margin: 0;
    font-size: 40px;
    font-family: 'Berkshire Swash', cursive;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
    color: white;
  }
`;

export default function Layout({ children }) {
  const { asPath } = useRouter();
  const title = asPath.replace('/', '');
  const ButtonToHome =
    title !== '' ? (
      <Link href="/">
        <HomeFilled />
      </Link>
    ) : null;

  return (
    <Container>
      <Head>
        <title>Animal Lovers ❤ {title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1>
        {' '}
        {ButtonToHome} Animal Lovers <HeartTwoTone twoToneColor="#b273df" />
      </h1>
      {children}
      <Footer />
    </Container>
  );
}
