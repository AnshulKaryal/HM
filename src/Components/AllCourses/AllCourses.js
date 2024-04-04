import React, { useContext, useEffect, useRef, useState } from "react";
import Img1 from "../../Assests/Images/searchbanner.png";
import Img2 from "../../Assests/Images/creator.png";
import Icon1 from "../../Assests/Icons/twitter.svg";
import Icon2 from "../../Assests/Icons/facebook.svg";
import Icon3 from "../../Assests/Icons/instagram.svg";
import User1 from "../../Assests/Images/Saurabh Pal-Data Resolve.png";
import User2 from "../../Assests/Images/Sumit.jpg";
import User3 from "../../Assests/Images/Khushpreet Kaur-Delta IT.jpeg";
import User4 from "../../Assests/Images/Amritpal Protiviti GDU 5.7.png";
import axios from "axios";
import { BASE_URL } from "../../Api/api";
import { Link, useSearchParams } from "react-router-dom";
import RecommendedCourses from "../RecommendedCourses/RecommendedCourses";
import NewTestimonial from "../Testimonial/NewTestimonial";
import Spinner from "../Spinner";
import ReactPlayer from "react-player";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { GoUnmute } from "react-icons/go";
import { Globalinfo } from "../../App";

const AllCourses = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const [selectedUser, setSelectedUser] = useState(User1);
  const [allCourses, setAllCourses] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [Data, setData] = useState([]);
  const [SearchedData, setSearchedData] = useState([]);
  const [Temp, setTemp] = useState([]);
  const [show, setshow] = useState(false);
  const [mouseHovered, setMouseHovered] = useState(null);
  const [countvalue, setcountvalue] = useState(0)
  const [userData, setUserData] = useState({
    [User1]: {
      name: "SAURABH PAL",
      email: "saurabh@dataresolve.com",
      description1:
        "Being a recent Computer Science graduate from Jaypee University, MP,I faced job challenges post-college. Enrolling in Hoping Minds for personal development and placement training, I swiftly secured a System Developer role at Data Resolve, grateful for their transformative assistance in my professional journey.",
      description2: "Lorem ipsuut labore et dolore magna aliqua.",
      description3:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    [User2]: {
      name: "SUMIT VERMA",
      email: "sumit@example.com",
      description1:
        "HopingMinds played a crucial role in securing my first job, providing unwavering support, essential skills, and invaluable guidance. Their exceptional job placement assistance led me to a role aligned with my aspirations, illuminating my path to success.",
      description2:
        "Ut enim ad min, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      description3: "Ut enim ad minim vequat.",
    },
    [User3]: {
      name: "KHUSHPREET KAUR",
      email: "khushpreet@example.com",
      description1:
        "Hoping Minds' dedicated efforts and comprehensive job assistance program transformed me from a hopeful job seeker to a proud employee. Their personalized approach, insightful counseling, and invaluable support led to securing my first job and equipped me for future career success.",
      description2: "Duis aute irure dolor nulla pariatur.",
      description3:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillumulla pariatur.",
    },
    [User4]: {
      name: "AMRITPAL SINGH",
      email: "jack@example.com",
      description1:
        "Thrilled to join Protiviti, thanks to Hoping Minds' fantastic support. The journey was challenging, but their assistance and opportunities for growth were invaluable. Grateful to family, teachers, and friends. Excited and determined for this new career chapter!",
      description2: "Exce cupidatat non proident, sunt in culpaborum.",
      description3:
        "Excepteur sint occaect in culpa qui officia deserunt mollit anim id est laborum.",
    },
  });
  const { userDetail, getUserDetails } = useContext(Globalinfo);

  // console.log(userDetail.blocked_courses)
  const [IsMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const [params, setparams] = useSearchParams()


  const fetchCourses = async () => {
    try {
      let category = params.get("category");
      category=category.replace(/%20/g, " ");
      console.log(category);
      if (category) {
        setshow(true);
        const res = await axios.get(`${BASE_URL}/courses?category=${category}`);
        // console.log(res);
        setAllCourses(res.data.courses);
        setData(res.data.courses);
        setTemp(res.data.courses);
        setshow(false);
      } else {
        setshow(true);

        const res = await axios.get(`${BASE_URL}/courses`);
        // console.log(res.data.courses);

        const newCourses = moveBlockedCoursesToEnd(res.data.courses, userDetail.blocked_courses)
        // setAllCourses(res.data.courses);
        setAllCourses(newCourses)

        setData(res.data.courses)
        setTemp(res.data.courses)
        setshow(false)

      }
    } catch (error) { }
  };

  const handleMute = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsMuted((prev) => !prev);

  };

  function SearchData(e) {
    let query = e.target.value;
    // setSearchQuery(e.target.value);
    // console.log(query);
    // console.log(query);
    if (query == "") {
      setSearchedData([]);
      // console.log("query:",Data);
      setAllCourses(Data);
    } else {
      setSearchedData(
        allCourses.filter((item) => {
          const searchitem = query.toLowerCase();
          const slug = item.slug.toLowerCase();
          // console.log(slug);
          // console.log(searchitem && (slug.includes(searchitem)));
          return searchitem && slug.includes(searchitem);
        })
      );
      setAllCourses(
        allCourses.filter((item) => {
          const searchitem = query.toLowerCase();
          const slug = item.slug.toLowerCase();
          // console.log(slug);
          // console.log(searchitem && (slug.includes(searchitem)));
          return searchitem && slug.includes(searchitem);
        })
      );
    }
  }

  const moveBlockedCoursesToEnd = (courses, blockedCourses) => {

    const filteredCourses = courses.filter(course => !blockedCourses.includes(course._id));
    const blockedCoursesList = courses.filter(course => blockedCourses.includes(course._id));
    const updatedCourses = filteredCourses.concat(blockedCoursesList);

    return updatedCourses;
  };



  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(SearchedData)
  const toggleHover = (index) => {
    setMouseHovered(index);
  };
  function Count(num) {
    for (let index = 0; index < num; index++) {
      // setTimeout(() => {
      // console.log(index);
      setTimeout(() => {
        setcountvalue(index)
      }, index * 10);

      // }
      // }, index*1000);


    }
  }
  useEffect(() => {
    Count(1001)
  }, [])

  return (
    <>
      <head>
        <title>Courses | HopingMinds</title>
      </head>
      {/* Search */}
      {/* <div
        className="flex flex-col gap-5 p-20 items-center xsm:py-6 xsm:px-0 xsm:gap-2 md:p-10 bg-[#000000]"
        style={{ backgroundImage: `url(${Img1})`, backgroundSize: "cover" }}
      > */}

      {/* </div> */}

      <div className="relative h-auto w-full">
        <div className="flex flex-row rounded-2xl w-[60%] xsm:w-[90%] xsm:rounded-md md:rounded-lg absolute z-20 top-[30%] left-[17%]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder=""
              onChange={SearchData}
              className={`flex-1 w-full outline-none placeholder-gray-500 text-[16px] font-pop rounded-tl-2xl py-2 px-4 xsm:rounded-l-md xsm:py-1 xsm:text-[10px] md:rounded-l-lg md:text-[14px] ${!SearchedData.length ? "rounded-bl-2xl" : "rounded-bl-0"
                }`}
            />
            <div className="flex flex-col w-full absolute bg-[#f3fffa] justify-center">
              {SearchedData.map((item, ind) => {
                // console.log(item.);
                return (
                  <>
                    <Link
                      key={ind}
                      to={"/detailcourse/" + item.slug}
                      className="text-left pl-2 py-1 border-b-[2px]"
                    >
                      {item.title}
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
          <button className="text-[#ffffff] text-[22px] font-pop bg-[#1DBF73] rounded-r-2xl py-1 px-10 xsm:rounded-r-md xsm:text-[10px] xsm:py-1 xsm:px-2 md:text-[14px] md:rounded-r-lg">
            Search
          </button>
        </div>

        <div className="h-full w-full bg-black">
          <ReactPlayer

            url='https://hoping-minds-courses.s3.ap-south-1.amazonaws.com/assets/1712146617474-vid-1.mp4'
            height="100%"
            width={'100%'}
            playing={true}
            loop={true}
            controls={false}
          />
        </div>

        <div className="w-full bg-[rgba(0,0,0,0.6)] h-28 flex justify-center space-x-20 text-white  absolute bottom-0 items-center">
          <div className="text-white ">
            <div>Courses to choose from</div>
            <div className="text-center text-xl font-semibold">{countvalue}+</div>

          </div>
          <div>
            <div>Courses to choose from</div>
            <div className="text-center text-xl font-semibold">{countvalue}+</div>
          </div>
          <div>
            <div>Courses to choose from</div>
            <div className="text-center text-xl font-semibold">{countvalue}+</div>
          </div>
        </div>
      </div>
      {/* cards */}
      {!allCourses?.length ? (
        <div className="flex justify-center  w-full mt-10">
          <div className="text-center font-semibold text-2xl w-full ">
            {" "}
            No Course Found
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="my-10 mx-[5%] grid grid-cols-4 gap-6 xsm:grid-cols-3 xsm:gap-3 xsm:my-[4%] md:my-[2%]">
        {allCourses.map((val, ind) => {
          return (
            <Link
              to={"/detailcourse/" + val.slug}
              className="px-4 py-6 h-full flex flex-col gap-4 rounded-xl shadow-xl shadow-[#D9D9D9] xsm:gap-2 xsm:py-2 xsm:px-1 xsm:rounded-md md:p-2 md:gap-2"
              onMouseEnter={() => toggleHover(ind)}
              onMouseLeave={() => toggleHover(null)}
              key={ind}
              style={{ pointerEvents: userDetail?.blocked_courses?.includes(val._id) ? 'none' : 'auto' }}
            >
              {
                userDetail?.blocked_courses?.includes(val._id)
                &&
                <span className="absolute top-0 left-0 h-[100%] w-[100%] z-[99999] bg-[rgba(0,0,0,0.6)] rounded-xl grid place-items-center">
                  <IoIosLock size={"60"} color={"white"} />
                </span>
              }

              {mouseHovered === ind &&
                <span className="bg-transparent p-4 absolute top-6 left-4 z-[9999]" >
                  {IsMuted ? (
                    <IoVolumeMuteOutline
                      size={"20"}
                      style={{
                        cursor: "pointer",
                        color: "black",

                        zIndex: "999999",
                      }}
                      onClick={handleMute}
                    />
                  ) : (
                    <IoVolumeMediumOutline
                      size={"20"}
                      style={{
                        cursor: "pointer",
                        color: "black",

                        zIndex: "999999",
                      }}
                      onClick={handleMute}
                    />
                  )}
                </span>}
              <div className="h-[45%]">
                {mouseHovered === ind ? (
                  <ReactPlayer
                    className="w-full h-full rounded-xl xsm:rounded-md border"
                    height={'100%'}
                    width={'100%'}
                    url={val.featured_video}
                    controls={false}
                    playing={true}
                    ref={videoRef}
                    muted={IsMuted}
                  />
                ) : (
                  <img
                    className="w-full h-full rounded-xl xsm:rounded-md"
                    src={val.featured_image}
                    alt={val.title}
                  />
                )}
              </div>
              <div className="space-y-4 flex flex-col justify-between h-[53%] xsm:space-y-2 md:space-y-2">
                <div className="flex flex-col gap-3 xsm:gap-2 md:gap-0">
                  <div className="flex justify-between">
                    <div className="flex space-x-2 items-center xsm:space-x-1">
                      <img
                        className="w-[16px] h-[16px] xsm:w-[8px] xsm:h-[8px] md:h-3 md:w-3"
                        src="../Icons/RCDesign.svg"
                      />
                      <p className="font-pop text-[12px] font-medium text-[#555555] xsm:text-[5px] md:text-[6px]">
                        {val?.category}
                      </p>
                    </div>
                    <div>
                      <p className="font-pop font-bold text-[#1DBF73] text-[16px] xsm:text-[6px] md:text-[10px]">
                        ₹ {val?.base_price}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center xsm:space-x-0">
                    <img
                      className="w-[16px] h-[16px] text-[#555555] xsm:w-[8px] xsm:h-[8px] md:h-3 md:w-3"
                      src="../Icons/RCClock.svg"
                    />
                    <p className="font-pop text-[12px] font-medium text-[#555555] xsm:text-[5px] md:text-[6px]">
                      {val?.duration}
                    </p>
                  </div>
                  <p className="font-pop font-semibold text-[16px] text-[#252641] xsm:text-[8px] md:text-[12px]">
                    {val?.title}
                  </p>
                  <p className="font-pop text-[14px] text-[#555555] xsm:hidden md:text-[8px]">
                    {val?.overview.slice(0, 70)}..
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <div className="flex items-center space-x-3 xsm:space-x-1 md:space-x-2">
                    <img
                      className="w-[32px] h-[32px] xsm:w-[14px] xsm:h-[14px] md:h-4 md:w-4"
                      src="../img/RCimg2.png"
                    />
                    <p className="font-pop font-medium text-[14px] xsm:text-[6px] md:text-[7px]">
                      {val?.instructor.firstName +
                        " " +
                        val?.instructor.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-14 px-24 py-20 md:px-[5%] md:gap-2 md:py-10">
        <p className="text-[#252641] text-[32px] font-poppins font-semibold pl-4 md:text-[18px]">
          Classes taught by real creators
        </p>
        <div className="grid grid-cols-3 gap-20">
          <div className="h-[45vh] flex justify-center items-end relative md:h-[16vh]">
            <div
              className="flex flex-col gap-2 h-[70%] justify-end items-center text-center py-6 md:py-2 md:gap-1 md:h-[60%]"
              style={{ boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.25)" }}
            >
              <p className="text-[#252641] text-[20px] font-poppins font-semibold md:text-[14px]">
                Adam
              </p>
              <p className="text-[#696984] text-[16px] font-poppins w-[70%] md:text-[8px]">
                Lorem ipsum dolor sit amet, consectetur adipising elit, sed do
                eiusmod tempor
              </p>
            </div>
            <img src={Img2} className="absolute top-5 w-[40%]" />
          </div>

          <div className="h-[45vh] flex justify-center items-end relative md:h-[16vh]">
            <div
              className="flex flex-col gap-2 h-[70%] justify-end items-center text-center py-6 md:py-2 md:gap-1 md:h-[60%]"
              style={{ boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.25)" }}
            >
              <p className="text-[#252641] text-[20px] font-poppins font-semibold md:text-[14px]">
                Adam
              </p>
              <p className="text-[#696984] text-[16px] font-poppins w-[70%] md:text-[8px]">
                Lorem ipsum dolor sit amet, consectetur adipising elit, sed do
                eiusmod tempor
              </p>
            </div>
            <img src={Img2} className="absolute top-5 w-[40%]" />
          </div>

          <div className="h-[45vh] flex justify-center items-end relative md:h-[16vh]">
            <div
              className="flex flex-col gap-2 h-[70%] justify-end items-center text-center py-6 md:py-2 md:gap-1 md:h-[60%]"
              style={{ boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.25)" }}
            >
              <p className="text-[#252641] text-[20px] font-poppins font-semibold md:text-[14px]">
                Adam
              </p>
              <p className="text-[#696984] text-[16px] font-poppins w-[70%] md:text-[8px]">
                Lorem ipsum dolor sit amet, consectetur adipising elit, sed do
                eiusmod tempor
              </p>
            </div>
            <img src={Img2} className="absolute top-5 w-[40%]" />
          </div>
        </div>
      </div>

      {/* recommended cards */}
      <RecommendedCourses />

      {/* <div className="flex flex-col gap-10 bg-[#E2FFF1] px-28 py-16 xsm:px-[5%] xsm:py-[5%] xsm:gap-2">
        <p className="text-[#000000] text-[30px] font-pop font-semibold xsm:text-[8px]">
          What our students have to say
        </p>
        <div className="bg-[#ffffff] rounded-xl flex flex-row gap-20 py-10 pt-20 px-14 xsm:py-2 xsm:px-2 xsm:gap-0">
          <div className="flex w-[65%] justify-center xsm:items-center">
            <img
              src={selectedUser === User1 ? User1 : selectedUser}
              className="h-[300px] w-[300px] rounded-full object-cover"
              onClick={() => toggleUserImage("")}
            />
          </div>
          <div className="flex flex-col gap-5 w-full justify-end pl-4 xsm:gap-1 xsm:justify-center">
            <p className="text-[#252641] text-[30px] font-pop font-semibold xsm:text-[8px]">
              {userData[selectedUser]?.name}
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-8 w-[65%] xsm:gap-2">
                <div className="flex flex-col gap-3 xsm:gap-0">
                  <p className="text-[#252641] text-[24px] font-pop font-semibold xsm:text-[6px]">
                    {userData[selectedUser]?.email}
                  </p>
                  <p className="text-[#696984] text-[16px] font-pop xsm:text-[6px]">
                    {userData[selectedUser]?.description1}
                  </p>
               <p className="text-[#696984] text-[16px] font-pop xsm:hidden">
                    {userData[selectedUser]?.description2}
                  </p>
                  <p className="text-[#696984] text-[16px] font-pop xsm:hidden">
                    {userData[selectedUser]?.description3}
                  </p> 
                </div>
                <div className="flex flex-row gap-6 xsm:gap-2">
                  <img src={Icon1} className="w-[6%] object-contain " />
                  <img src={Icon2} className="w-[6%] object-contain" />
                  <img src={Icon3} className="w-[6%] object-contain" />
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-between xsm:gap-1">
                <img
                  src={User1}
                  className="w-[50px] h-[50px] object-cover cursor-pointer xsm:w-[15px] rounded-full"
                  onClick={() => toggleUserImage(User1)}
                />
                <img
                  src={User2}
                  className="w-[50px] h-[50px] object-cover cursor-pointer xsm:w-[15px] rounded-full"
                  onClick={() => toggleUserImage(User2)}
                />
                <img
                  src={User3}
                  className="w-[50px] h-[50px] object-cover cursor-pointer xsm:w-[15px] rounded-full"
                  onClick={() => toggleUserImage(User3)}
                />
                <img
                  src={User4}
                  className="w-[50px] h-[50px] object-cover cursor-pointer xsm:w-[15px] rounded-full"
                  onClick={() => toggleUserImage(User4)}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {show ? (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#b4cca1] opacity-80">
          <Spinner className="" />
        </div>
      ) : (
        ""
      )}
      <NewTestimonial />
    </>
  );
};

export default AllCourses;
