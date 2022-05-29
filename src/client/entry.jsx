import { loadableReady } from "@loadable/component";
import { Root } from "./antDesignEntry";

import { createUniversalStore } from "store";
import { log } from "utils/log";
import { safeData } from "utils/safeData";

const place = document.querySelector("#__content__");

const preLoadEnvElement = document.querySelector("script#__preload_env__");

const preLoadStateElement = document.querySelector("script#__preload_state__");

const store = createUniversalStore({
  initialState: JSON.parse(preLoadStateElement?.innerHTML || "{}"),
});

window.__ENV__ = JSON.parse(preLoadEnvElement?.innerHTML || "{}");

window.__PRELOAD_STORE_STATE__ = JSON.parse(preLoadStateElement?.innerHTML || "{}");

safeData(window.__ENV__);

safeData(window, "__ENV__");

safeData(window.__PRELOAD_STORE_STATE__);

safeData(window, "__PRELOAD_STORE_STATE__");

const React = require("react");
const { hydrate, render } = require("react-dom");
if (__CSR__) {
  log("pure render by client", "warn");
  const { preLoadLang } = require("utils/preLoad");
  preLoadLang({ store, lang: window.__ENV__.LANG }).then(() => loadableReady(() => render(<Root store={store} />, place)));
} else {
  if (!window.__ENV__.isSSR) {
    loadableReady(() => render(<Root store={store} />, place));
  } else {
    if (window.__ENV__.isDEVELOPMENT && window.__ENV__.isMIDDLEWARE) {
      log("not hydrate render on client", "warn");
      loadableReady(() => render(<Root store={store} />, place));
    } else {
      loadableReady(() => hydrate(<Root store={store} />, place));
    }
  }
}
