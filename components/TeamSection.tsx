//@ts-nocheck
import React from "react";
// import TeamSlidesMobile from "./TeamSlidesMobile";

const teamData = [
  {
    title: "Jawad Ahmed",
    description: "Team Lead - Full Stack Dev",
    imageSrc: "images/Jawad.png",
  },
  {
    title: "Abdul Rafay",
    description: "Full Stack Dev - DevOps",
    imageSrc: "images/Rafay.png",
  },
  {
    title: "Rana Waqar",
    description: "Front-End Dev",
    imageSrc: "images/Rana.png",
  },
  {
    title: "Rida Taufeeq",
    description: "UI/UX Designer",
    imageSrc: "images/Rida.png",
  },
];

const TeamMember = ({ title, description, imageSrc }) => {
  return (
    <div className={`flex flex-col text-center mb-3 items-center mx-auto `}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={title} />
      <h4 className="text-m-peach-dark my-3 max-w-full text-2xl font-extrabold uppercase xl:text-xl">
        {title}
      </h4>
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
};

const Team = () => {
  return (
    <div className="pb-32 pt-16">
      <h2 className="text-center text-2xl font-extrabold uppercase mb-16 xl:text-4xl">
        About Team
      </h2>
      <div className="flex gap-12 flex-wrap">
        {teamData.map((teamMember, index) => (
          <TeamMember {...teamMember} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Team;
