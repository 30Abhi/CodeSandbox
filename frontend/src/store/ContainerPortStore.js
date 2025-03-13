import { create } from "zustand";

export const useContainerPortStore=create((set)=>({
    containerPort:null,

    setContainerPort:(incomingPort)=>{
        set({
            containerPort:incomingPort
        });
    }
}))