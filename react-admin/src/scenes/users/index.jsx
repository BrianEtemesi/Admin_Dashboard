import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Action from "../../components/Action";
import { useQuery, gql } from '@apollo/client';


const GET_USERS = gql`
  {
    allUsers {
      id
      name
      phoneNumber
      email
      address
      roleId
      dateCreated
      dateEdited
      status
    }
  }
`;



const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USERS);


  // const handleSelectionModelChange = (selectionModel) => {
  //   setSelectedRows(selectionModel);
  // };

   const handleCreateUser = () => {
    // Implement logic to navigate to the user creation page or perform necessary actions
    navigate('../form');
    console.log('Create User button clicked');
  };

  const handleActivateUsers = () => {
    // Implement logic to activate selected users
    console.log('Activate Users button clicked');
  };

  const handleDeactivateUsers = () => {
    // Implement logic to deactivate selected users
    console.log('Deactivate Users button clicked');
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { roleId } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              roleId === "1"
                ? colors.greenAccent[600]
                : roleId === "2"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {roleId === 1 && <AdminPanelSettingsOutlinedIcon />}
            {roleId === 2 && <SecurityOutlinedIcon />}
            {roleId === 3 && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {roleId}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {/* Render the Action component at the end of the row */}
          {/* Pass the user ID to the Action component */}
          <Action userId={row.id} />
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="User Management" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
      >
        <Box>
          {/* Buttons moved to the far right */}
        </Box>
        <Box>
          {/* Only show Create User button when no rows are selected */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                marginRight: "10px",
              }}
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          {/* Show Activate and Deactivate buttons when rows are selected */}
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginRight: "10px",
                }}
                onClick={handleActivateUsers}
              >
                Activate Users
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.redAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                onClick={handleDeactivateUsers}
              >
                Deactivate Users
              </Button>
            </>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <DataGrid 
            checkboxSelection rows={data.allUsers} 
            columns={columns} 
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;