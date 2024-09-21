import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // this is to remove the quick flicker that happens when you refresh a page
  // and the unstyled version is briefly shown. It's due to the CSS from StyledComponents
  // not being rendered on the server before being sent to the browser
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // .collectStyles goes through every component that needs to be rendered
    // out to the page & it will see if there's any CSS in there which it will
    // render it out to the server
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    // this is returning the page with whatever styles are included in it
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
