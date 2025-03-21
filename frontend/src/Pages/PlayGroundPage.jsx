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
import { Browser } from "../component/Organisms/TreeStructure/Browser/Browser.jsx";
import { useContainerPortStore } from "../store/ContainerPortStore.js";
import { Loading } from "../component/Organisms/TreeStructure/Browser/Loading.jsx";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

export const PlayGround = () => {

    const { projectId:projectIDfromURL } = useParams();

    const{editorSocket,setEditorSocket}=useEditorsocketStore();
    const{setprojectId}=treeStructureStore();

    const{containerPort}=useContainerPortStore();
    
   

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

            <div style={{
                height:'100vh',
                width:'100vw',
                display:'flex',
            }}>



                <Allotment>

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'100vw',
                        height:'100vh',
                        backgroundColor:'black'
                    }}>

                        <Allotment vertical={true}>
                                
                                {(editorSocket)?<EditorComponent/>:null}
                           
                                {(editorSocket)?<BrowserTerminal/>:null}

                         

                        </Allotment>

                        
                       
                        

                    </div>

                    
                        {(containerPort)?<Browser/>:<Loading/>}
                    
                    
                    
                </Allotment>


            </div>

                
            {/* <EditorButton isActive={false}/> */}

            

        </div>

       

       
         
        </>

    )


}