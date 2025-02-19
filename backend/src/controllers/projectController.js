import { createProjectService, getProjecttreeService } from "../service/createProjectService.js";

export const createprojectcontroller=async (req,res)=>{
    
    const projectId=await createProjectService();
    
    return res.json({message :"project created",data:projectId});
}

export const getprojecttreecontroller=async(req,res)=>{
    
    const tree=  getProjecttreeService(req.params.projectId);
    // console.log(tree);
    return res.status(200).json({
        message:"Tree created success",
        success:true,
        data:tree,
    })
}
