// import React, { useState } from "react";
// import QrReader from "modern-react-qr-reader";
// import { collection, where, query, getDocs } from "firebase/firestore";
// import { db } from "../utils/firebase";

// const QRCodeGenerator = () => {
//   const [result, setResult] = useState("No result");

//   const handleScan = (data) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const getData = async () => {
//     const collectionRef = collection(db, "Batch23");
//     const q = query(collectionRef, where("StudentName", "==", result));
//     const snapshot = await getDocs(q);
//     snapshot.forEach((doc) => console.log(doc.data()));
//   };
//   getData();

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <QrReader
//         delay={300}
//         facingMode={"environment"}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "300%" }}
//       />
//       <p>{result}</p>
//     </div>
//   );
// };

// export default QRCodeGenerator;

import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const QRCodeGenerator = () => {
  const [result, setResult] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleAttendance = () => {
    alert("attendance mark successfully");
  };
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrBox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setResult(result);
    }
    function error() {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1>Scann your Qr </h1>
        <div className="w-[500px]">
          {result === "" ? (
            <div id="reader"></div>
          ) : (
            <>
              <h1>{result}</h1>
              <button
                onClick={handleAttendance}
                className="border bg-green-400 px-2 py-1"
              >
                Mark Attendance
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QRCodeGenerator;
