import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QRCodeGenerator = () => {
  const [scanresult, setscanresult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 450,
        height: 450,
      },
      fps: 5,
    });

    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setscanresult(result);
    }
    function error(err) {
      console.warn(err);
    }
  }, []);

  const getData = async () => {
    const dataArray = [];
    const collectionREf = collection(db, "Batch23");
    const q = query(collectionREf, where("StudentName", "==", scanresult));
    const snapshot = await getDocs(q);
    snapshot.forEach((data) => setscanresult({ id: data.id, ...data.data() }));
  };
  getData();

  const handleAttendance = async (text, id) => {
    const updateStudentDoc = doc(db, "Batch23", id);
    const newValue = { Attendance: text };
    await updateDoc(updateStudentDoc, newValue);
    toast.success("Successfully update attendance", {
      position: "top-center",
      autoClose: 1000,
      className: " font-poppins ",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center flex-col w-full text-center">
        <h1 className="font-poppins font-bold capitalize">
          Scan your ID CARD{" "}
        </h1>
        <div className="mt-5 w-[50rem] min-h-[40vh] h-auto font-poppins font-bold  ">
          {scanresult ? (
            <div className="shadow-lg w-[40%] mx-auto h-[40vh] rounded-md px-2 py-2">
              <div className="mt-2">Name : {scanresult.StudentName}</div>
              <div className="mt-2">Slot : {scanresult.Slot}</div>
              <div className="mt-2">Course : {scanresult.Course}</div>
              <div className="mt-2">Status : {scanresult.Attendance}</div>
              <button
                onClick={() => handleAttendance("Present", scanresult.id)}
                className="bg-[#0074D9] mt-2 rounded-md px-2 py-2 cursor-pointer text-white font-poppins"
              >
                Present
              </button>
              <button className="bg-red-500 px-2 py-2 cursor-pointer rounded-md text-white font-poppins ml-2 ">
                Add Remark
              </button>
            </div>
          ) : (
            <div id="reader"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRCodeGenerator;
