"use client";
import Slider from "react-slick";
import React, { useState } from "react";
import styles from "./analytics.module.css";
import "./slider.css";
import dynamic from "next/dynamic";


const TasksChart = dynamic(() => import("@/app/_components/graph/AreaChart"), {
  ssr: false,
});

const LineCharts = dynamic(() => import("@/app/_components/graph/LineCharts"), {
  ssr: false,
});

function SampleNextArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.4941 23.9434C17.0787 23.529 17.0787 22.8565 17.4941 22.441L21.8726 18.0625L10.625 18.0625C10.0406 18.0625 9.5625 17.5865 9.5625 17C9.5625 16.4124 10.0406 15.9375 10.625 15.9375L21.8726 15.9375L17.4941 11.559C17.0787 11.1435 17.0787 10.4699 17.4941 10.0566C17.9074 9.64115 18.581 9.64115 18.9965 10.0566L25.0059 16.066C25.2609 16.321 25.3406 16.6696 25.2822 17C25.3406 17.3304 25.2609 17.679 25.0059 17.934L18.9965 23.9434C18.581 24.3588 17.9074 24.3588 17.4941 23.9434ZM34 29.75L34 4.25C34 1.90294 32.0971 -8.318e-08 29.75 -1.85773e-07L4.25 -1.30041e-06C1.90187 -1.40305e-06 -8.318e-08 1.90294 -1.85773e-07 4.25L-1.30041e-06 29.75C-1.40301e-06 32.0971 1.90187 34 4.25 34L29.75 34C32.0971 34 34 32.0971 34 29.75Z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
        />
      </svg>
    </div>
  );
}

