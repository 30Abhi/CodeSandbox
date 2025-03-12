export const handleTerminalCreation=(ws,container)=>{
    container.exec({
        Cmd:['/bin/bash'],
        AttachStdin:true,
        AttachStdout:true,
        AttachStderr:true,
        Tty:true,
        User:'sandbox'

    },(err,exec)=>{
        if(err){
            console.log("error in creating terminal",err);
            return;

        }

        exec.start({
            hijack:true,
        },(err,stream)=>{

            if(err){
                console.log("error in exec start",err);
                return;
            }

            // step 1:=>stream processing
            // process stream od container 
              processStreamOutput(ws,stream);


            // step 2:=> stream writing 

                //AttachAddon provides this event default 
                // frontend will generate a message becoz of AttachAddon
                ws.on('message',(data)=>{
                    stream.write(data);
                });

        })

    })
}


function processStreamOutput (ws,stream){
    let nextDataType=null;// stores type of next incoming Data/chunk
    let nextDataLen=null;// stores len of next incoming Data/chunk
    let buffer=Buffer.from("");// stores  incoming Data/chunk

    function processStreamData(data){

        if(data){
           buffer=Buffer.concat([buffer,data]);
        }

        if(!nextDataType){
            if(buffer.length>=8){
                const header=bufferSlicer(8);//getting metadata of chunk/message from Docker container  
                nextDataType=header.readUint32BE(0);// type of message 
                nextDataLen=header.readUint32BE(4);// len of meassage

                processStreamData()// recursively call this function as the metadata is ready 
            }
            
        }   
        else{
            // if metadata is ready

            if(buffer.length>=nextDataLen){
                const message=bufferSlicer(nextDataLen);

                ws.send(message);// send messafe to client/frontend

                nextDataLen=null;// reset for next message
                nextDataType=null;

                processStreamData();// recursive call for next message to pr processed

            }

        }

        function bufferSlicer(end){
            const output=buffer.slice(0,end);
            buffer=Buffer.from(buffer.slice(end,buffer.length));
            return output;
        }

    }

    stream.on('data',processStreamData)

}