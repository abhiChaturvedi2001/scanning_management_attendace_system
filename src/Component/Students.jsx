import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../utils/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, filterDataBySlot } from "../utils/studentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../Assets/spinner.gif";

const Students = () => {
  const dispatch = useDispatch();
  const Filter = useSelector((store) => store?.student?.filterData);
  const all = useSelector((store) => store?.student?.studentData);
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const data = [];
    const collectionRef = collection(db, "Batch23");
    const snapShot = await getDocs(collectionRef);
    snapShot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    dispatch(addStudent(data));
  };
  function createData(RegisterNo, Name, Course, Attendance, id) {
    return { RegisterNo, Name, Course, Attendance, id };
  }

  const rows = Filter.map((student) =>
    createData(
      student.StudentID,
      student.StudentName,
      student.Course,
      student.Attendance,
      student.id
    )
  ).reverse();

  const handleValue = (e) => {
    dispatch(filterDataBySlot(e.currentTarget.value));
  };

  const downloadAttendanceSheet = (id) => {
    alert("downloaded");
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full overflow-x-scroll">
        <div className=" text-center mt-6 px-3 max-md:mt-[80px]">
          <h1 className="font-bold font-poppins capitalize ">
            Note : All the MCA student who Paid the Fees are in the list.
          </h1>
          <div className="mt-4 px-4 mx-sm:text-center">
            <label className="font-bold font-poppins">
              Check Students Slot Wise :{" "}
            </label>
            <select
              onChange={(e) => handleValue(e)}
              className="w-[50%] max-sm:w-full bg-gray-300 font-poppins outline-none px-2 py-1 rounded-sm ml-4"
            >
              <option value="">Choose Slot</option>
              <option value="B11+B12+B13">B11+B12+B13</option>
              <option value="C11+C12+C13">C11+C12+C13</option>
              <option value="D11+D12+D13">D11+D12+D13</option>
            </select>
          </div>
        </div>
        {Filter.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <img src={spinner} alt="" />
          </div>
        ) : (
          <div className="mt-8 px-4 ">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Register No.</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Course</TableCell>
                    <TableCell align="left">Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.studentID}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{row.RegisterNo}</TableCell>
                      <TableCell align="left">{row.Name}</TableCell>
                      <TableCell align="left">{row.Course}</TableCell>
                      <button className="ml-5">Download</button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default Students;
