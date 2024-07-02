import ReactMarkdown from "react-markdown";
import { HiOutlineMail, HiOutlineLink, HiExternalLink } from "react-icons/hi";
import {
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { TbBrandTwitter } from "react-icons/tb";
import { useContext } from "react";
import { CvContext } from "./hooks/CvContext";
import { websiteLinkCreator, resolvedWebsiteLink } from "./utils/link.utils";
const CV3 = () => {
  const items = "flex items-center mr-3 mt-[5px] ";
  const itemsSVG = "h-3 w-3 text-gray-700 mr-1";
  const titles = "text-sm font-medium uppercase text-[0.7rem]";
  const paragraphSize = "text-[0.680rem] mt-[3px] text-gray-700 ";
  const jobSize = "text-[0.68rem] text-gray-500 ";

  const cv = useContext(CvContext);
  // console.log(cv);

  return (
    <div className="w-full h-full flex" id="cv">
      <div className=" w-[30%] pr-4 flex flex-col  mr-1 h-full">
        {[cv.cv].map((item, index) => {
          return (
            <div key={index}>
              {item.displayImage ? (
                <div className="mr-3 flex">
                  <img
                    src={item.image || "/login_bg.png"}
                    className="rounded-full"
                    style={{ height: "60px", width: "60px" }}
                    alt="profilePicture"
                    objectFit="cover"
                  />
                </div>
              ) : null}

              <section id="social" className="mt-3">
                <div className="flex  flex-col flex-wrap  text-[0.68rem] mt-1 items-left align-middle  ">
                  {item.email && item.displayMail ? (
                    <div className={items}>
                      <HiOutlineMail className={itemsSVG} />
                      <a
                        href={`mailto:${item.email}`}
                        className="w-[70px] whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {item.email}
                      </a>
                    </div>
                  ) : null}
                  {item.website && item.displayWebSite ? (
                    <div className={items}>
                      <HiOutlineLink className={itemsSVG} />
                      <a
                        href={websiteLinkCreator(item.website)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {resolvedWebsiteLink(websiteLinkCreator(item.website))}
                      </a>
                    </div>
                  ) : null}
                  {item.github && item.displayGithub ? (
                    <div className={items}>
                      <AiFillGithub className={itemsSVG} />

                      <a
                        href={`https://github.com/${item.github}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.github}
                      </a>
                    </div>
                  ) : null}
                  {item.twitter && item.displayTwitter ? (
                    <div className={items}>
                      <TbBrandTwitter className={itemsSVG} />
                      <a
                        href={`https://twitter.com/${item.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.twitter}
                      </a>
                    </div>
                  ) : null}
                  {item.linkedIn && item.displayLinkedIn ? (
                    <div className={items}>
                      <AiOutlineLinkedin className={itemsSVG} />
                      <a
                        href={`https://www.linkedin.com/in/${item.linkedIn}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.linkedIn}
                      </a>
                    </div>
                  ) : null}
                  {item.instagram && item.displayInstagram ? (
                    <div className={items}>
                      <AiOutlineInstagram className={itemsSVG} />
                      <a
                        href={`https://www.instagram.com/${item.instagram}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.instagram}
                      </a>
                    </div>
                  ) : null}
                  {item.facebook && item.displayFacebook ? (
                    <div className={items}>
                      <AiOutlineFacebook className={itemsSVG} />
                      <a
                        href={`https://www.facebook.com/${item.facebook}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.facebook}
                      </a>
                    </div>
                  ) : null}
                </div>
              </section>

              <section id="skills_and_projects" className="flex mt-3">
                <section id="skills" className="">
                  <div className="mt-2">
                    <h4 className="text-[0.74rem] ">{item.skillTitle1}</h4>
                    <p className={paragraphSize}>
                      {item.toolsAndTechSkills.join(", ")}
                    </p>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-[0.74rem]">{item.skillTitle2}</h4>
                    <p className={paragraphSize}>
                      {item.industryKnowledge.join(", ")}
                    </p>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-[0.74rem]">{item.skillTitle3}</h4>
                    <p className={paragraphSize}>{item.languages.join(", ")}</p>
                  </div>
                </section>
              </section>

              <section id="education" className="mt-3">
                <h4 className="text-[0.74rem] mb-1">Education</h4>

                {item.education.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <h4 className="text-[0.65rem] mt-1 font-medium">
                        {item.title}
                      </h4>
                      <p className="text-[0.65rem] mt-1 text-gray-600">
                        {item.school}
                      </p>
                      <p className="text-[0.705rem] text-gray-500">
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                  );
                })}
                <p className={paragraphSize}>{}</p>
              </section>
            </div>
          );
        })}
      </div>
      <div className="relative w-[70%] h-full">
        {[cv.cv].map((item, index) => {
          return (
            <div key={index}>
              <section id="about">
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <h4 className=" text-gray-400 pb-1 text-sm font-medium">
                  {item.jobTitle}
                  {item.location ? " - " : null}
                  {item.location}
                </h4>

                <ReactMarkdown className="myList text-[0.705rem] mt-1 text-gray-700  ">
                  {item.about}
                </ReactMarkdown>
              </section>

              <section className="mt-8 relative">
                <h3 className={titles}>Experience</h3>

                {item.experiences.map((experience, index) => {
                  return (
                    <div className="relative" key={index}>
                      <div className="flex mt-3 flex-col justify-between">
                        <h4 className="font-medium  text-[0.75rem]">
                          {experience.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <p className={jobSize}>{experience.company}</p>{" "}
                          <span className={jobSize}>|</span>
                          <span className="flex items-center space-x-1">
                            <p className={jobSize}>{experience.startDate}</p>
                            {experience.endDate ? (
                              <span className={jobSize}> - </span>
                            ) : null}

                            <p className={jobSize}>{experience.endDate}</p>
                          </span>
                        </div>
                      </div>
                      <ReactMarkdown className="myList text-[0.705rem] mb-2 mt-2 text-gray-700 ">
                        {experience.summary}
                      </ReactMarkdown>
                    </div>
                  );
                })}
              </section>

              <section id="projects" className="relative">
                <h3 className={titles}>Projects</h3>

                {item.projects.map((project, index) => {
                  return (
                    <div key={index} className="mt-2 relative">
                      <h4 className="font-medium text-sm">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.title}
                          {project.link ? (
                            <HiExternalLink className="ml-1 inline" />
                          ) : null}
                        </a>
                      </h4>
                      <p className={paragraphSize}>{project.summary}</p>
                    </div>
                  );
                })}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CV3;
