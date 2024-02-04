import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, filterDataBySlot } from "../utils/studentSlice";

const Students = () => {
  const dispatch = useDispatch();
  const [attendanceData, setAttedanceData] = useState("");
  const [selectedSlot, setseletedSlot] = useState("");
  const studentData = useSelector((store) => store?.student?.studentData);
  const Filter = useSelector((store) => store?.student?.filterData);
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const data = [];
    const collectionRef = collection(db, "Batch23");
    const snapShot = await getDocs(collectionRef);
    snapShot.forEach((doc) => data.push(doc.data()));
    dispatch(addStudent(data));
  };
  function createData(RegisterNo, Name, Course, Attendance) {
    return { RegisterNo, Name, Course, Attendance };
  }

  const rows = Filter.map((student) =>
    createData(
      student.StudentID,
      student.StudentName,
      student.Course,
      student.Attendance
    )
  ).reverse();

  const handleValue = (e) => {
    dispatch(filterDataBySlot(e.currentTarget.value));
  };

  return (
    <>
      <div className="w-[70rem]">
        <div className=" text-center mt-6">
          <h1 className="font-bold font-poppins capitalize">
            Note : All the MCA student who Paid the Fees are in the list.
          </h1>
          <div className="mt-4">
            <label className="font-bold font-poppins">
              Check Students Slot Wise :{" "}
            </label>
            <select
              onChange={(e) => handleValue(e)}
              className="w-[50%] bg-gray-300 font-poppins outline-none px-2 py-1 rounded-sm ml-4"
            >
              <option value="">Choose Slot</option>
              <option value="B11+B12+B13">B11+B12+B13</option>
              <option value="C11+C12+C13">C11+C12+C13</option>
              <option value="D11+D12+D13">D11+D12+D13</option>
            </select>
          </div>
        </div>
        {Filter.length === 0 ? (
          <h1>Loadingg....</h1>
        ) : (
          <div className="mt-8 px-4  ">
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.RegisterNo}</TableCell>
                      <TableCell align="left">{row.Name}</TableCell>
                      <TableCell align="left">{row.Course}</TableCell>
                      <TableCell align="left">
                        <select
                          onChange={(e) =>
                            setAttedanceData(e.currentTarget.value)
                          }
                          className="px-2 py-2"
                        >
                          <option value="Absent">Absent</option>
                          <option value="Present">Present</option>
                        </select>
                      </TableCell>
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
