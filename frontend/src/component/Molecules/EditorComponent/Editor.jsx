import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useEditorsocketStore } from '../../../store/editorSocketStore.js';
import { activeFileStore } from '../../../store/activeFileTabStore.js';
import { getExtension } from '../../../utils/getExtension.util.js';

export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null
    });

    const { activeFileTab } = activeFileStore();

    async function downloadtheme() {
        const response = await fetch('/dracula.json');
        const data = await response.json();

        setEditorState({ ...editorState, theme: data })

    }

    function handletheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    function handlelanguage(){
        const extension=activeFileTab?.extension;
        return getExtension(extension);
    }

    const { editorSocket } = useEditorsocketStore();



    let timerId = null;
    function onChangeHandler(value) {
        //debouncing

        // if data changes before the timer clear it and start new timer
        if (timerId != null) {
            clearTimeout(timerId);
        }

        //else emit the event
        timerId = setTimeout(() => {
            console.log("changes in editor ");
            editorSocket.emit("writeFile", {
                data: value,
                path: activeFileTab.path
            })
        }, 2000);


    }

    useEffect(() => {
        downloadtheme();
    }, [editorSocket])


    return (

        <>
            {
                editorState.theme &&
                <Editor
                    height="100vh"
                    defaultLanguage={undefined}
                  
                    defaultValue="// some comment"
                    options={{
                        fontSize: "18px",
                        fontFamily: "monospace"
                    }}
                    onMount={handletheme}
                    value={activeFileTab?.value}
                    language={handlelanguage()}
                    onChange={onChangeHandler}
                />
            }
        </>

    )
}