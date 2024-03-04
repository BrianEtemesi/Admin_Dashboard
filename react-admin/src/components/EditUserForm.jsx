import React from 'react';
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from '@apollo/client';

// Define your GraphQL mutation for updating a user
const UPDATE_USER = gql`
  mutation UpdateUser($updateUser: UserInput!) {
    updateUser(updateUser: $updateUser) {
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

// Validation schema for Formik
const validationSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  contact: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      'Invalid phone number'
    )
    .required('Required'),
  address1: yup.string().required('Required'),
  address2: yup.string().required('Required'),
  role: yup.string().required('Required'),
});

const EditUserForm = ({ user, onClose, onEdit }) => {

  const [updateUser] = useMutation(UPDATE_USER);

  const splitFullName = (fullName) => {
    const parts = fullName.split(' ');
  
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    } else {
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');
      return { firstName, lastName };
    }
  };

  const { firstName, lastName } = splitFullName(user.name);

  const handleEditSubmit = async (values) => {
    try {
      // Execute the mutation with the updated user values
      const roleMap = {
        admin: 1,
        manager: 2,
        user: 3,
      };

      const { data } = await updateUser({
        variables: {
          updateUser: {
            id: user.id,
            name: values.firstName + ' ' + values.lastName,
            phoneNumber: values.contact,
            email: values.email,
            address: values.address1 + ' ' + values.address2,
            roleId: roleMap[values.role.toLowerCase()], // Map role name to roleId
            dateEdited: new Date().toISOString(),
          },
        },
      });

      // Trigger any additional actions on edit success
      if (onEdit) {
        onEdit();
      }

      // Close the edit form
      onClose();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        contact: user.phoneNumber,
        address1: user.address.split(' ')[0], // Assuming the first part is address1
        address2: user.address.split(' ').slice(1).join(' '), // Assuming the rest is address2
        role: user.roleId.toString(), // Assuming roleId is a string in the form
      }}
      validationSchema={validationSchema}
      onSubmit={handleEditSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            {/* Similar structure as the creation form */}
            {/* ... (other form fields) */}
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              {/* Role Dropdown */}
              <InputLabel htmlFor="role" sx={{ gridColumn: "span 4", marginLeft: "12px" }}>Role</InputLabel>
              <Select
                fullWidth
                variant="filled"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>

            <Button type="submit" color="secondary" variant="contained">
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditUserForm;
