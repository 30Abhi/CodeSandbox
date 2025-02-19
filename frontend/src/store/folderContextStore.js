import { create } from "zustand";

export const useFolderContextMenuStore=create((set)=>({
    x:null,
    y:null,
    folder:null,
    isopen:false,

    setX:(incomingX)=>{
        set({
            x:incomingX,
        })
    },

    setY:(incomingY)=>{
        set({
            y:incomingY
        })
    },

    setIsopen:(incomingIsopen)=>{
        set({
            isopen:incomingIsopen
        })
    },

    setFolder:(incomingFolder)=>{
        set({
            folder:incomingFolder
        })
    },

}))