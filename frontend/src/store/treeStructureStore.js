import { create } from 'zustand'
import { projectTreeApi } from '../Apis/projects'
import { QueryClient } from '@tanstack/react-query';

export const treeStructureStore = create((set,get) => {
    const queryClient = new QueryClient(); //hooks cannot be called feom another hook so use QueryClient
      
    return {
        treeStructure:null,
        projectId:null,

        settreeStructure:async ()=>{
            
            const id=get().projectId;
            const data = await queryClient.fetchQuery({
                queryKey: [`projectTree-${id}`],
                queryFn:()=> projectTreeApi({projectId:id}),

            });
            console.log(data);
            
            set({
                treeStructure:data
            });

            
        },

        setprojectId:(projectId)=>{
            
            set({
                projectId:projectId
            });
        }

    }
})