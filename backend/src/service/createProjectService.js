
import fs from "fs/promises"
import uuid4 from "uuid4"
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execpromisified } from "../../utils/execpromisified.js";
import directoryTree from "directory-tree"
import path from "path";
export const createProjectService=async()=>{
        const projectId=uuid4();
        console.log("New Project id is:",projectId);
    
        await fs.mkdir(`./Projects/${projectId}`)
    
        const response=await execpromisified(REACT_PROJECT_COMMAND,{
            cwd:`./Projects/${projectId}`
        })

        return projectId;
        
}

export const getProjecttreeService= (projectId)=>{
    const projectpath= path.resolve(`./Projects/${projectId}`);
    const tree= directoryTree(projectpath);
    return tree;
}