import express, { urlencoded } from 'express';
import { port } from './config/serverConfig.js';
import cors from 'cors';
import apirouter from './routes/index.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import chokidar from "chokidar"
import { editorEventHandler } from './socketHandlers/editorEventhandler.js';
import { handleCreateContainer } from './Containers/handleCreateContainer.js';
import  { WebSocketServer } from 'ws';
import { handleTerminalCreation } from './Containers/handleTerminalCreation.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    }
});



app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors());

app.use('/api', apirouter);


app.get('/ping', (req, res) => {
    res.send('Hello World');
})


const editornamespace = io.of('editor');

editornamespace.on('connection', (socket) => {
    console.log('Editor connected');
    
    const ProjectId=socket.handshake.query['id'];
    console.log("Project id :",ProjectId);

    if (ProjectId) {
        var watcher = chokidar.watch(`Projects/${ProjectId}`, {
            ignored: (path) => path.includes("node_modules"),

            persistent: true,

            awaitWriteFinish: {
                stabilityThreshold: 2000,
            },
            ignoreInitial:true, // ignores the changes on files on first time setup of folder
        });
    }
    watcher.on('all', (event, path) => {
        console.log("changes have been made ", path)
    })

    editorEventHandler(socket);

    socket.on('disconnect',async()=>{
        await watcher.close();
        console.log("server disconnected");
    })

});



server.listen(port, () => {
    console.log(' Socket io Server is running on port 3000');
})