function page() {
  const settings: any = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1425,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    centerPadding: 30,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [activeTab, setActiveTab] = useState<number>(1);

  const [selectedValue, setSelectedValue] = useState<string>("option1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const accordionWhiteArrow = (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.076 0.0130668L0.843283 0.0130681C0.699184 0.0133699 0.557936 0.0399126 0.434744 0.0898379C0.311551 0.139763 0.211079 0.21118 0.144142 0.296403C0.077206 0.381627 0.0463412 0.477428 0.0548671 0.573495C0.063393 0.669563 0.110989 0.762258 0.192531 0.841604L7.3089 7.70645C7.60384 7.99108 8.31389 7.99108 8.60962 7.70645L15.726 0.841602C15.8084 0.762422 15.8567 0.66968 15.8657 0.573453C15.8746 0.477226 15.844 0.381194 15.777 0.29579C15.71 0.210387 15.6092 0.138877 15.4856 0.0890332C15.3621 0.0391889 15.2204 0.0129152 15.076 0.0130668Z"
        fill="#FFFFFB"
      />
    </svg>
  );

  const accordionBlackArrow = (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0213 -0.000605037L0.788595 -0.000603793C0.644496 -0.000301942 0.503248 0.0262407 0.380057 0.0761661C0.256864 0.126091 0.156391 0.197508 0.0894549 0.282731C0.0225185 0.367955 -0.00834625 0.463757 0.000179602 0.559823C0.00870546 0.655891 0.0563014 0.748586 0.137843 0.827932L7.25421 7.69278C7.54915 7.97741 8.2592 7.97741 8.55493 7.69278L15.6713 0.82793C15.7537 0.74875 15.802 0.656008 15.811 0.559781C15.82 0.463554 15.7893 0.367522 15.7223 0.282118C15.6553 0.196715 15.5545 0.125206 15.431 0.0753613C15.3074 0.025517 15.1657 -0.000756684 15.0213 -0.000605037Z"
        fill="#2A2B2A"
      />
    </svg>
  );

  const upArrow = (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.447347 4.54895L8.35443 4.54895C8.43448 4.54878 8.51295 4.53403 8.58139 4.5063C8.64983 4.47856 8.70565 4.43888 8.74284 4.39154C8.78002 4.34419 8.79717 4.29097 8.79243 4.2376C8.7877 4.18423 8.76126 4.13273 8.71595 4.08865L4.76242 0.274844C4.59856 0.116718 4.20409 0.116718 4.0398 0.274844L0.0862574 4.08865C0.0404952 4.13264 0.0136591 4.18416 0.00866495 4.23762C0.00367078 4.29108 0.0207095 4.34443 0.0579299 4.39188C0.0951503 4.43933 0.151129 4.47905 0.219784 4.50674C0.288438 4.53444 0.367143 4.54903 0.447347 4.54895Z"
        fill="#5FA85B"
      />
    </svg>
  );

  const downArrow = (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.35734 0.71863L0.450262 0.718631C0.370207 0.718799 0.291736 0.733545 0.223296 0.761281C0.154856 0.789017 0.0990374 0.828693 0.0618508 0.87604C0.0246641 0.923386 0.00751614 0.976609 0.012253 1.02998C0.01699 1.08335 0.0434315 1.13485 0.088733 1.17893L4.04227 4.99273C4.20612 5.15086 4.6006 5.15086 4.76489 4.99273L8.71843 1.17893C8.76419 1.13494 8.79103 1.08342 8.79602 1.02996C8.80102 0.976496 8.78398 0.923145 8.74676 0.875699C8.70954 0.828252 8.65356 0.788525 8.5849 0.760833C8.51625 0.733142 8.43754 0.718545 8.35734 0.71863Z"
        fill="#E9313E"
      />
    </svg>
  );

  const accordionItems = [
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
  ];

  function AccordionItem({ title, option }: { title: string; option: number }) {
    return (
      <div
        className={`collapse ${
          selectedValue === `option${option}` ? "bg-[#404140]" : ""
        }`}
      >
        <input
          type="radio"
          name="my-accordion-1"
          value={`option${option}`}
          onChange={handleRadioChange}
          checked={selectedValue === `option${option}`}
        />
        <div className="collapse-title font-bold flex justify-between items-center">
          <p>{title}</p>
          {accordionWhiteArrow}
        </div>
        <div className="collapse-content space-y-1">
          <div className="flex justify-between">
            <p>Instagram</p>
            <p className="flex items-center gap-[12px]">
              <span>100K</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Twitter</p>
            <p className="flex items-center gap-[12px]">
              <span>20K</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>YouTube</p>
            <p className="flex items-center gap-[12px]">
              <span>3.2M</span>
              {downArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Website</p>
            <p className="flex items-center gap-[12px]">
              <span>400k</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Reddit</p>
            <p className="flex items-center gap-[12px]">
              <span>1M</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Discord</p>
            <p className="flex items-center gap-[12px]">
              <span>20K</span>
              {downArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Telegram</p>
            <p className="flex items-center gap-[12px]">
              <span>150K</span>
              {upArrow}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function AccordionItem2({ title }: { title: string }) {
    return (
      <div className={`collapse accordion2`}>
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-bold flex justify-between items-center">
          <p>{title}</p>
          {accordionBlackArrow}
        </div>
        <div className="collapse-content bg-[#E6E6E259]">
          <div>
            <table id="testTable">
              <thead>
                <tr>
                  <th>Brand/Accounts</th>
                  <th>KPI/s Required</th>
                  <th>KPI/s Met</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Instagram</td>
                  <td>
                    2 Reels <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-not-met">1/2</td>
                </tr>
                <tr>
                  <td>Twitter</td>
                  <td>
                    2 Tweets <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-not-met">1/2</td>
                </tr>
                <tr>
                  <td>YouTube</td>
                  <td>
                    1 Video <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-met">1/1</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>
                    1 Article <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-met">1/1</td>
                </tr>
                <tr>
                  <td>Reddit</td>
                  <td>
                    2 Posts <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-not-met">1/2</td>
                </tr>
                <tr>
                  <td>Discord</td>
                  <td>
                    2 Announcements <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-met">2/2</td>
                </tr>
                <tr>
                  <td>Telegram</td>
                  <td>
                    2 Posts <span className="font-bold">/Day</span>
                  </td>
                  <td className="kpi-not-met">1/2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const Chart1 = dynamic(() => import("../../_components/OP/Chart1"), {
    ssr: false,
  });

  return (
    <div
      className={`${styles.assets} h-[90vh] overflow-hidden op__analytics__container`}
    >
      {/* Tabs */}
      <div role="tablist" className={`${styles.tabs} flex`}>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(1)}
        >
          God View
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 2 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Brands
        </a>
      </div>

      {activeTab === 1 && (
        <div className={`h-[80vh]`}>
          <div className={styles.dashboard}>
            <div className={styles.mainContent}>
              {/* First Row */}
              <div className="flex justify-between gap-[1vw] h-[50vh]">
                {/* Revenue Over View */}
                <div className="flex-grow">
                  <p>Revenue Over View</p>

                  <div className="RevenueOverView_Container overflow-y-auto">
                    <Chart1 />
                  </div>
                </div>

                {/* Brand KPIs */}
                <div className="BrandKPIs h-full">
                  <p>Brand KPIs</p>
                  <div className="-space-y-4 overflow-y-auto h-full">
                    <AccordionItem2 title={"Street Politics"} />
                    {accordionItems.map((item, index) => (
                      <AccordionItem2 key={index} title={item.title} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-[1vw]">
                {/* Activity Over View */}
                <div className="ActivityOverView flex-grow">
                  <p>Activity Over View</p>
                  <div className="ActivityOverView_Container">
                    <table>
                      <thead>
                        <tr>
                          <th>Brand</th>
                          <th>Impressions</th>
                          <th>Reach</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody className="overflow-y-auto h-[5vh]">
                        <tr>
                          <td>PST Canada</td>
                          <td>200 K</td>
                          <td>360 K</td>
                          <td>
                            <svg
                              width="120"
                              height="30"
                              viewBox="0 0 120 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.40625 20.4737C1.40625 20.4737 6.03228 19.7959 11.2918 21.4242C21.2951 24.5212 21.8658 18.8499 25.5751 16.1152C28.9687 13.6134 31.7793 15.1399 35.5579 18.1994C38.3447 20.456 42.4062 24.2439 46.6123 23.6341C50.4571 23.0767 53.1828 18.634 58.5121 17.5042C62.7359 16.6087 66.1685 19.0688 71.0322 18.1994C77.6303 17.0201 80.5776 10.0772 85.2932 10.0772C91.1134 10.0772 95.2111 4.20508 100.506 4.20508C105.769 4.20508 106.484 7.65801 112.241 10.0772C116.643 11.9266 118.761 10.0772 118.761 10.0772V29.8955H1.40625V20.4737Z"
                                fill="url(#paint0_linear_1402_9405)"
                              />
                              <path
                                d="M1.40625 17.3967C1.40625 17.3967 6.03228 16.7287 11.2918 18.3335C21.2951 21.3857 21.8658 15.7964 25.5751 13.1014C28.9687 10.6357 31.7793 12.1401 35.5579 15.1554C38.3447 17.3793 42.4062 21.1124 46.6123 20.5114C50.4571 19.9621 53.1828 15.5837 58.5121 14.4702C62.7359 13.5877 66.1685 16.0122 71.0322 15.1554C77.6303 13.9931 80.5776 7.15069 85.2932 7.15069C91.1134 7.15069 95.2111 1.34961 100.506 1.34961C105.769 1.34961 106.049 4.76654 111.807 7.15069C116.208 8.97338 118.761 7.15069 118.761 7.15069"
                                stroke="#31B2E9"
                                stroke-width="1.70946"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1402_9405"
                                  x1="22.6153"
                                  y1="17.2405"
                                  x2="22.6153"
                                  y2="29.8955"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#0062FF" />
                                  <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0.01"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>PST USA</td>
                          <td>200 K</td>
                          <td>360 K</td>
                          <td>
                            <svg
                              width="120"
                              height="30"
                              viewBox="0 0 120 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.40625 20.4737C1.40625 20.4737 6.03228 19.7959 11.2918 21.4242C21.2951 24.5212 21.8658 18.8499 25.5751 16.1152C28.9687 13.6134 31.7793 15.1399 35.5579 18.1994C38.3447 20.456 42.4062 24.2439 46.6123 23.6341C50.4571 23.0767 53.1828 18.634 58.5121 17.5042C62.7359 16.6087 66.1685 19.0688 71.0322 18.1994C77.6303 17.0201 80.5776 10.0772 85.2932 10.0772C91.1134 10.0772 95.2111 4.20508 100.506 4.20508C105.769 4.20508 106.484 7.65801 112.241 10.0772C116.643 11.9266 118.761 10.0772 118.761 10.0772V29.8955H1.40625V20.4737Z"
                                fill="url(#paint0_linear_1402_9405)"
                              />
                              <path
                                d="M1.40625 17.3967C1.40625 17.3967 6.03228 16.7287 11.2918 18.3335C21.2951 21.3857 21.8658 15.7964 25.5751 13.1014C28.9687 10.6357 31.7793 12.1401 35.5579 15.1554C38.3447 17.3793 42.4062 21.1124 46.6123 20.5114C50.4571 19.9621 53.1828 15.5837 58.5121 14.4702C62.7359 13.5877 66.1685 16.0122 71.0322 15.1554C77.6303 13.9931 80.5776 7.15069 85.2932 7.15069C91.1134 7.15069 95.2111 1.34961 100.506 1.34961C105.769 1.34961 106.049 4.76654 111.807 7.15069C116.208 8.97338 118.761 7.15069 118.761 7.15069"
                                stroke="#31B2E9"
                                stroke-width="1.70946"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1402_9405"
                                  x1="22.6153"
                                  y1="17.2405"
                                  x2="22.6153"
                                  y2="29.8955"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#0062FF" />
                                  <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0.01"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>ST Suite</td>
                          <td>200 K</td>
                          <td>360 K</td>
                          <td>
                            <svg
                              width="120"
                              height="30"
                              viewBox="0 0 120 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.40625 20.0889C1.40625 20.0889 6.03228 19.4111 11.2918 21.0394C21.2951 24.1365 21.8658 18.4651 25.5751 15.7305C28.9687 13.2286 31.7793 14.7551 35.5579 17.8147C38.3447 20.0713 42.4062 23.8592 46.6123 23.2494C50.4571 22.6919 53.1828 18.2492 58.5121 17.1194C62.7359 16.2239 66.1685 18.684 71.0322 17.8147C77.6303 16.6353 80.5776 9.69241 85.2932 9.69241C91.1134 9.69241 95.2111 3.82031 100.506 3.82031C105.769 3.82031 106.484 7.27325 112.241 9.69241C116.643 11.5419 118.761 9.69241 118.761 9.69241V29.5107H1.40625V20.0889Z"
                                fill="url(#paint0_linear_1402_9431)"
                              />
                              <path
                                d="M1.40625 17.0119C1.40625 17.0119 6.03228 16.3439 11.2918 17.9487C21.2951 21.0009 21.8658 15.4116 25.5751 12.7166C28.9687 10.2509 31.7793 11.7553 35.5579 14.7706C38.3447 16.9945 42.4062 20.7276 46.6123 20.1266C50.4571 19.5773 53.1828 15.1989 58.5121 14.0854C62.7359 13.2029 66.1685 15.6274 71.0322 14.7706C77.6303 13.6084 80.5776 6.76592 85.2932 6.76592C91.1134 6.76592 95.2111 0.964844 100.506 0.964844C105.769 0.964844 106.049 4.38178 111.807 6.76592C116.208 8.58862 118.761 6.76592 118.761 6.76592"
                                stroke="#E1C655"
                                stroke-width="1.70946"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1402_9431"
                                  x1="22.6153"
                                  y1="16.8558"
                                  x2="22.6153"
                                  y2="29.5107"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#E1C655" />
                                  <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0.01"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>Juice Box</td>
                          <td>200 K</td>
                          <td>360 K</td>
                          <td>
                            <svg
                              width="120"
                              height="30"
                              viewBox="0 0 120 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.40625 20.0889C1.40625 20.0889 6.03228 19.4111 11.2918 21.0394C21.2951 24.1365 21.8658 18.4651 25.5751 15.7305C28.9687 13.2286 31.7793 14.7551 35.5579 17.8147C38.3447 20.0713 42.4062 23.8592 46.6123 23.2494C50.4571 22.6919 53.1828 18.2492 58.5121 17.1194C62.7359 16.2239 66.1685 18.684 71.0322 17.8147C77.6303 16.6353 80.5776 9.69241 85.2932 9.69241C91.1134 9.69241 95.2111 3.82031 100.506 3.82031C105.769 3.82031 106.484 7.27325 112.241 9.69241C116.643 11.5419 118.761 9.69241 118.761 9.69241V29.5107H1.40625V20.0889Z"
                                fill="url(#paint0_linear_1402_9431)"
                              />
                              <path
                                d="M1.40625 17.0119C1.40625 17.0119 6.03228 16.3439 11.2918 17.9487C21.2951 21.0009 21.8658 15.4116 25.5751 12.7166C28.9687 10.2509 31.7793 11.7553 35.5579 14.7706C38.3447 16.9945 42.4062 20.7276 46.6123 20.1266C50.4571 19.5773 53.1828 15.1989 58.5121 14.0854C62.7359 13.2029 66.1685 15.6274 71.0322 14.7706C77.6303 13.6084 80.5776 6.76592 85.2932 6.76592C91.1134 6.76592 95.2111 0.964844 100.506 0.964844C105.769 0.964844 106.049 4.38178 111.807 6.76592C116.208 8.58862 118.761 6.76592 118.761 6.76592"
                                stroke="#E1C655"
                                stroke-width="1.70946"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1402_9431"
                                  x1="22.6153"
                                  y1="16.8558"
                                  x2="22.6153"
                                  y2="29.5107"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#E1C655" />
                                  <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0.01"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>Inestocrasy</td>
                          <td>200 K</td>
                          <td>360 K</td>
                          <td>
                            <svg
                              width="120"
                              height="31"
                              viewBox="0 0 120 31"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.40625 20.8838C1.40625 20.8838 6.03228 20.206 11.2918 21.8344C21.2951 24.9314 21.8658 19.26 25.5751 16.5254C28.9687 14.0235 31.7793 15.55 35.5579 18.6096C38.3447 20.8662 42.4062 24.6541 46.6123 24.0443C50.4571 23.4869 53.1828 19.0442 58.5121 17.9143C62.7359 17.0188 66.1685 19.4789 71.0322 18.6096C77.6303 17.4303 80.5776 10.4873 85.2932 10.4873C91.1134 10.4873 95.2111 4.61523 100.506 4.61523C105.769 4.61523 106.484 8.06817 112.241 10.4873C116.643 12.3368 118.761 10.4873 118.761 10.4873V30.3057H1.40625V20.8838Z"
                                fill="url(#paint0_linear_1402_9447)"
                              />
                              <path
                                d="M1.40625 17.8069C1.40625 17.8069 6.03228 17.1389 11.2918 18.7436C21.2951 21.7958 21.8658 16.2065 25.5751 13.5115C28.9687 11.0459 31.7793 12.5502 35.5579 15.5655C38.3447 17.7895 42.4062 21.5225 46.6123 20.9216C50.4571 20.3722 53.1828 15.9938 58.5121 14.8803C62.7359 13.9978 66.1685 16.4223 71.0322 15.5655C77.6303 14.4033 80.5776 7.56084 85.2932 7.56084C91.1134 7.56084 95.2111 1.75977 100.506 1.75977C105.769 1.75977 106.049 5.1767 111.807 7.56084C116.208 9.38354 118.761 7.56084 118.761 7.56084"
                                stroke="#E9313E"
                                stroke-width="1.70946"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_1402_9447"
                                  x1="22.6153"
                                  y1="17.6507"
                                  x2="22.6153"
                                  y2="30.3057"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#E9313E" />
                                  <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0.01"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Followers Over View */}
                <div className="FollowersOverView">
                  <p>Followers Over View</p>
                  <div className="FollowersOverView_Container">
                    <table>
                      <thead>
                        <tr>
                          <th>Brand</th>
                          <th>Followers</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>PST Canada</td>
                          <td>200 K</td>
                          <td className="percentage">
                            <span>30 %</span> <span className="up">▲</span>
                          </td>
                        </tr>
                        <tr>
                          <td>PST USA</td>
                          <td>200 K</td>
                          <td className="percentage">
                            <span>26%</span> <span className="down">▼</span>
                          </td>
                        </tr>
                        <tr>
                          <td>ST Suite</td>
                          <td>200 K</td>
                          <td className="percentage">
                            <span>14%</span> <span className="up">▲</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Juice Box</td>
                          <td>200 K</td>
                          <td className="percentage">
                            <span>3.5%</span> <span className="up">▲</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Inestocrasy</td>
                          <td>200 K</td>
                          <td className="percentage">
                            <span>0.2%</span> <span className="down">▼</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Youtube Watch time */}
                <div className="YoutubeWatchTime">
                  <p>Youtube Watch time</p>
                  <div className="YoutubeWatchTime_Container">
                    <table>
                      <thead>
                        <tr>
                          <th>Channel</th>
                          <th>Daily Average</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Amazon</td>
                          <td>
                            <span className="chart green-chart">
                              <svg
                                width="58"
                                height="20"
                                viewBox="0 0 58 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                                  fill="url(#paint0_linear_1402_9646)"
                                />
                                <path
                                  d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                                  stroke="#5DB48A"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1402_9646"
                                    x1="26.4377"
                                    y1="-1.16975"
                                    x2="26.0323"
                                    y2="19.1002"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#49A677" />
                                    <stop
                                      offset="1"
                                      stop-color="white"
                                      stop-opacity="0"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>{" "}
                            1658.00 <span className="up-arrow">↑</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Netflix</td>
                          <td>
                            <span className="chart red-chart">
                              <svg
                                width="58"
                                height="22"
                                viewBox="0 0 58 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.41095 4.66356C8.76231 8.8797 3.19484 13.1769 0.492188 14.7985V19.6633L56.8426 21.6903V14.7985L49.5561 9.22046H42.6598L33.0512 1.31678L19.9513 9.93373L16.6071 4.66356C14.5801 -0.471484 10.0596 0.447415 9.41095 4.66356Z"
                                  fill="url(#paint0_linear_1402_9657)"
                                />
                                <path
                                  d="M0.492188 14.7982C3.19484 13.1766 8.76231 8.87937 9.41095 4.66323C10.0596 0.447083 14.0328 -0.561613 16.0598 4.57343L19.9513 9.9334L33.1363 1.28186L42.8787 8.93271H49.5561L56.8426 14.7982"
                                  stroke="#EB7487"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1402_9657"
                                    x1="26.4377"
                                    y1="1.42037"
                                    x2="26.0323"
                                    y2="21.6903"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#EB94A2" />
                                    <stop
                                      offset="1"
                                      stop-color="#EB94A2"
                                      stop-opacity="0"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>{" "}
                            1658.00 <span className="down-arrow">↓</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Amazon</td>
                          <td>
                            <span className="chart green-chart">
                              <svg
                                width="58"
                                height="20"
                                viewBox="0 0 58 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                                  fill="url(#paint0_linear_1402_9646)"
                                />
                                <path
                                  d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                                  stroke="#5DB48A"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1402_9646"
                                    x1="26.4377"
                                    y1="-1.16975"
                                    x2="26.0323"
                                    y2="19.1002"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#49A677" />
                                    <stop
                                      offset="1"
                                      stop-color="white"
                                      stop-opacity="0"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>{" "}
                            1658.00 <span className="up-arrow">↑</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Amazon</td>
                          <td>
                            <span className="chart green-chart">
                              <svg
                                width="58"
                                height="20"
                                viewBox="0 0 58 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
                                  fill="url(#paint0_linear_1402_9646)"
                                />
                                <path
                                  d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
                                  stroke="#5DB48A"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1402_9646"
                                    x1="26.4377"
                                    y1="-1.16975"
                                    x2="26.0323"
                                    y2="19.1002"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#49A677" />
                                    <stop
                                      offset="1"
                                      stop-color="white"
                                      stop-opacity="0"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>{" "}
                            1658.00 <span className="up-arrow">↑</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Netflix</td>
                          <td>
                            <span className="chart red-chart">
                              <svg
                                width="58"
                                height="22"
                                viewBox="0 0 58 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.41095 4.66356C8.76231 8.8797 3.19484 13.1769 0.492188 14.7985V19.6633L56.8426 21.6903V14.7985L49.5561 9.22046H42.6598L33.0512 1.31678L19.9513 9.93373L16.6071 4.66356C14.5801 -0.471484 10.0596 0.447415 9.41095 4.66356Z"
                                  fill="url(#paint0_linear_1402_9657)"
                                />
                                <path
                                  d="M0.492188 14.7982C3.19484 13.1766 8.76231 8.87937 9.41095 4.66323C10.0596 0.447083 14.0328 -0.561613 16.0598 4.57343L19.9513 9.9334L33.1363 1.28186L42.8787 8.93271H49.5561L56.8426 14.7982"
                                  stroke="#EB7487"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_1402_9657"
                                    x1="26.4377"
                                    y1="1.42037"
                                    x2="26.0323"
                                    y2="21.6903"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#EB94A2" />
                                    <stop
                                      offset="1"
                                      stop-color="#EB94A2"
                                      stop-opacity="0"
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>{" "}
                            1658.00 <span className="down-arrow">↓</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.sidebar}>
              <p className="text-[14px] font-bold mt-[6px] mb-[20px] text-center">
                Brand/Accounts
              </p>
              <section className="">
                <div className={styles.accord}>
                  {/* Accordion Item */}
                  <div
                    className={`collapse ${
                      selectedValue === "option1" ? "bg-[#404140]" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="my-accordion-1"
                      defaultChecked
                      value="option1"
                      onChange={handleRadioChange}
                      checked={selectedValue === "option1"}
                    />
                    <div className="collapse-title font-bold flex justify-between items-center">
                      <p>Street Politics</p>
                      {accordionWhiteArrow}
                    </div>
                    <div className="collapse-content space-y-1">
                      <div className="flex justify-between">
                        <p>Instagram</p>
                        <p className="flex items-center gap-[12px]">
                          <span>100K</span>
                          {upArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Twitter</p>
                        <p className="flex items-center gap-[12px]">
                          <span>20K</span>
                          {upArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>YouTube</p>
                        <p className="flex items-center gap-[12px]">
                          <span>3.2M</span>
                          {downArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Website</p>
                        <p className="flex items-center gap-[12px]">
                          <span>400k</span>
                          {upArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Reddit</p>
                        <p className="flex items-center gap-[12px]">
                          <span>1M</span>
                          {upArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Discord</p>
                        <p className="flex items-center gap-[12px]">
                          <span>20K</span>
                          {downArrow}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Telegram</p>
                        <p className="flex items-center gap-[12px]">
                          <span>150K</span>
                          {upArrow}
                        </p>
                      </div>
                    </div>
                  </div>

                  {accordionItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      title={item.title}
                      option={index + 2}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className={`relative`}>
          <div className={` ${styles.audience} mt-8`}>
            <h2 className="text-2xl mb-4 font-bold">Social Media Accounts</h2>
            <div className="">
              <div className="sliderAudience w-[86vw]">
                <div className={`slider-container card ${styles.card} py-6`}>
                  <Slider {...settings}>
                    {Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          className={`${styles.card} px-[1vw] pt-[0.6vw] pb-[1vw] rounded-xl group hover:bg-[var(--dark)] hover:text-[var(--white)]`}
                        >
                          <div className="flex justify-between items-center pb-[0.5vw] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[0.5vw]">
                            <h3 className="grow font-bold text-center">
                              Twitter
                            </h3>
                          </div>
                          <div className="grid mx-auto w-fit grid-cols-2 ">
                            <span className="font-bold">Name:</span>
                            <span>Mega Dose</span>
                            <span className="font-bold">Username:</span>
                            <span>@MEGADOSE</span>
                            <span className="font-bold">Followers:</span>
                            <span>20.1 K</span>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-9">
            <div className="col-span-2 row-span-2">
              <h3 className="text-2xl font-bold">Analytics</h3>
              <div className={"tabs " + styles.tab}>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Daily"
                  defaultChecked
                />
                <div className={`tab-content `}>
                  <div className="flex gap-3 mt-5">
                    <div
                      className={`${styles.card} w-1/2 card h-fit grow px-[1vw] py-[0.6vw] rounded-xl group hover:bg-[var(--dark)] `}
                    >
                      <div className="flex justify-center items-center gap-[1.5vw]">
                        <div className="group-hover:text-[var(--white)]">
                          <div className="flex justify-between items-center w-fit h-[5vh] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[1vw]">
                            <h3 className="font-bold text-center pr-2">
                              Followers
                            </h3>
                          </div>
                          <div className="w-fit flex justify-center items-center gap-3 ">
                            <div className="text-4xl font-bold">22k</div>
                            <div>
                              <svg
                                width="18"
                                height="10"
                                viewBox="0 0 18 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.900543 9.19922L17.101 9.19922C17.265 9.19887 17.4258 9.16866 17.566 9.11183C17.7062 9.05501 17.8206 8.97372 17.8968 8.87671C17.973 8.7797 18.0081 8.67066 17.9984 8.56131C17.9887 8.45196 17.9345 8.34645 17.8417 8.25613L9.74149 0.4422C9.40578 0.118223 8.59756 0.118223 8.26095 0.442201L0.160722 8.25614C0.066962 8.34626 0.0119789 8.45183 0.00174654 8.56136C-0.00848579 8.67089 0.0264241 8.7802 0.102683 8.87741C0.178943 8.97462 0.293634 9.05602 0.434298 9.11275C0.574961 9.16949 0.736217 9.19939 0.900543 9.19922Z"
                                  fill="#5FA85B"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="h-full place-self-end">
                          <TasksChart />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.card} w-1/2 card h-fit grow px-[1vw] py-[0.6vw] rounded-xl group hover:bg-[var(--dark)] `}
                    >
                      <div className="flex justify-center items-center gap-[1.5vw]">
                        <div className="group-hover:text-[var(--white)]">
                          <div className="flex justify-between items-center w-fit h-[5vh] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[1vw]">
                            <h3 className="font-bold text-center pr-2">
                              Activities
                            </h3>
                          </div>
                          <div className="w-fit flex justify-center items-center gap-3 ">
                            <div className="text-4xl font-bold">22k</div>
                            <div>
                              <svg
                                width="18"
                                height="10"
                                viewBox="0 0 18 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.900543 9.19922L17.101 9.19922C17.265 9.19887 17.4258 9.16866 17.566 9.11183C17.7062 9.05501 17.8206 8.97372 17.8968 8.87671C17.973 8.7797 18.0081 8.67066 17.9984 8.56131C17.9887 8.45196 17.9345 8.34645 17.8417 8.25613L9.74149 0.4422C9.40578 0.118223 8.59756 0.118223 8.26095 0.442201L0.160722 8.25614C0.066962 8.34626 0.0119789 8.45183 0.00174654 8.56136C-0.00848579 8.67089 0.0264241 8.7802 0.102683 8.87741C0.178943 8.97462 0.293634 9.05602 0.434298 9.11275C0.574961 9.16949 0.736217 9.19939 0.900543 9.19922Z"
                                  fill="#5FA85B"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="h-full place-self-end">
                          <TasksChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Weekly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Monthly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Quarterly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Yearly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Life-time"
                />
                <div className={`tab-content relative`}></div>
              </div>
            </div>
            <div className="col-span-2 row-span-2 col-start-3">
              <div
                className={`${styles.card} card grow px-[1vw] py-[0.6vw] rounded-xl h-[24vh] bg-[var(--dark)] `}
              >
                <div className="relative flex justify-center h-full items-center gap-[1.5vw]">
                  <div className="w-full place-self-end">
                    <LineCharts />
                  </div>
                  <div className="flex justify-center items-center gap-3 absolute right-3 top-2 text-sm border border-[var(--dark)] shadow-[2px_2.18px_5.5px_0px_#00000075] py-2 px-3 text-[var(--white)] rounded-[5px]">
                    <span>Average Reach</span>
                    <span>|</span>
                    <span className="font-bold">200k</span>
                    <span>
                      <svg
                        width="18"
                        height="9"
                        viewBox="0 0 18 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.900543 9L17.101 9C17.265 8.99965 17.4258 8.96944 17.566 8.91261C17.7062 8.85579 17.8206 8.7745 17.8968 8.67749C17.973 8.58049 18.0081 8.47144 17.9984 8.36209C17.9887 8.25274 17.9345 8.14723 17.8417 8.05692L9.74149 0.242982C9.40578 -0.0809961 8.59756 -0.080996 8.26095 0.242982L0.160722 8.05692C0.066962 8.14705 0.0119789 8.25261 0.00174654 8.36214C-0.00848579 8.47167 0.0264241 8.58098 0.102683 8.67819C0.178943 8.7754 0.293634 8.8568 0.434298 8.91353C0.574961 8.97027 0.736217 9.00017 0.900543 9Z"
                          fill="#5FA85B"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col-span-4 row-span-2 row-start-3 ${styles.engagement}`}
            >
              <div
                className={`${styles.card} flex gap-[3vw]  grow px-[1vw] py-[0.6vw] rounded-xl h-[20vh] bg-[var(--dark)] `}
              >
                <div className="flex items-center w-1/2 h-full gap-[1.5vw] text-[var(--white)]">
                  <div className="w-1/2 h-full flex flex-col">
                    <h3 className="text-xl font-bold">Tweets</h3>
                    <ul className="text-sm list-none">
                      <li className="flex justify-between items-center">
                        <span>Tweets Created</span>
                        <span>1</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Impressions</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Likes</span>
                        <span>34</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Retweets</span>
                        <span>12</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 py-2 h-full flex justify-center items-center">
                    <div className="bg-[#0F0F0F] h-full w-full rounded-2xl overflow-hidden">
                      <h3 className="text-sm pt-3 pl-5  font-bold">
                        Tweets Created
                      </h3>
                      <div className="text-[var(--dark)]">
                        <LineCharts />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-1/2 h-full gap-[1.5vw] text-[var(--white)]">
                  <div className="w-1/2 h-full flex flex-col">
                    <h3 className="text-xl font-bold">Tweets</h3>
                    <ul className="text-sm list-none">
                      <li className="flex justify-between items-center">
                        <span>Tweets Created</span>
                        <span>1</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Impressions</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Likes</span>
                        <span>34</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Retweets</span>
                        <span>12</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 py-2 h-full flex justify-center items-center">
                    <div className="bg-[#0F0F0F] h-full w-full rounded-2xl overflow-hidden">
                      <h3 className="text-sm pt-3 pl-5  font-bold">
                        Tweets Created
                      </h3>
                      <div className="text-[var(--dark)]">
                        <LineCharts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
