import { create  } from "zustand";

export const useContextModalStore=create((set)=>({
        isopen:false,
        
        FileOrFolder:null,

        CreateOrRename:null,

        setIsOpen:(incomingIsOpen)=>{
            set({
                isopen:incomingIsOpen,
            })
        },

    
        setFileOrFolder:(input)=>{
            set({
                FileOrFolder:input,
            })
        },

        setCreateOrRename:(input)=>{
            set({
                CreateOrRename:input,
            })
        },
       
        
}))