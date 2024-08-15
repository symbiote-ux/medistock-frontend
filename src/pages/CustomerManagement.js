import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomerImg from '../assests/customer2.png';

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} from '../api/customerApi';

import { format } from 'date-fns';
import { Heading, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogTitle('Add New Customer');
    setCustomerData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleAddCustomer = async () => {
    try {
      if (editMode) {
        await updateCustomer(selectedCustomerId, customerData);
      } else {
        await addCustomer(customerData);
      }
      setOpenDialog(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleUpdateCustomer = async (id) => {
    try {
      const response = await getCustomerById(id);
      setCustomerData(response);
      setDialogTitle('Update Customer');
      setEditMode(true);
      setSelectedCustomerId(id);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching customer for editing:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <Heading className="text-2xl text-center m-4 text-[#153448] font-bold">
          Customer Management
        </Heading>
        <Button
          startIcon={<AddIcon onClick={handleDialogOpen} />}
          variant="text"
          color="primary"
        >
          Add Customer
        </Button>
      </div>

      <div className="flex flex-wrap justify-around">
        {customers.map((customer, i) => (
          <Card
            maxW="md"
            className="shadow-lg w-72 m-4 h-82  rounded-md"
            key={`${customer.firstName}-${i}`}
          >
            <Heading className="text-center bg-[#3C5B6F] text-white">
              {customer.firstName} {customer.lastName}
            </Heading>
            <img src={CustomerImg} alt="Avatar" className="m-auto" />

            <Stack mt="6" spacing="3">
              <Text className="px-2">Email: {customer.email}</Text>
              <Text className="px-2">Phone: {customer.phoneNumber}</Text>
              <Text className="px-2">Address: {customer.address}</Text>
              <Text className="px-2">
                DOB: {format(customer.dateOfBirth, 'MM-dd-yyyy')}
              </Text>
            </Stack>
            <div className="flex justify-between m-2">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleUpdateCustomer(customer.id)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteStudent(customer.id)}
                style={{ marginLeft: '1rem' }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {editMode && (
            <TextField
              disabled
              margin="dense"
              label="ID"
              name="id"
              fullWidth
              value={customerData.id || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          )}

          <TextField
            autoFocus
            margin="dense"
            label="First name"
            name="firstName"
            fullWidth
            value={customerData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last name"
            name="lastName"
            fullWidth
            value={customerData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={customerData.email}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone number"
            name="phoneNumber"
            fullWidth
            value={customerData.phoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={customerData.address}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Date of birth"
            name="dateOfBirth"
            fullWidth
            defaultValue={
              customerData.dateOfBirth
                ? format(customerData.dateOfBirth, 'MM-dd-yyyy')
                : ''
            }
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
