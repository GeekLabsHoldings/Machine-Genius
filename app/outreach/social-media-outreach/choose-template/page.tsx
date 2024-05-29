import styles from "./choose-template.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const page = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col gap-12 items-center min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
            <h2 className="text-[2.5rem] font-bold">Choose a Template</h2>
            <div className="flex gap-9 h-full ">
              <div
                className={`flex flex-col py-8 px-9 ${styles.box__shadow} border border-gray-300 rounded-[20px] h-[60vh]`}
              >
                <h3 className="text-xl font-bold border-b border-[var(--dark)] pb-5">
                  Templates
                </h3>
                <div
                  className={`flex flex-col gap-6 h-full overflow-y-auto py-5`}
                >
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`flex flex-col gap-2 p-[22px] rounded-[20px] border w-80  border-gray-300 ${styles.box__shadow} hover:bg-[var(--dark)] hover:text-white cursor-pointer`}
                      >
                        <span className="font-bold">
                          Syndication reach-out email
                        </span>
                        <span>(indirect)</span>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className={`flex flex-col grow py-8 px-9 ${styles.box__shadow} max-w-[40rem] border border-gray-300 rounded-[20px] h-[60vh]`}
              >
                <h3 className="text-xl font-bold border-b border-[var(--dark)] pb-5">
                  Syndication reach-out email ( indirect) 
                </h3>
                <div
                  className={`flex flex-col gap-6 h-full overflow-y-auto py-5`}
                >
                  <p>Hello [Recipient's Name],</p>

                  <p>
                    I hope this message finds you well. My name is [Your Name],
                    and I'm reaching out on behalf of Penny Stocks Today, a
                    leading financial news publication known for delivering
                    insightful analysis and market updates.
                  </p>

                  <p>
                    I wanted to introduce myself and express our interest in
                    potentially collaborating with your platform. We've been
                    impressed by the quality of content and engagement on your
                    site and believe that our financial content could be a
                    valuable addition to your offerings.
                  </p>

                  <p>
                    Specifically, we're interested in discussing the possibility
                    of republishing (syndicating) our content on your website.
                    By sharing our articles and analysis with your audience, we
                    believe it could enhance the value proposition of your
                    platform and attract more visitors to your brand.
                  </p>

                  <p>
                    We understand the importance of maintaining the integrity
                    and relevance of your content, which is why we're open to
                    discussing flexible partnership arrangements that align with
                    your editorial guidelines and audience interests.
                  </p>

                  <p>
                    If you could kindly connect me with someone who oversees
                    content syndication or any relevant department within your
                    organization, I would greatly appreciate it. I'm eager to
                    explore how we can work together to create a mutually
                    beneficial partnership.
                  </p>

                  <p>
                    Thank you for considering this opportunity, and I look
                    forward to hearing from you soon.
                  </p>

                  <p>Best regards,</p>

                  <p>
                    [Your Name]
                    <br />
                    [Your Position]
                    <br />
                    Penny Stocks Today
                    <br />
                    [Your Contact Information]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              href="/outreach/social-media-outreach/choose-audience"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
