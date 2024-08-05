'use client';
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
// loading page before show templates
const CheckWords = ()=>{
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 m-auto text-center">
            <LogoAndTitle title="Genius is checking the mispronounced words database" textNeeded="Hold on tight.." needTxt={true}/>
            </div>
            </div>
    )
}

export default CheckWords