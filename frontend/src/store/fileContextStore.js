import { create } from "zustand";

export const useFileContextMenuStore=create((set)=>({
    x:null,
    y:null,
    isopen:false,
    file:null,

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

    setFile:(incomingFile)=>{
        set({
            file:incomingFile
        })
    },



}))