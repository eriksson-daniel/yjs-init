import { YjsPlugin } from '@platejs/yjs/react';
import { ParagraphPlugin, Plate, PlateContent, usePlateEditor } from 'platejs/react';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

const App = () => {
  const editor = usePlateEditor({
    plugins: [
      ParagraphPlugin,
      YjsPlugin.configure({
        options: {
          providers: [{ type: 'hocuspocus', options: { url: 'http://localhost:1234', name: 'test' } }],
        },
      }),
    ],
    skipInitialization: true,
  });
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) {
      return;
    }

    editor.getApi(YjsPlugin).yjs.init();

    return editor.getApi(YjsPlugin).yjs.destroy;
  }, [editor, mounted]);

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
