"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./VideoCreatePage.module.css";
import { AssignedVideos } from "@/app/_data/data";
import { globalContext } from "@/app/_context/store";
import { videoEditingContext } from "@/app/_context/videoEditingContext";
import { use, useContext, useEffect, useState } from "react";
import { formatToText } from "@/app/_utils/contentFormatter";
import toast from "react-hot-toast";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useRouter } from "next/navigation";

const selectedScript = `
<h4>Intro</h4><p>An incident that unfolded recently has sent shockwaves throughout the nation sparking widespread concern and raising eyebrows across Canada. A man named Muhammad Shahzeb Khan from Pakistan was reportedly on his way to New York with intentions of carrying out a shooting at a Jewish center when he was arrested in Quebec. The issuance of his student visa just a few months ago has led to scrutiny and criticism of the Liberal government's immigration policies, particularly under the leadership of Justin Trudeau. The situation raises questions about Canada's security measures and how this case slipped through the cracks.</p><p>Canada's immigration system has long been praised for its thoroughness but recent events have cast a significant shadow over that reputation. Muhammad Shahzeb Khan allegedly traveling with an ISIS-inspired plane, managed to enter the country using a student visa. The body's Immigration Minister Marc Miller's casual remarks on the issue have hardly inspired reassurance.</p><p>It appears that we are now welcoming students who come equipped with more than just textbooks and bags—some may harbor intentions that are far more nefarious.</p><h4>Body</h4><p>The Conservatives' demands for a thorough inquiry into how Khan managed to bypass immigration security checks are entirely warranted. After all how can someone overlook a potential terrorist during the screening process? The government's argument that "a determined person can gain entry" is rather flimsy, at best. One might question whether Trudeau's ministers are preoccupied with shaping narratives, on social justice instead of prioritizing national security matters.</p><p>Naturally, Minister Miller attempted to shift responsibility by accusing the Conservatives of "talking too much." But let's be real when it comes to national security shouldn't we speak up instead of staying quiet? Miller suggests that it's "risky to comment" further almost implying that transparency could unveil inconvenient truths about the government's effectiveness or lack thereof. Shouldn't elected officials prioritize keeping the public safe and well informed?</p><p>Adding to the tension Khan's arrest comes on the heels of another concerning incident where a father and son were apprehended for allegedly plotting an ISIS attack in Toronto. These cases highlight significant shortcomings, in the so-called immigration process. If two ISIS-related schemes within months don't prompt the administration to take action what will?</p><p>Even more disturbing reports indicate that the RCMP had been monitoring Khan since last November. Despite this he managed to enter Canada and travel to Quebec supposedly preparing a plan for the anniversary of the October Hamas attack in Israel. Either someone in the immigration office was not paying attention or there is a more troubling systemic problem at hand.</p><p>The situation gets weirder with the recent arrest of Khalilullah Yousuf an alleged ISIS financier in July. Another breakdown? Or is Canada becoming an easy target under Trudeau's leadership? It makes you wonder how many more determined individuals have slipped through the cracks.</p><p>After all if our immigration system were like a sieve it appears to be missing, the biggest stones. It's truly astonishing how the Liberal Party seems to prioritize potential backlash and appearances over addressing the flawed system. The irony is hard to miss here; this administration that champions safety and inclusivity is finding it challenging to safeguard its citizens against genuine threats.</p><p>Justin Trudeau's rosy vision of Canada doesn't quite match up to reality, and maybe it's time we hold our leaders to a standard. As Canada comes to terms with these shocking revelations one thing is evident; a significant revamp of immigration and security protocols is necessary. The government's dismissive stance on concerns is not just exasperating but also perilous.</p><p>The Conservatives' push for an investigation into public safety should be viewed as a crucial move to safeguard Canadians rather than a display of political showmanship. Marc Miller's defensive stance only underscores the need for openness and responsibility.</p><h4>Outro</h4><p>So what are your thoughts? Can the current government effectively uphold national security or is it time to consider a change in leadership? These incidents, concerning as they are should act as a reminder for all Canadians. It's high time we expect more from our government and hold them responsible for our well-being. After all shouldn't that be the bare minimum we deserve? Share your opinions and let's continue this important discussion.</p><p>So what are your thoughts? Can the current government effectively uphold national security or is it time to consider a change in leadership? These incidents, concerning as they are should act as a reminder for all Canadians. It's high time we expect more from our government and hold them responsible for our well-being. After all shouldn't that be the bare minimum we deserve? Share your opinions and let's continue this important discussion.</p>
`;

