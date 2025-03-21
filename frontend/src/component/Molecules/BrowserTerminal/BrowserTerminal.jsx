
import { Terminal } from "@xterm/xterm"
import { useEffect, useRef } from "react";
import { FitAddon } from 'xterm-addon-fit';
import "@xterm/xterm/css/xterm.css"
import { useParams } from "react-router-dom";
import { AttachAddon } from "@xterm/addon-attach";
import { useEditorsocketStore } from "../../../store/editorSocketStore";

export const BrowserTerminal=()=>{
    const { projectId:projectIDfromURL } = useParams();

    const{editorSocket}=useEditorsocketStore();
    
    const terminalRef=useRef(null);
    const socket=useRef(null);

    useEffect(()=>{
        const term= new Terminal({
            cursorBlink:true,
            theme:{
                background:"#282a37",
                foreground:"#f8f8f2",
                cursor:"#f8f8f2",
                cursorAccent:"#f8f8f2",
                green:"#50fa7b",
                red:"#ff5555",
                cyan:"#8be9fd",
                yellow:"#f1fa8c",
            },
            fontFamily:"Ubuntu Mono",
            fontSize:16,
            convertEol:true,
           
        },[]);

        term.open(terminalRef.current);

        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();
        // socket.io didnt work with exterm addons
        //use raw websocket


        const ws=new WebSocket("ws://localhost:4000/terminal?projectID="+projectIDfromURL);

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

       

        
        ws.onopen=async ()=>{
            const attachAddon=await new AttachAddon(ws);
            await term.loadAddon(attachAddon);
             socket.current=ws;

             

             await editorSocket.emit('GetContainerPort',projectIDfromURL);

        }

        ws.onclose = (event) => {
           
            console.log('WebSocket connection closed ', event);
            confirm('Error in connection refresh again');

        };

        
        return()=>{
            term.dispose();
           
        }
        

    },[])


    return (
        <div
            ref={terminalRef}
            style={{
                height:"100vh",
                width:"100%",
                overflow:"auto"
            }}
            className="terminal"
            id="terminal-container"
        >

        </div>
    )
}