// nprogress is the package used to create the loading bar
// at the top of the page to show the user something is happening
// when they click a link
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
// we're importing the router from Next so we can hook into some
// of the events that happen which is then combined with nprogress
// to create the loading bar

// this is our custom loading bar style
import '../components/styles/nprogress.css';

// This is for the loading bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
