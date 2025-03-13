import { create } from "zustand";
import { activeFileStore } from "./activeFileTabStore.js";
import { treeStructureStore } from "./treeStructureStore.js";
import { useFileContextMenuStore } from "./fileContextStore.js";
import { useFolderContextMenuStore } from "./folderContextStore.js";
import { useContainerPortStore } from "./ContainerPortStore.js";

export const useEditorsocketStore = create((set) => ({

    editorSocket: null,

    setEditorSocket: (incomingSocket) => {

        const activefilesetter = activeFileStore.getState().setActiveFiletab;

        const TreeStructuresetter = treeStructureStore.getState().settreeStructure;

        const setIsOpenFile= useFileContextMenuStore.getState().setIsopen;

        const setIsOpenFolder= useFolderContextMenuStore.getState().setIsopen;
        const ContainerPortSetter= useContainerPortStore.getState().setContainerPort;

        //becoz the function in returned by create of zustand in setActiveFiletab is a special func 
        //it is a hook so a hook cannot be called inside another hook 
        // so zustand have a getState() function which provides access to keys to another hook created by zustand

        incomingSocket.on("readFileSuccess", (data) => {

            console.log("readfile success ", data.value);

            const fileExtension = data.filefolderpath.split('.').pop();
            console.log("fileExtension ", fileExtension);

            activefilesetter(data.filefolderpath, data.value, fileExtension);
        });

        incomingSocket.on('deleteFileSuccess', () => {
            TreeStructuresetter();
            setIsOpenFile(false)
        })

        incomingSocket.on('deleteDirectorySuccess',()=>{
            TreeStructuresetter();
            setIsOpenFolder(false)
        })

        incomingSocket.on('createFileSuccess',()=>{
            TreeStructuresetter();
            
        })
        incomingSocket.on('createFolderSuccess',()=>{
            TreeStructuresetter();
            
        })
        incomingSocket.on('renameSuccess',()=>{
            TreeStructuresetter();
            
        })
        incomingSocket.on('RecievedContainerPort',({Port})=>{
            console.log("Container Port",Port);
            ContainerPortSetter(Port);
            
        })


        set({
            editorSocket: incomingSocket,
        });
    }

}));