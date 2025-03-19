import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
