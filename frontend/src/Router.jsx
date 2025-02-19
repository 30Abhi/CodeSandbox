import { Route, Routes } from "react-router-dom"
import { CreateReactPage } from "./Pages/createReactPage"
import { PlayGround } from "./Pages/PlayGroundPage"

export const Router=()=>{
  return (
    <Routes>
          <Route path="/" element={<CreateReactPage/>} />
          <Route path="/projects/:projectId" element={<PlayGround/>}/>
      </Routes>
  )
        
}