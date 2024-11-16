import '../styles/globals.css';
import Layout from '../components/Layout';
import { PluginProvider } from '../context/PluginContext';

function MyApp({ Component, pageProps }) {
  return (
    <PluginProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PluginProvider>
  );
}

export default MyApp;
