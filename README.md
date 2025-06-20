# Plate: Reproduction of useEditorSelection() not working with YjsPlugin

## Getting started

1. yarn install
2. yarn start
3. Visit http://localhost:5173

After a full refresh the editor should now show two paragraphs saying "1" and "2" (coming from `src/editor.tsx`):
> 1  
> 2  

... but instead it will add a an empty leading or trailing paragraph, like so:
> &nbsp;  
> 1  
> 2

... or so:
> 1  
> 2  
> &nbsp; 

## Bonus when using platejs@49.0.4 or later
`skipInitialization` must be set to `false` in order for the editor to render.
