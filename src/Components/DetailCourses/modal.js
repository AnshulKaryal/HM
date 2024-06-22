import { useState, useEffect } from "react";
import { HiSquare3Stack3D } from "react-icons/hi2";
// import { dummy } from "./data";

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const NewModal = ({ handleModalOpen,datas,type ,title}) => {
    const [openDetails, setOpenDetails] = useState({});
    console.log(type)
    
    useEffect(() => {
        // Add the no-scroll class to the body when the modal is open
        document.body.classList.add('overflow-hidden');
        // Remove the no-scroll class from the body when the modal is closed
        return () => document.body.classList.remove('overflow-hidden');
    }, []);

    const handleToggle = (index, isOpen) => {
        setOpenDetails((prevState) => ({
            ...prevState,
            [index]: isOpen,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full text-black bg-[#E2FFF1] bg-opacity-20 backdrop-blur-lg">
            <div className="relative p-4 w-full max-w-4xl max-h-[78vh] bg-[#E2FFF1] rounded-lg shadow h-auto xsm:w-[90%] xsm:p-2">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-black  capitalize flex flex-col gap-1">
                            {title}
                        </h3>
                       
                    </div>
                    <div className="flex gap-4 items-center">
                       
                        <button
                            type="button"
                            onClick={handleModalOpen}
                            className="absolute top-4 right-4 font-bold text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white"
                            data-modal-hide="default-modal"
                        >
                            X
                        </button>
                    </div>
                </div>
                {/* Modal body */}
                <div className="px-[1rem] py-[2rem] md:p-5 space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar xsm:py-[1rem]">
                    {datas.map((module, index) => (
                        <details
                            className="cursor-text"
                            key={index + 67}
                            onToggle={(e) => handleToggle(index, e.target.open)}
                        >
                            <summary className="bg-[#FFE5E5] px-[1rem] py-[2rem] rounded-md text-xl font-bold capitalize flex justify-between items-center xsm:text-[12px] xsm:leading-3 xsm:p-[1rem] cursor-pointer">
                                <p>
                                    {module.title}{" "}
                                    <span className="font-light text-black">{module.duration}</span>
                                </p>
                                {openDetails[index] ? (
                                    <MdKeyboardArrowUp className="text-2xl font-semibold" />
                                ) : (
                                    <MdKeyboardArrowDown className="text-2xl font-semibold" />
                                )}
                            </summary>
                            <div className="bg-white px-4 py-3 grid grid-cols-3 gap-3 items-center justify-between xsm:grid-cols-2">
                                {module?.allData?.map((lesson, index) => (
                                    <>
                                        {type === "Project" && <div className="bg-[#FFE5E5] flex flex-col justify-center px-[2rem] py-[2rem] items-start rounded-md xsm:p-[1rem]">
                                                <div className="flex gap-2 items-center">
                                                <img src={"/Icons/project.svg"} alt="project" className="text-green-500 h-[25px] w-auto xsm:h-[18px]"/>

                                                    <p className=" capitalize text-xs xsm:text-[10px] xsm:leading-3">{lesson.title}</p>
                                                </div>
                                               {/* <a href={lesson.projectInfoPdf} className="font-semibold">Open Project</a> */}
                                            </div>}
                                        {type === "Module" && <div className="bg-[#FFE5E5] flex flex-col justify-center px-[2rem] py-[2rem] items-start rounded-md xsm:p-[1rem] ">
                                                <div className="flex gap-2 items-center">
                                                <img src={"/Icons/module.svg"} alt="module" className="text-green-500 h-[25px] w-auto xsm:h-[18px]"/>

                                                    <p className=" capitalize text-xs xsm:text-[10px] xsm:leading-3">{lesson.lesson_name}</p>
                                                </div>
                                             
                                        </div>}
                                        {type === "Assignment" && lesson.assignment !== "" && <div className="bg-[#FFE5E5] flex flex-col justify-center px-[2rem] py-[2rem] items-start rounded-md xsm:p-[1rem]">
                                            <div className="flex gap-2 items-center">
                                                <img src={"/Icons/assignment.svg"} alt="assignment" className="text-green-500 h-[25px] w-auto xsm:h-[18px]" />

                                                <p className=" capitalize text-xs ">{lesson.lesson_name}</p>
                                            </div>
                                         
                                        </div>}
                                        {type === "Notes" && lesson.notes !== "" && <div className="bg-[#FFE5E5] flex flex-col justify-center px-[2rem] py-[2rem] items-start rounded-md xsm:p-[1rem]">
                                            <div className="flex gap-2 items-center">
                                                <img src={"/Icons/notes.svg"} alt="Notes" className="text-green-500 h-[25px] w-auto xsm:h-[18px]" />

                                                <p className=" capitalize text-xs">{lesson.lesson_name}</p>
                                            </div>
                                         
                                        </div>}
                                        </>
                                  
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default NewModal