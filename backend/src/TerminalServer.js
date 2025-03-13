import express, { urlencoded } from 'express';

import cors from 'cors';
import apirouter from './routes/index.js';
import { createServer } from 'node:http';

import { handleCreateContainer } from './Containers/handleCreateContainer.js';
import  { WebSocketServer } from 'ws';
import { handleTerminalCreation } from './Containers/handleTerminalCreation.js';

const app = express();
const server = createServer(app);




app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors());




server.listen(4000, () => {
    console.log('WebSocket (for Terminal) Server is running on port 4000');
})

const WebSocketforTerminal=new WebSocketServer({
    noServer:true,
});

server.on("upgrade",async(req,TCPsocket,head)=>{
    //req- http request maded
    //socket- TCP socket
    //head- Buffer containing the first packet of Stream 
    
    const Terminal=req.url.includes('/terminal');

    if(Terminal){

        console.log(req.url);
        const projectId=req.url.split("=")[1];
        console.log("project Id received",projectId)
        
        WebSocketforTerminal.handleUpgrade(req,TCPsocket,head,async (establishedconnection)=>{
            console.log("CONection UPGRADED..............");
            await handleCreateContainer(WebSocketforTerminal,projectId,req,establishedconnection,head);
        });


         

    }

})


WebSocketforTerminal.on('connection', (ws,req,container)=>{

    console.log("TERMINAL CONNECTED");

     handleTerminalCreation(ws,container);

    


})