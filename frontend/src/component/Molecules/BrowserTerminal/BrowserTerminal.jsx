
import { Terminal } from "@xterm/xterm"
import { useEffect, useRef } from "react";
import { FitAddon } from 'xterm-addon-fit';
import "@xterm/xterm/css/xterm.css"
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

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


        socket.current=io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
            query:`id=${projectIDfromURL}`
        });

        socket.current.on('shell-output',(data)=>{
            term.write(data);
        })


        term.onData( (data)=>{
            console.log("input on shell received",data);
            socket.current.emit('shell-input',data)
        })

        return()=>{
            term.dispose();
            socket.current.disconnect();
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