import { Server } from '@hocuspocus/server';
import { slateNodesToInsertDelta } from '@slate-yjs/core';
import { applyUpdateV2 } from 'yjs';
import * as Y from 'yjs';

const server = Server.configure({
  port: 1234,

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async onLoadDocument() {
    const content = [
      { type: 'p', children: [{ text: '1' }] },
      { type: 'p', children: [{ text: '2' }] },
    ];

    const doc = new Y.Doc();
    const xmlText = doc.get('content', Y.XmlText);
    const insertDelta = slateNodesToInsertDelta(content);
    xmlText.applyDelta(insertDelta);
    const state = Y.encodeStateAsUpdateV2(doc);
    const data = Buffer.from(state).toString('base64');
    const update = new Uint8Array(Buffer.from(data, 'base64url'));

    applyUpdateV2(doc, update);

    return doc;
  },
});

server.listen();
