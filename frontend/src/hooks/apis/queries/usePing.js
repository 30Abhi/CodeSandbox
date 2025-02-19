import { useQuery } from "@tanstack/react-query";
import { pingApi } from "../../../Apis/ping";

export default function usePing(){
    const{isLoading,isError,data,error}=useQuery({
        queryFn: pingApi ,
        queryKey:'ping', 
        staleTime:10000,
    });

    return {
        isLoading,
        isError,
        data,
        error
    }
}