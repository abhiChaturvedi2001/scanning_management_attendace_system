import React from "react";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[80vh] max-sm:h-[100vh] w-full overflow-x-scroll ">
        <div className=" font-poppins text-center px-5">
          <h1 className="text-lg uppercase max-md:text-sm tracking-wider font-bold">
            Welcome to Our App 👋🏻
          </h1>
          <h3 className="text-4xl mt-3 capitalize font-bold max-md:text-xl">
            Attendance Mark System
          </h3>
          <p className="mt-4 font-medium">
            The Automated Attendance System is designed for managing attendance
            in various institutions starting from our university VIT, Bhopal.
            The system includes modern technologies such as Bar code and Scanner
            to automate the attendance process, reducing the manual efforts like
            in traditional automated system and errors that may occur while
            taking attendance manually.​
          </p>
          <p className="mt-4 font-medium">
            In traditional methods the manual attendance recording is not only
            time-consuming but also very much prone to errors and wrong
            manipulation. To overcome this, we have designed this System that
            will provide a smooth and efficient experience.​
          </p>
          <button className="px-2 py-2 border-2 mt-4 cursor-pointer ">
            Check It Out
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
