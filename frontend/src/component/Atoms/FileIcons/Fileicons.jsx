import { FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import { SiJson, SiTypescript, SiMongodb, SiGraphql, SiWebpack } from "react-icons/si";
import { VscJson, VscMarkdown } from "react-icons/vsc";
import { AiFillFileText } from "react-icons/ai";
import { BsFileCodeFill } from "react-icons/bs";

export const FileIcons = ({ extension }) => {
  return (
    <>
      {extension === "js" && <FaJs color="yellow" style={{ height: "15px", width: "15px" }} />}
      {extension === "jsx" && <FaReact color="cyan" style={{ height: "15px", width: "15px" }} />}
      {extension === "ts" && <SiTypescript color="blue" style={{ height: "15px", width: "15px" }} />}
      {extension === "tsx" && <FaReact color="blue" style={{ height: "15px", width: "15px" }} />}
      {extension === "html" && <FaHtml5 color="orange" style={{ height: "15px", width: "15px" }} />}
      {extension === "css" && <FaCss3Alt color="blue" style={{ height: "15px", width: "15px" }} />}
      {extension === "json" && <SiJson color="green" style={{ height: "15px", width: "15px" }} />}
      {extension === "md" && <VscMarkdown color="gray" style={{ height: "15px", width: "15px" }} />}
      {extension === "txt" && <AiFillFileText color="gray" style={{ height: "15px", width: "15px" }} />}
      {extension === "node" && <FaNodeJs color="green" style={{ height: "15px", width: "15px" }} />}
      {extension === "graphql" && <SiGraphql color="pink" style={{ height: "15px", width: "15px" }} />}
      {extension === "env" && <BsFileCodeFill color="limegreen" style={{ height: "15px", width: "15px" }} />}
      {extension === "webpack" && <SiWebpack color="blue" style={{ height: "15px", width: "15px" }} />}
      {extension === "mongo" && <SiMongodb color="green" style={{ height: "15px", width: "15px" }} />}
      {extension === "config" && <AiFillFileText color="purple" style={{ height: "15px", width: "15px" }} />}
      {/* Add more file types if necessary */}
    </>
  );
};
