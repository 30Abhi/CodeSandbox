import { useContextModalStore } from "../../../store/ContextModalStore";
import { useEditorsocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextStore";


import './FileContextMenu.CSS'

export const FileContextMenu=({x,y,path})=>{

    const{editorSocket}=useEditorsocketStore();

    const{setIsOpen:setModalisOpen,setFileOrFolder,setCreateOrRename}=useContextModalStore();
    const handleFileDelete=()=>{
        console.log("file delete called :",path);
        editorSocket.emit('deleteFile',{
            pathtofileforlder:path,
        })
        
    }


    const handleRename=()=>{

        setModalisOpen(true);
        setFileOrFolder('file');
        setCreateOrRename('rename');

    }


    const {setIsopen}=useFileContextMenuStore();
    return(
       
        <div style={{
            border:"2px solid black",
            position:'fixed',
            left:x,
            top:y,
            width:'120px',
            
        }}
        
        onMouseLeave={()=>{setIsopen(false)}}
        >
            
            <button onClick={handleFileDelete} className="File-Context-Button">DELETE</button>
            <button onClick={handleRename} className="File-Context-Button">RENAME</button>
            
        </div>
    )
}