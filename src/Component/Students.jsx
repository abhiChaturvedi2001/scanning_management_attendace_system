import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const dataArray = [];
    const collectionRef = collection(db, "Batch23");
    const snapShot = await getDocs(collectionRef);
    snapShot.forEach((doc) => dataArray.push(doc.data()));
    setStudents(dataArray);
  };

  const handleScan = (data) => {
    if (data) {
      // Update the state with the scanned data
      setScannedData(JSON.parse(data));

      // Redirect to the portal link
      window.location.href =
        "https://scanning-management-attendace-system.vercel.app/"; // Replace with your actual portal link
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  if (students.length === 0) return <h1>Loading...</h1>;

  // Check if data is scanned and handle redirection
  if (scannedData) {
    const { StudentName, InstituteName, Course, Attendance } = scannedData;
    // Display the scanned data on the portal
    return (
      <div>
        <p>Scanned Data:</p>
        <p>{StudentName}</p>
        <p>{InstituteName}</p>
        <p>{Course}</p>
        <p>{Attendance}</p>
      </div>
    );
  }

  // Render QR code scanner if no data is scanned
  return (
    <>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />

      {students.map((items, index) => {
        const { StudentName, Attendance, InstituteName, Course } = items;
        const uniqueIdentifier = JSON.stringify({
          StudentName,
          InstituteName,
          Course,
          Attendance,
        });

        return (
          <div key={uniqueIdentifier} className="student-qr-code ml-5">
            <QRCode value={uniqueIdentifier} />
            <p className="text-black">
              {StudentName}
              {InstituteName}
              {Course}
              {Attendance}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Students;
