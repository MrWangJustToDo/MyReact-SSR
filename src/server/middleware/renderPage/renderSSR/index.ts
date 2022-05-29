/* eslint-disable @typescript-eslint/no-var-requires */
import { ServerError } from "server/utils/error";

import { composeRender } from "../compose";
import { globalEnv, initLang, initStore, loadCookie, loadStore } from "../middleware";

import type { AnyAction } from "../compose";

const targetRender: AnyAction = async ({ req, res, store, lang, env }) => {
  if (!store || !lang || !env) {
    throw new ServerError("初始化失败", 500);
  } else {
    const { targetRender } = require("./renderAntDesign");
    return targetRender({ req, res, store, lang, env });
  }
};

export const renderSSR = composeRender(globalEnv, initLang, initStore, loadStore, loadCookie)(targetRender);
