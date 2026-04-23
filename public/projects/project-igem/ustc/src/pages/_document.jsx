import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link
            rel="icon"
            href="https://static.igem.wiki/teams/5924/assets/images/web.ico"
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href="https://static.igem.wiki/teams/5924/assets/images/web.ico"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            href="https://static.igem.wiki/teams/5924/assets/images/web.ico"
          />

          {/* Web App Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Meta tags for performance */}
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta
            name="description"
            content="iGEM Team 2025 - Synthetic Biology Innovation and Research"
          />

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="https://static.igem.wiki/teams/5924/assets/fonts/montserrat-thin.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://static.igem.wiki/teams/5924/assets/fonts/montserrat-extrabold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://static.igem.wiki" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://static.igem.wiki" crossOrigin="anonymous" />

          {/* DNS prefetch */}
          <link rel="dns-prefetch" href="https://static.igem.wiki" />
          <link rel="dns-prefetch" href="https://static.igem.wiki" />

          {/* Inline critical CSS */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            body {
              margin: 0;
              padding: 0;
              font-family: 'Montserrat-Thin', sans-serif;
            }
            
            * {
              box-sizing: border-box;
            }
          `,
            }}
          />

          {/* FontAwesome preloading */}
          <link
            rel="stylesheet"
            href="https://static.igem.wiki/teams/5924/assets/css/font-awesome-min.css"
            integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <body>
          <div id="global-loader-static">
            <div className="static-spinner"></div>
          </div>
          <Main />
          <NextScript />

          {/* Add font fallback */}
          <noscript>
            <link
              rel="stylesheet"
              href="https://static.igem.wiki/teams/5924/assets/css/font-awesome-min.css"
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
