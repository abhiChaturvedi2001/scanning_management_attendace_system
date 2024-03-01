import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const QRCodeGenerator = () => {
  const [toggle, setToggle] = useState(false);
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAttendance = async (id) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const updateStudentDoc = doc(db, "Batch23", id);
    const studentSnapshot = await getDoc(updateStudentDoc);

    if (studentSnapshot.exists()) {
      const studentData = studentSnapshot.data();
      const { AttendanceDates = [] } = studentData;

      // Check if attendance for the current date already exists
      const attendanceExists = AttendanceDates.some(
        (attendance) => attendance.date === formattedDate
      );

      if (attendanceExists) {
        alert("Attendance for today has already been marked.");
      } else {
        // Update the AttendanceDates array with today's attendance status
        const updatedAttendanceDates = [
          ...AttendanceDates,
          { date: formattedDate, status: "Present" },
        ];
        await updateDoc(updateStudentDoc, {
          AttendanceDates: updatedAttendanceDates,
        });

        alert("Attendance marked Successfully");
      }
    } else {
      console.error("Student document not found");
    }
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
      fetchData(result);
    }
    function error(err) {
      console.log(err); // Log the error
    }
  }, []);

  const fetchData = async (resultId) => {
    setLoading(true); // Set loading to true while fetching
    const collectionRef = collection(db, "Batch23");
    try {
      const snapshot = await getDocs(collectionRef);
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredData = fetchedData.filter((item) => item.id === resultId);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  if (result === null) return null; // Return null if result is null
  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-full flex-col">
        <h1 className=" font-poppins font-bold ">
          Mark Your Attendance by Scanning your QR
        </h1>
        {result === "" ? (
          <div id="reader"></div>
        ) : (
          <>
            {loading ? ( // Show loading indicator if data is being fetched
              <h1>Loading....</h1>
            ) : (
              data.map((item) => (
                <div
                  className="mt-5 font-poppins border px-5 py-5 font-bold "
                  key={item.id}
                >
                  <h1>Name: {item.StudentName}</h1>
                  <h1>Reg No. : {item.StudentID}</h1>
                  <h1>Slot : {item.Slot}</h1>
                  <h1>Course : {item.Course}</h1>
                  <button
                    onClick={() => handleAttendance(item.id)}
                    className="border px-4 py-2 mt-2 rounded-md font-bold text-white font-poppins bg-green-400"
                  >
                    Mark Attendance
                  </button>
                  <button
                    onClick={() => setToggle(true)}
                    className="border px-4 py-2 mt-2 rounded-md text-white font-bold font-poppins bg-red-400"
                  >
                    Add Remark
                  </button>
                </div>
              ))
            )}
          </>
        )}
      </div>
      <div
        className={`absolute top-1/2 ${
          toggle ? "block" : "hidden"
        } left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 px-2 py-2 w-[15%] min-h-[10vh]`}
      >
        <button onClick={() => setToggle(false)}>X</button>
        <input className="w-full outline-none px-2 py-1" type="text" />
        <button className="mt-2 w-full outline-none px-2 py-1 bg-green-400 rounded-md ">
          Submit
        </button>
      </div>
    </>
  );
};

export default QRCodeGenerator;
