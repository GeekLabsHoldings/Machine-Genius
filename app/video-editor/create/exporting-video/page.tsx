
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

// shows that video is being exported
const ExportingVideo = () =>{
    return(
        <div className="w-full h-full flex justify-center items-center">
            <LogoAndTitle title="Exporting Video" textNeeded="Hold on tight.." needTxt={true}/>
        </div>
    )
}

export default ExportingVideo