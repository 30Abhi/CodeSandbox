import { useParams } from "react-router-dom";
import { treeStructureStore } from "../../../store/treeStructureStore.js"
import { useEffect } from "react";
import { TreeNode } from "../../Molecules/TreeNode/TreeNode.jsx";
import { useFileContextMenuStore } from "../../../store/fileContextStore.js";
import { FileContextMenu } from "../../Molecules/ContextMenu/FileContextMenu.jsx";
import { useFolderContextMenuStore } from "../../../store/folderContextStore.js";
import { FolderContextMenu } from "../../Molecules/ContextMenu/FolderContextMenu.jsx";

export const TreeStructure = () => {

    const { treeStructure, settreeStructure, projectId } = treeStructureStore();

    const { x: fileContextX, y: fileContextY, isopen: fileContextOpen, file:filePath } = useFileContextMenuStore();
    const { x: folderContextX, y: folderContextY, isopen: folderContextOpen, folder: folderpath } = useFolderContextMenuStore();


    useEffect(() => {
        if (treeStructure) {
            console.log("tree : ", treeStructure);
        }
        else {
            settreeStructure(projectId);
        }

    }, [projectId, settreeStructure]);

    return (
        <>
            {fileContextOpen && fileContextX && fileContextY && (
                <FileContextMenu x={fileContextX} y={fileContextY} path={filePath} />
            )}

            {folderContextOpen && folderContextX && folderContextY && (
               <FolderContextMenu x={folderContextX} y={folderContextY} path={folderpath} />
            )}

            <TreeNode filefolderdata={treeStructure} />
        </>



    )
}