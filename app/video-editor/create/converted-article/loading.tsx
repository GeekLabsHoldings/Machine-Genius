
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
// shows that video is being converted
const ConvertingAudio = ()=>{
    return(
        <div className="w-full h-full flex justify-center items-center">
            <LogoAndTitle title="Genius is working on your script.." textNeeded="Converting your script to an audio.." needTxt={true}/>
        </div>
    )
}

export default ConvertingAudio