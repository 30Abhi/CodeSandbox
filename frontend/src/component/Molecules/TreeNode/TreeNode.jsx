import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FileIcons } from "../../Atoms/FileIcons/Fileicons";
import { useEditorsocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextStore";
import { useFolderContextMenuStore } from "../../../store/folderContextStore";

export const TreeNode=({filefolderdata})=>{

    const[visibility,setVisibility]=useState({});

    const {editorSocket}=useEditorsocketStore();

    const {setX,setY,setIsopen,setFile:setFileContext}=useFileContextMenuStore();
    const {setX:setFolderX,setY:setFolderY,setIsopen:setIsOpenFolder,setFolder:setFolderContext}=useFolderContextMenuStore();

    
    function toggleVisibility(name){
        setVisibility({ ...visibility, [name]:!visibility[name] });
    }
    // console.log("filefolderdata : ",filefolderdata);

    function computeExtension(filefolderdata){
            const name=filefolderdata.name;
            const extension=name.split(".").pop();
            return extension;
    }


     function handleFileClick(filefolderdata){
         editorSocket.emit("readFile",{
            path:filefolderdata.path,
         });

         
    }

    function handleFileRightClick(e,path){
        e.preventDefault();
        console.log("right click on ",path)
        setFileContext(path);
        setIsopen(true);
        setX(e.clientX);
        setY(e.clientY);
        

    }

    function handleFolderRightClick(e,path){
        e.preventDefault();
        console.log("right click on ",path);
        setFolderX(e.clientX)
        setFolderY(e.clientY)
        setIsOpenFolder(true)
        setFolderContext(path)
    }

    return (
       
            (
                filefolderdata && <div 
                        style={{paddingLeft:"15px",color:"white"}}>
                    
                   { filefolderdata.children ?(
                        <button onClick={()=>toggleVisibility(filefolderdata.name)}
                           style={{
                                 
                                 alignItems:"center",
                                 background:"transparent",
                                 border:"none",
                                 color:"white",
                                 cursor:"pointer",
                                 paddingTop:"15px",
                                 fontSize:"16px",
                           }} 
                           onContextMenu={(e)=>handleFolderRightClick(e,filefolderdata.path)}
                           
                           >
                            { visibility[filefolderdata.name]?<IoIosArrowDown/>:<IoIosArrowForward/>}
                            {filefolderdata.name}
                        </button>
                    ):(
                           
                        <p 

                        onDoubleClick={()=>handleFileClick(filefolderdata)}
                        onContextMenu={(e)=>handleFileRightClick(e,filefolderdata.path)}
                        
                        style={{cursor:'pointer',alignItems:"center",padding:'5px',border:"none",leftmargin:"5px",background:"transparent",color:"white",fontSize:"16px"}}
                        
                        >
                             <FileIcons extension={computeExtension(filefolderdata)}/>
                            {filefolderdata.name}
                        </p>
                        
                    )}

                    {visibility[filefolderdata.name] && filefolderdata.children &&
                        filefolderdata.children.map((child)=>(
                            <TreeNode 
                            filefolderdata={child} 
                            key={child.name}
                            />
                        ))}
                    
                </div>
            )
        
    )

}