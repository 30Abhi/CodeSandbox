import { useParams } from "react-router-dom"
import { EditorButton } from "../component/Atoms/EditorButton/EditorButton";
import { TreeStructure } from "../component/Organisms/TreeStructure/TreeStructure";
import { EditorComponent } from "../component/Molecules/EditorComponent/Editor";
import { useEditorsocketStore } from "../store/editorSocketStore.js";

import io from 'socket.io-client'
import { useEffect } from "react";
import { treeStructureStore } from "../store/treeStructureStore.js";
import { FolderContextModal } from "../component/Molecules/Modals/FolderContextModal.jsx";



export const PlayGround = () => {

    const { projectId } = useParams();

    const{editorSocket,setEditorSocket}=useEditorsocketStore();
    const{setprojectId}=treeStructureStore();
    
   

    useEffect(()=>{
        setprojectId(projectId);
        const editorSocketConn=io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
            query:`id=${projectId}`
        });

        setEditorSocket(editorSocketConn);//this is socket for editor
        // console.log("editore")
    },[projectId,setEditorSocket]);


    return (
        <div style={ { display: "flex" } }>

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
                {projectId}
                <TreeStructure />
            </div>
                {(editorSocket)?<EditorComponent/>:null}
            <EditorButton />
        </div>


    )


}