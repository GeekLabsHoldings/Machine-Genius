import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "@/app/newsletter/create/newsletter-preview/newsletter-preview.module.css";

const newsletter = {
  title: "News Letter Title",
  sections: [
    {
      name: "SMALL CAPS",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "LARGE CAPS",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "MARKET NEWS",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "MEME OF THE DAY",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "LARGE CAPS",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "MARKET NEWS",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
    {
      name: "MEME OF THE DAY",
      news: [
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
        "#TSLA is in the lead with Q4 MAZING results!",
      ],
    },
  ],
};

function page() {
  return (
   
    <div className="flex flex-col">

      {/* titles wrapper */}
      <div className="flex justify-end items-center flex-col h-[75vh] gap-[2vw] pb-[1.5vw]">
        {/* scripts wrapper */}
        {/* generated titles container */}
        <div className="flex flex-col gap-1 w-full">
          <h2 className="text-2xl font-bold">News Letter</h2>
          <span>
            Make sure to check the News Letter carefully before publishing.
          </span>
        </div>
        <div
          className={`${styles.titles_container} flex flex-col h-full text-center overflow-hidden`}
        >
          {/* generated titles container */}
          <h3 className="text-2xl p-4 font-bold">{newsletter.title}</h3>
          <ul className="grow overflow-y-auto pb-[0.7rem]">
            {newsletter.sections.map((section, index) => (
              <div key={index} className="">
                <li className="text-2xl font-bold bg-[#E1C655] text-white">
                  <h4 className="text-2xl font-bold bg-[#E1C655] text-white">
                    {section.name}
                  </h4>
                </li>
                {section.news.map((news, index) => (
                  <li key={index} className="p-2">
                    {news}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
      {/* Next & Back Buttons to navigate to next and back pages */}
      <div className="flex w-full justify-between">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/newsletter/create/newsletter-generated-titles"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/newsletter/create/newsletter-subjectline"}
        />
      </div>
    </div>
  );
}

export default page;