const VideoCreatePage = () => {
  const router = useRouter();
  const { authState, handleSignOut } = useContext(globalContext);
  const {
    selectedContent,
    setSelectedContent,
    splitedContent,
    setSplitedContent,
  } = useContext(videoEditingContext);

  useEffect(() => {
    const formattedContent = formatToText(selectedScript);
    setSelectedContent(formattedContent);
    // todo: reset data
  }, []);

  const [pageState, setPageState] = useState<{
    createVideoLoading: boolean;
  }>({
    createVideoLoading: false,
  });

  async function handleCreateVideo() {
    if (!selectedContent) {
      toast.error("No content found!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, createVideoLoading: true }));
      const res = await fetch(`http://localhost:3000/split-content`, {
        method: "POST",
        body: JSON.stringify({
          selectedContent: selectedContent,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `barrer ${
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : authState.token
          }`,
        },
      });
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (json && json.success === true) {
        setSplitedContent(json.paragraphJson);
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, createVideoLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleCreateVideo:", error);
      setPageState((prev) => ({ ...prev, createVideoLoading: false }));
    }
  }

  useEffect(() => {
    if (splitedContent !== null) {
      router.replace("/video-editor/create/converted-script");
    }
  }, [splitedContent]);

  // render assigned videos to every one and its status of completetion
  const renderVideosData = AssignedVideos.map((video, idx) => (
    <ul
      key={idx}
      className="borderBottom w-full flex justify-between  items-center py-[0.5vh] text-center"
    >
      <li className="w-[5%]">{video.id}</li>
      <li className="w-[45%]">{video.title}</li>
      <li className="w-[15%]">{video.date}</li>
      <li className="w-[15%]">
        <span
          className={
            video.assignedTo === "Sherry"
              ? "bg-[#9B5FBFB2]"
              : video.assignedTo === "Kamel"
              ? "bg-[#E1C655B2]"
              : video.assignedTo === "Yara"
              ? "bg-[#31B2E9B2]"
              : "bg-[#F36F24B2]"
          }
        >
          {video.assignedTo}
        </span>
      </li>
      {/* lead user to convert article to video or disply it after conversion */}
      <li className="w-[20%]">
        {" "}
        <CustomBtn
          class="videoStatusBtn"
          width="w-full"
          word="Create Video"
          onClick={handleCreateVideo}
          btnColor="black"
        />{" "}
      </li>
    </ul>
  ));

  if (pageState.createVideoLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Converting Script To Audio..." />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full pageHeader flex flex-col gap-[1vw]  ${styles.createVideo}`}
    >
      <h3 className="pt-[1vw]">Assigned Videos</h3>
      {/* render assigned videos in table */}
      <div className={styles.videoDatabase}>
        <div className={`${styles.videoWrapper} flex flex-col h-[70vh]`}>
          {/* table header */}
          <ul
            className={`${styles.tableHeader} w-full flex justify-between items-center text-center py-[2vh]`}
          >
            <li className="w-[5%]">#</li>
            <li className="w-[45%]">Script Title</li>
            <li className="w-[15%]">Date</li>
            <li className="w-[15%]">Assigned To</li>
            <li className="w-[20%]">Edit</li>
          </ul>
          {/* table body */}
          <div className={`${styles.tableBody} flex flex-col`}>
            {renderVideosData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreatePage;
