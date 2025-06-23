import { YjsPlugin } from '@udecode/plate-yjs/react';
import { ParagraphPlugin, Plate, PlateContent, createPlateEditor } from '@udecode/plate/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const editor = createPlateEditor({
    plugins: [
      ParagraphPlugin,
      YjsPlugin.configure({
        options: {
          hocuspocusProviderOptions: { url: 'ws://localhost:1234', name: 'test' },
        },
      }),
    ],
  });

  return (
    <Plate editor={editor}>
      <PlateContent placeholder="Type..." style={{ width: 200, height: 200, border: '1px solid black' }} />
    </Plate>
  );
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
