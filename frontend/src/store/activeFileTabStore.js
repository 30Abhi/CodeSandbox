import {create} from "zustand"

export const activeFileStore=create((set)=>{
    return {
        activeFileTab:null,

        setActiveFiletab:(path,value,extension)=>{
            set({
                activeFileTab:{
                    path:path,
                    value:value,
                    extension:extension
                }
            })
        }
    }
})
