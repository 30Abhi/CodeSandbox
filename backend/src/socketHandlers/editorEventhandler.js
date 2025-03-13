import fs from "fs/promises";
import pathModule from "path";
import { getPort } from "../Containers/handleCreateContainer.js";

export const editorEventHandler = (socket) => {

    socket.on("writeFile", async ({path,data}) => {
        try {
            const response = await fs.writeFile(path, data);
            console.log("data wriitten success !!!")
            socket.emit("writeFileSuccess", {
                data: "written to file successfully",
                
            }) 
        } catch (error) {
            socket.emit("error", {
                data: "Error in writing to file",
            })
        }

    });

    socket.on("createFile", async ({ path }) => {
        try {
            
    
            // Check if the file already exists
            try {
                await fs.stat(path);
                socket.emit("createFileSuccess", {
                    data: "File already present",
                });
            } catch (err) {
                // File does not exist, so create it
                await fs.writeFile(path, "");
    
                socket.emit("createFileSuccess", {
                    data: "Created file successfully",
                });
            }
        } catch (error) {
            console.error(error);
    
            socket.emit("error", {
                data: "Error in creating file",
            });
        }
    });

    socket.on("readFile",async({path})=>{
        try {
            const response =await fs.readFile(path);
            console.log("response......." ,response.toString());
            socket.emit("readFileSuccess",{
                value:response.toString(),
                filefolderpath:path,
            });
        } catch (error) {
            console.log(error);
            socket.emit("error", {
                data: "Error in reading file ",
            });
        }
    })


    socket.on("deleteFile", async ({pathtofileforlder}) => {
        try {
            await fs.unlink(pathtofileforlder);
            socket.emit("deleteFileSuccess", {
                data: "deleted file successfully",
            });
        } catch (error) {
            console.log(error);

            socket.emit("error", {
                data: "Error in deleting file ",
            });
        }
    });

    socket.on("createFolder", async ({path}) => {

        try {

            try {
                await fs.stat(path);
                socket.emit('createFolderSuccess',{
                    data:'Folder already existed',
                });
            } catch (error) {
                await fs.mkdir(path);
                socket.emit('createFolderSuccess',{
                    data:'Cerated Folder Successfully',
                });
            }
            
        } catch (error) {
            console.log(error);
            socket.emit("error", {
                data: "Error in creating folder",
            });
        }
    });

    socket.on("deleteFolder", async ({folderPath}) => {
        try {
            await fs.rmdir(folderPath, { recursive: true });
            socket.emit("deleteDirectorySuccess", {
                data: "deleteFolder successfully",
            });
        } catch (error) {
            console.log(error);

            socket.emit("error", {
                data: "Error in deleteFolder ",
            });
        }
    });


    socket.on("renameFile",async({oldPath,newFileName})=>{
        try {
            await fs.access(oldPath); //Access permmisssion 

            // Ensure new path is valid (not inside old path)
            const parentDir = pathModule.dirname(oldPath);
            const newPathFixed = pathModule.join(parentDir, newFileName);
            const response=await fs.rename(oldPath,newPathFixed);
         
            socket.emit("renameSuccess",{
                data:"renamed successfully",
            });

        } catch (error) {
            console.log(error);
            socket.emit("error", {
                data: "Error in renaming ",
            });
        }
    })
    socket.on("renameFolder",async({oldPath,newFolderName})=>{
        try {
            await fs.access(oldPath); //Access permmisssion 

            // Ensure new path is valid (not inside old path)
            const parentDir = pathModule.dirname(oldPath);
            const newPathFixed = pathModule.join(parentDir, newFolderName);
            const response=await fs.rename(oldPath,newPathFixed);

            socket.emit("renameSuccess",{
                data:"renamed successfully",
            });

        } catch (error) {
            console.log(error);
            socket.emit("error", {
                data: "Error in renaming ",
            });
        }
    })

    // socket.on('GetContainerPort',async (ProjectId)=>{
    //     const Port=await getPort(ProjectId);

    //     if(Port){
    //          socket.emit('RecievedContainerPort',{
    //             Port:Port,
    //         });
    //     }

    // })

    async function waitForPort(ContainerName, timeout = 30000, interval = 1000) {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
          try {
            const port = await getPort(ContainerName);
            if (port) {
              return port;
            }
          } catch (err) {
            // Port not available yet; ignore error and wait before retrying.
          }
          await new Promise(resolve => setTimeout(resolve, interval));
        }
        throw new Error(`Timeout waiting for port assignment for container ${ContainerName}`);
      }
      
      // Socket event handler using the polling mechanism
      socket.on('GetContainerPort', async (ProjectId) => {
        try {
          const port = await waitForPort(ProjectId, 30000, 1000); // waits up to 30 seconds, checking every second
          socket.emit('RecievedContainerPort', { Port: port });
        } catch (error) {
          socket.emit('PortError', { error: error.message });
        }
      });

}