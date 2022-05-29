import React from "react";

// NOTE this template only run on the server
// like _document.js in the next.js
export const HTML = ({ lang, children, link = [], script = [], reduxInitialState = "{}", env = "{}" }) => {
  return (
    <html lang={lang || ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="build-time" content={__BUILD_TIME__} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        {link.filter(Boolean).map((ele) => ele)}
        <script src="/reactBundle.js"></script>
        <script
          id="__autoInject__"
          dangerouslySetInnerHTML={{
            __html: `/* will delete this item when page hydrate */ window.__ENV__ = ${env}; document.querySelector("script#__autoInject__")?.remove();`,
          }}
        />
        <script id="__preload_env__" type="application/json" dangerouslySetInnerHTML={{ __html: `${env}` }} />
        <script id="__preload_state__" type="application/json" dangerouslySetInnerHTML={{ __html: `${reduxInitialState}` }} />
      </head>
      <body>
        <div id="__content__" dangerouslySetInnerHTML={{ __html: children || "" }} />
        {script.filter(Boolean).map((ele) => ele)}
      </body>
    </html>
  );
};
