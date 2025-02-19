import { useMutation } from "@tanstack/react-query"
import { projectApi } from "../../../Apis/projects"



export const createproject=()=>{
    const { mutateAsync,isSuccess,isPending,error} = useMutation({
        mutationFn:projectApi,
        onSuccess:(data)=>{
            console.log("PROJECT CREATED SUCCESSFULLY",data)
        },
        onError:()=>{
            console.log("Error in creating the project")
        }
    })

    return {
        createprojectmutation:mutateAsync,
        isPending,
        isSuccess,
        error
    }
}