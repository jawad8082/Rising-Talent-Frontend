import React from "react";
import Image from "next/image";

const aboutData = [
  {
    content: "Gain real world value by investing in digital assets",
    img: "/images/real-world-value.svg",
  },
  {
    content:
      "Solve real world problems and earn money by listing your creative collection",
    img: "/images/solve-earn.svg",
  },
  {
    content: "Invest in real talents and help people break free of poverty",
    img: "/images/real-talents.svg",
  },
  {
    content:
      "Giving power and control back to you at every step of the journey",
    img: "/images/power-control.svg",
  },
  {
    content: "Protect your purchasing and buying power",
    img: "/images/protect-purchase.svg",
  },
];

const About = () => {
  return (
    <div className="h-section -scroll-mt-28 text-m-brown ">
      <div className=" relative  mx-auto flex w-full max-w-6xl flex-col items-center justify-between px-6 py-24   text-center">
        <h2 className=" text-2xl font-extrabold uppercase text-m-peach-dark xl:mb-6 xl:text-4xl">
          About Rising Talent
        </h2>
        <p className=" mb-36 max-w-lg ">
          Rising Talent is an ecosystem of products that aims to bring real
          world utility into the web3 space.
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-y-20 gap-x-12 xl:gap-y-36">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-sm items-center justify-start mx-auto xl:col-span-2 ${
                index === 3 && "xl:col-start-2 xl:col-end-4"
              } `}
            >
              <div
                className={`mb-8 flex h-56 w-56 items-center justify-center overflow-clip rounded-full bg-primary-gradient p-4  xl:h-52 xl:w-52 xl:min-w-[12rem]`}
              >
                <Image src={item.img} alt="" width={"190"} height={"190"} />
              </div>
              <p>{item?.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
