
import { Terminal } from "@xterm/xterm"
import { useEffect, useRef } from "react";
import { FitAddon } from 'xterm-addon-fit';
import "@xterm/xterm/css/xterm.css"
import { useParams } from "react-router-dom";
import { AttachAddon } from "@xterm/addon-attach";

export const BrowserTerminal=()=>{
    const { projectId:projectIDfromURL } = useParams();
    
    const terminalRef=useRef(null);
    const socket=useRef(null);

    useEffect(()=>{
        const term=new Terminal({
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

        
        let fitAddon = new FitAddon();
        fitAddon.fit();
        term.loadAddon(fitAddon);

        
        term.open(terminalRef.current);

        // socket.io didnt work with exterm addons
        //use raw websocket


        const ws=new WebSocket("ws://localhost:3000/terminal? projectID="+projectIDfromURL);
        // socket.current.onerror = (error) => {
        //     console.error('WebSocket error:', error);
        // };

        ws.onopen=()=>{
            const attachAddon=new AttachAddon(ws);
            term.loadAddon(attachAddon);
            socket.current=ws;
        }

        
        return()=>{
            term.dispose();
           
        }
        

    },[])


    return (
        <div
            ref={terminalRef}
            style={{
                height:"25vh",
                overflow:"auto"
            }}
            className="terminal"
            id="terminal-container"
        >

        </div>
    )
}