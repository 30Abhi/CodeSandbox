import axiosinstance from "../axios/axiosConfig.js";

export const projectApi=async ()=>{
    try {
        const response=await axiosinstance.post("/api/v1/projects");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

    
}


export const projectTreeApi=async ({projectId})=>{
    try {
        const path=await axiosinstance.get(`/api/v1/projects/${projectId}/tree`);
        return path?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}