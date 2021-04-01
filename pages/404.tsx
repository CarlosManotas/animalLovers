import Link from 'next/link';
import { Button } from 'antd';

import { Layout } from '../components';

export default function ErrorPage() {
  return (
    <Layout>
      <img src="/notFound.png" alt="not found" />
      <h2 style={{ color: 'white' }}>Not found</h2>
      <Link href="/">
        <Button type="ghost" style={{ color: 'white' }}>
          Go Back to Home
        </Button>
      </Link>
    </Layout>
  );
}
