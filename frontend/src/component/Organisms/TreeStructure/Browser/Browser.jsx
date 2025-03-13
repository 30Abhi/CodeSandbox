import { useContainerPortStore } from "../../../../store/ContainerPortStore";
import React, {  useEffect, useRef } from 'react';
import { Flex, Row, Spin, Switch,Input } from 'antd';
import { useParams } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser=()=>{
    
    const{containerPort}=useContainerPortStore();
    const{projectId}=useParams();
    const browserRef=useRef(null);

    function handleRefresh(){
        const oldSRC=browserRef.current.src;
        browserRef.current.src=oldSRC;
    }

    return(
        <Row
        
            style={
                {
                    backgroundColor:"#22212b"
                }
            }

        >

            <Input

                style={{
                    backgroundColor:"#282a35",
                    width:'100%',
                    height:'30px',
                    color:'white',
                    fontFamily:'Fira Code',

                }}

                defaultValue={`http://localhost:${containerPort}`}

                prefix={<ReloadOutlined onClick={handleRefresh}/>}
            >
            
            </Input>

            <iframe
                ref={browserRef}
                src={`http://localhost:${containerPort}`}
                style={{
                    width:'100%',
                    height:'95vh',
                    border:'none',
                }}
                
                ></iframe>
                        
        </Row>
    )

}