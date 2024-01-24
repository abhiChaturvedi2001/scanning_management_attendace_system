import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DataGridDemo() {
  const [studentData, setStudentdata] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const dataArray = [];
    const collectionRef = collection(db, "Batch23");
    const snapShot = await getDocs(collectionRef);
    snapShot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    setStudentdata(dataArray);
  };

  if (studentData.length === 0) return <h1>Loading......</h1>;
  const rows = [
    ...studentData.map((items) => {
      return {
        id: items.StudentID,
        fullName: items.StudentName,
        Course: items.Course,
        CourseType: items.CourseType,
      };
    }),
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
