import axiosinstance from "../axios/axiosConfig.js";


export const pingApi=async ()=>{
    try {
        const response=await axiosinstance.get("/api/v1/ping");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);

    }
    
}