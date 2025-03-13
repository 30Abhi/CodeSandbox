import Docker from "dockerode"

const docker=new Docker();


export const handleCreateContainer=async(Terminalsocket,projectID,req,EstablishedSocket,head)=>{
    console.log("ProjectID received on container creation",projectID)
    try {

        // const ExistingContainer=await docker.listContainers({
        //     Names:projectID,
        // });

        // //removing existing container with same name

        // console.log("Existing Containers",ExistingContainer);

        // if(ExistingContainer.length>0){
        //     console.log('Removed Existing Container');
        //     const container=docker.getContainer(ExistingContainer[0].Id);
          
        //     await container.remove({force:true});
        // }

        const allContainers = await docker.listContainers({ all: true });
        const ExistingContainer = allContainers.find(container => container.Names.includes(`/${projectID}`));
        
        // Removing existing container with the same name
        if (ExistingContainer) {
            console.log('Removed Existing Container');
            const container = docker.getContainer(ExistingContainer.Id);
            console.log("Filtered container is", ExistingContainer.Names);
            await container.remove({ force: true });
        }

       
        const container =await docker.createContainer({
            //configuration of container
            Image:'sandbox',
            AttachStdin:true,
            AttachStdout:true,
            AttachStderr:true,
            Cmd:['/bin/bash'],
            Tty:true,
            name:projectID,
            User:'sandbox',
    
            //configuration of interation bw container and host
            ExposedPorts:{
                "5173/tcp":{}
            },
            Env:[
                "HOST=0.0.0.0",
                "NODE_ENV=development"
            
            ],
            HostConfig:{
                Binds:[
                    //mounting project dir to conationer
                    `${process.cwd()}/Projects/${projectID}:/home/sandbox/app:rw`
                ],
    
                PortBindings:{
                    "5173/tcp":[{
                        "HostPort":"0",
                    }]
                },

                // Add these for better file system sync
                ExtraHosts: ["host.docker.internal:host-gateway"],
                NetworkMode: 'bridge'
                
                
            }
    
        })
       
        console.log("container created ",container.id);

        await container.start();

        console.log("COntainer started successfully");


        const ContainerPort=await getPort(projectID);
        
        console.log("COntainer Port on Host ", ContainerPort);


        // here http connection is upgraded to WebSocket
        // TCP socket is upgraded 
        
        

        // await Terminalsocket.handleUpgrade(req,TCPsocket,head,(establishedconnection)=>{
        //     console.log("CONection UPGRADED..............");
        //     Terminalsocket.emit('connection',establishedconnection,req,container);
        // })

        Terminalsocket.emit('connection',EstablishedSocket,req,container);


    } catch (error) {
        console.log(error);
    }
    

}

export async function getPort (ContainerName) {
    const allContainers = await docker.listContainers({ all: true });
    const ExistingContainer = allContainers.find(container => container.Names.includes(`/${ContainerName}`));
    // console.log(ExistingContainer);
    if(ExistingContainer ){
        const ContainerInfo=await docker.getContainer(ExistingContainer.Id).inspect();
        console.log("ContainerInfo",ContainerInfo);
        // console.log("INFO OF CONTAINER",ContainerInfo);
        if(ContainerInfo.State.Status=="running") return ContainerInfo.NetworkSettings.Ports["5173/tcp"][0].HostPort;
    }

}

