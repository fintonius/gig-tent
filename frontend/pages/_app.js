// nprogress is the package used to create the loading bar
// at the top of the page to show the user something is happening
// when they click a link
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import withData from '../lib/withData';
// we're importing the router from Next so we can hook into some
// of the events that happen which is then combined with nprogress
// to create the loading bar

// this is our custom loading bar style
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';

// This is for the loading bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// getInitialProps is an async NextJS method which means we can wait
// on it to complete a task
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

// this is wrapping the 'MyApp' function in the 'withData' function
// that is in the 'lib' folder. This allows 'MyApp' to access all the
// data stored in the app/web page even though 'MyApp' is basically the
// highest level function on the page - I think. WB is not very clear
// on this stuff, he explains it in lesson 19
export default withData(MyApp);
