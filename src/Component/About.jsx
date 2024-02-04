import React from "react";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[60vh]">
        <div className=" font-poppins text-center px-5">
          <h1 className="text-3xl capitalize font-bold">
            Welcome to our Automated Attendance System
          </h1>
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
        </div>
      </div>
    </>
  );
};

export default About;
