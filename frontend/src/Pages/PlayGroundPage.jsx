import { useParams } from "react-router-dom"
import { EditorButton } from "../component/Atoms/EditorButton/EditorButton";
import { TreeStructure } from "../component/Organisms/TreeStructure/TreeStructure";
import { EditorComponent } from "../component/Molecules/EditorComponent/Editor";
import { useEditorsocketStore } from "../store/editorSocketStore.js";

import io from 'socket.io-client'
import { useEffect } from "react";
import { treeStructureStore } from "../store/treeStructureStore.js";
import { FolderContextModal } from "../component/Molecules/Modals/FolderContextModal.jsx";
import { BrowserTerminal } from "../component/Molecules/BrowserTerminal/BrowserTerminal.jsx";



export const PlayGround = () => {

    const { projectId:projectIDfromURL } = useParams();

    const{editorSocket,setEditorSocket}=useEditorsocketStore();
    const{setprojectId}=treeStructureStore();
    
   

    useEffect(()=>{
        setprojectId(projectIDfromURL);
        const editorSocketConn=io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
            query:`id=${projectIDfromURL}`
        });

        setEditorSocket(editorSocketConn);//this is socket for editor
        // console.log("editore")
    },[projectIDfromURL,setEditorSocket]);


    return (
        <>
        
        <div style={ { display: "flex"} }>

            <FolderContextModal/>
            <div style={{
                backgroundColor: "#333254",
                paddingRight: "10px",
                paddingTop: "0.3vh",
                minWidth: "250px",
                maxWidth: "25%",
                height: "99.7vh",
                overflow: "auto"
            }}>
                {projectIDfromURL}
                <TreeStructure />
            </div>
                {(editorSocket)?<EditorComponent/>:null}
            <EditorButton isActive={false}/>

            

        </div>
        <BrowserTerminal/>
        </>

    )


}