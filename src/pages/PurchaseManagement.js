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
import PurchaseImg from '../assests/purchase.png';

import { getPurchases, addPurchase, deletePurchase } from '../api/purchaseApi';

import { Heading, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const PurchaseManagement = () => {
  const [purchases, setPurchases] = useState([]);
  const [purchaseData, setPurchaseData] = useState({
    customerId: '',
    medicineId: '',
    quantity: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  const fetchPurchases = async () => {
    try {
      const response = await getPurchases();
      setPurchases(response);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogTitle('Add New Purchase');
    setPurchaseData({
      customerId: '',
      medicineId: '',
      quantity: '',
    });
    setOpenDialog(true);
  };

  const handleAddPurchase = async () => {
    try {
      await addPurchase(purchaseData);
      setOpenDialog(false);
      fetchPurchases();
    } catch (error) {
      console.error('Error saving/updating purchases:', error);
    }
  };

  const handleDeletePurchase = async (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await deletePurchase(id);
        fetchPurchases();
      } catch (error) {
        console.error('Error deleting purchase:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData((prevPurchaseData) => ({
      ...prevPurchaseData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <Heading className="text-2xl text-center m-4 text-[#153448] font-bold">
          Purchase Management
        </Heading>
        <Button
          startIcon={<AddIcon onClick={handleDialogOpen} />}
          variant="text"
          color="primary"
        >
          Add Purchase
        </Button>
      </div>

      <div className="flex flex-wrap justify-around">
        {purchases.map((purchase, i) => (
          <Card
            maxw="md"
            className="shadow-lg w-72 m-4 h-96 rounded-md"
            key={`${purchase.id}-${i}`}
          >
            <Heading className="text-center bg-[#3C5B6F] text-white">
              Bill No: {purchase.id}
            </Heading>
            <img src={PurchaseImg} alt="Avatar" className="m-auto" />

            <Stack mt="6" spacing="3">
              <Text className="px-2">Customer Id: {purchase.customerId}</Text>
              <Text className="px-2">
                Customer Name: {purchase.customer.firstName}{' '}
                {purchase.customer.lastName}
              </Text>
              <Text className="px-2">Medicine Id: {purchase.medicineId}</Text>
              <Text className="px-2">
                Medicine Name: {purchase.medicine.name}
              </Text>
              <Text className="px-2">Quantity: {purchase.quantity}</Text>

              <Text className="px-2">
                Total :{' '}
                {Number(purchase.quantity) * Number(purchase.medicine.price)}
              </Text>
            </Stack>
            <div className="flex justify-between m-2">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeletePurchase(purchase.id)}
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
          <TextField
            autoFocus
            margin="dense"
            label="Customer Id"
            name="customerId"
            fullWidth
            value={purchaseData.customerId}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Medicine Id"
            name="medicineId"
            fullWidth
            value={purchaseData.medicineId}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            name="quantity"
            fullWidth
            value={purchaseData.quantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPurchase} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
