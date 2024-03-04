import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Modal } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { tokens } from '../theme';
import { useQuery, gql, useMutation } from '@apollo/client';
import EditForm from './EditUserForm';

const ACTIVATE_DEACTIVATE_USERS = gql`
  mutation ActivateDeactivateUsers($userIds: [Int!]!, $action: Int!) {
    activateDeactivateUsers(userIds: $userIds, action: $action)
  }
`;

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

const Action = ({ userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);  // Store the selected user data

  const [activateDeactivateUsers] = useMutation(ACTIVATE_DEACTIVATE_USERS);

  const { loading, error, data, refetch } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActivate = async () => {
    try {
      // Send the activateDeactivateUsers mutation to the server
      const { data } = await activateDeactivateUsers({
        variables: { userIds: [userId], action: 1 }, // 1 for activation
      });

      const activationSuccess = data.activateDeactivateUsers;

      if (activationSuccess) {
        // Refetch the user data to ensure it's up-to-date
        await refetch();
  
        // Close the menu
        handleClose();
      } else {
        // Handle activation failure if needed
        console.error('Activation failed');
      }
    } catch (error) {
      console.error('Error activating user:', error.message);
    }
  };

  const handleDeactivate = async () => {
    try {
      const { data } = await activateDeactivateUsers({
        variables: { userIds: [userId], action: 0 }, // 0 for deactivation
      });

      const deactivationSuccess = data.activateDeactivateUsers;

      if (deactivationSuccess) {
        await refetch();
        handleClose();
      } else {
        console.error('Deactivation failed');
      }
    } catch (error) {
      console.error('Error deactivating user:', error.message);
    }
  };

  const handleEdit = () => {
    // Find the selected user based on userId
    const user = data.allUsers.find((user) => user.id === userId);

    // Set the selected user and open the edit form
    setSelectedUser(user);
    setEditOpen(true);
    handleClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
    // Optionally, reset the selected user when the form is closed
    setSelectedUser(null);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleActivate}>Activate</MenuItem>
        <MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </Box>
    {/* Render the EditForm as a Modal */}
    <Modal
        open={editOpen && selectedUser}
        onClose={handleEditClose}
        aria-labelledby="edit-form"
        aria-describedby="edit-form-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <EditForm
            user={selectedUser}
            onClose={handleEditClose}
            onEdit={() => {
              refetch();  // Refetch the user data after editing
              // ... (other actions)
            }}
          />
        </Box>
      </Modal>
    </>
    
    
  );
};

export default Action;
