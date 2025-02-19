import { useContextModalStore } from "../../../store/ContextModalStore";
import { useEditorsocketStore } from "../../../store/editorSocketStore"
import { useFolderContextMenuStore } from "../../../store/folderContextStore";

export const FolderContextMenu = ({x, y, path}) => {

    const{editorSocket}=useEditorsocketStore();

    const{setIsopen}=useFolderContextMenuStore();

    const{setIsOpen:setModalisOpen,setFileOrFolder,setCreateOrRename}=useContextModalStore();

    const handleFolderDelete=()=>{
        console.log('Folder delete called ', path);
        editorSocket.emit('deleteFolder',{
            folderPath:path
        })
       
    }

    const handleCreateFile=()=>{
        setFileOrFolder('file');
        setCreateOrRename('create');
        setModalisOpen(true);

    }

    const handleCreateFolder=()=>{
        setFileOrFolder('folder');
        setCreateOrRename('create');
        setModalisOpen(true);

    }


    const handleRename=()=>{
        setFileOrFolder('folder');
        setCreateOrRename('rename');
        setModalisOpen(true);
    }


    return (
        <div
            style={{
                border: "1.5px solid black",
                position: 'fixed',
                left:x,
                top: y,
                width: '120px',

            }} 
            
            onMouseLeave={()=>{setIsopen(false)}}
            >

                <button onClick={handleCreateFile} className="Folder-Context-Button" >Create file</button>
                <button onClick={handleCreateFolder} className="Folder-Context-Button">Create folfer</button>
                <button onClick={handleFolderDelete} className="Folder-Context-Button">Delete</button>
                <button onClick={handleRename} className="Folder-Context-Button">Rename</button>

        </div >

    )
}