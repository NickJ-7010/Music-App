// Node.js Platform Support
import { ReadableStream } from 'web-streams-polyfill';
import { Platform } from '../utils/Utils';
import { v4 as uuid } from 'uuid';
import { sha1 } from 'js-sha1';

const { homepage, version, bugs } = { homepage: "https://github.com/LuanRT/YouTube.js#readme", version: "9.4.0", bugs: { "url": "https://github.com/LuanRT/YouTube.js/issues" } };
const repo_url = homepage?.split('#')[0];

Platform.load({
  runtime: 'node',
  info: {
    version: version,
    bugs_url: bugs?.url || `${repo_url}/issues`,
    repo_url
  },
  server: true,
  //@ts-ignore
  Cache: undefined,
  sha1Hash: async (data: string) => {
    var hash = sha1.create();
    hash.update(data);
    return hash.hex();
  },
  uuidv4() {
    return uuid();
  },
  eval: (text: string, env: any) => {
    if (env.sig) return eval(text.replace("(sig);", `("${env.sig}");`));
    if (env.nsig) return eval(text.replace("(nsig)", `("${env.nsig}")`));
    console.log(text);
    console.log(env);
    //@ts-ignore
    return eval(text, env);
  },
  fetch: globalThis.fetch,
  Request: globalThis.Request,
  Response: globalThis.Response,
  Headers: globalThis.Headers,
  //@ts-ignore
  FormData: globalThis.FormData,
  File: globalThis.File,
  ReadableStream: ReadableStream
});

export * from './lib';
import Innertube from './lib';
export default Innertube;
