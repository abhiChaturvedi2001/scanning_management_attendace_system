import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Students = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <>
      <div className=" w-full">
        <div className=" text-center mt-6">
          <h1 className="font-bold font-poppins capitalize">
            Note : All the MCA student which Paid the Fees are Herer
          </h1>
          <div className="mt-4">
            <label className="font-bold font-poppins">
              Check Students Slot Wise :{" "}
            </label>
            <select className="w-[50%] bg-gray-300 font-poppins outline-none px-2 py-1 rounded-sm ml-4">
              <option value="">Choose Slot</option>
              <option value="B11+B12+B13">B11+B12+B13</option>
              <option value="B11+B12+B13">B11+B12+B13</option>
              <option value="B11+B12+B13">B11+B12+B13</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <h1>Table student</h1>
          <TableContainer className="w-[40%]" component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Register No.</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Attendance&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">
                      <button>absent</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Students;
