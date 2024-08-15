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
import MedicineImg from '../assests/medicine.png';

import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
} from '../api/medicineApi';

import { format } from 'date-fns';
import { Heading, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [medicineData, setMedicineData] = useState({
    name: '',
    brand: '',
    description: '',
    price: 0,
    quantityInStock: 0,
    expiryDate: '',
    manufacturedDate: '',
    batchNumber: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogTitle('Add New Medicine');
    setMedicineData({
      name: '',
      brand: '',
      description: '',
      price: 0,
      quantityInStock: 0,
      expiryDate: '',
      manufacturedDate: '',
      batchNumber: '',
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleAddMedicine = async () => {
    try {
      if (editMode) {
        await updateMedicine(selectedMedicineId, medicineData);
      } else {
        await addMedicine(medicineData);
      }
      setOpenDialog(false);
      fetchMedicines();
    } catch (error) {
      console.error('Error saving medicines:', error);
    }
  };

  const handleUpdateMedicine = async (id) => {
    try {
      const response = await getMedicineById(id);
      setMedicineData(response);
      setDialogTitle('Update Medicine');
      setEditMode(true);
      setSelectedMedicineId(id);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching medicine for editing:', error);
    }
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prevMedicineData) => ({
      ...prevMedicineData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <Heading className="text-2xl text-center m-4 text-[#153448] font-bold">
          Medicine Management
        </Heading>
        <Button
          startIcon={<AddIcon onClick={handleDialogOpen} />}
          variant="text"
          color="primary"
        >
          Add Medicine
        </Button>
      </div>

      <div className="flex flex-wrap justify-around">
        {medicines.map((medicine, i) => (
          <Card
            maxW="md"
            className="shadow-lg w-72 m-4 h-96  rounded-md"
            key={`${medicine.id}-${i}`}
          >
            <Heading className="text-center bg-[#3C5B6F] text-white">
              {medicine.name}
            </Heading>
            <img src={MedicineImg} alt="Avatar" className="m-auto" />

            <Stack mt="6" spacing="3">
              <Text className="px-2">Brand: {medicine.brand}</Text>
              <Text className="px-2">Description: {medicine.description}</Text>
              <Text className="px-2">Price: {medicine.price}</Text>
              <Text className="px-2">
                Quantity In Stock: {medicine.quantityInStock}
              </Text>
              <Text className="px-2">
                Expiry Date: {format(medicine.expiryDate, 'MM-dd-yyyy')}
              </Text>
              <Text className="px-2">
                Manufactured Date:{' '}
                {format(medicine.manufacturedDate, 'MM-dd-yyyy')}
              </Text>
              <Text className="px-2">Batch Number: {medicine.batchNumber}</Text>
            </Stack>
            <div className="flex justify-between m-2">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleUpdateMedicine(medicine.id)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteMedicine(medicine.id)}
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
              value={medicineData.id || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={medicineData.name}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Brand"
            name="brand"
            fullWidth
            value={medicineData.brand}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={medicineData.description}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            value={medicineData.price}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Quantity In Stock"
            name="quantityInStock"
            fullWidth
            value={medicineData.quantityInStock}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            disabled={editMode}
            margin="dense"
            label="Expiry Date"
            name="expiryDate"
            fullWidth
            value={medicineData.expiryDate}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            disabled={editMode}
            margin="dense"
            label="Manufactured Date"
            name="manufacturedDate"
            fullWidth
            value={medicineData.manufacturedDate}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            disabled={editMode}
            margin="dense"
            label="Batch Number"
            name="batchNumber"
            fullWidth
            value={medicineData.batchNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMedicine} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
