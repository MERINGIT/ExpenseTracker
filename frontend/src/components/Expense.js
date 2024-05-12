import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'; 

// Base URL for API requests
const BASE_URL = 'http://54.91.182.191:3001';

// Card component for displaying a single transaction
const TransactionCard = ({ transaction, onDelete, onOpenUpdateModal }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {transaction.text}
        </Typography>
        <Typography color="textSecondary">
          Amount: ${transaction.amount}
        </Typography>
        <Button size="small" onClick={() => onDelete(transaction.id)}>Delete</Button>
        <Button size="small" onClick={() => onOpenUpdateModal(transaction)}>Update</Button>
      </CardContent>
    </Card>
  );
};

function Expense() {
  const history = useHistory();
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ text: '', amount: '' });
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchTransactions();
    getUsernameFromLocalStorage(); // Fetch username from localStorage
  }, []);

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const userDataJSON = localStorage.getItem('userData');
      const userData = JSON.parse(userDataJSON);
      const userId = userData.id; 
      const response = await axios.get(`${BASE_URL}/expense/user/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch username from local storage
  const getUsernameFromLocalStorage = () => {
    const userDataJSON = localStorage.getItem('userData');
    const userData = JSON.parse(userDataJSON);
    if (userData && userData.username) {
      setUsername(userData.username); // Set the username state
    }
  };

  // Add a new transaction
  const addTransaction = async () => {
    try {
      if (!newTransaction.text.trim() || !newTransaction.amount) {
        alert('Please enter both text and amount for the transaction.');
        return;
      }
      const userDataJSON = localStorage.getItem('userData');
      const userData = JSON.parse(userDataJSON);
      const userId = userData.id; 

      const response = await axios.post(`${BASE_URL}/expense`, {
        ...newTransaction,
        userId: userId, // Append the userId to the newTransaction object
      });
      setTransactions([...transactions, response.data]);
      setNewTransaction({ text: '', amount: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expense/${id}`);
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Update a transaction
  const updateTransaction = async () => {
    try {
      if (!selectedTransaction || !selectedTransaction.text.trim() || !selectedTransaction.amount) {
        alert('Please enter both text and amount for the transaction.');
        return;
      }

      await axios.put(`${BASE_URL}/expense/${selectedTransaction.id}`, selectedTransaction);
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === selectedTransaction.id ? selectedTransaction : transaction
      );
      setTransactions(updatedTransactions);
      setSelectedTransaction(null);
      setOpenUpdateModal(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Open the update modal for a transaction
  const handleOpenUpdateModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenUpdateModal(true);
  };

  // Close the update modal
  const handleCloseUpdateModal = () => {
    setSelectedTransaction(null);
    setOpenUpdateModal(false);
  };

  // Calculate the total expenses
  const getTotalExpenses = () => {
    return transactions.reduce((total, transaction) => total + parseInt(transaction.amount), 0);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Remove user data from local storage
    history.push('/'); // Redirect to the sign-in page
  };

  return (
    <div style={{display: "flex", flexDirection: "row", width: '100%'}}>
      <div>
       <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
        <h1>Expense Tracker</h1>
      <div className="username">
        {/* Display the username in the top right corner */}
        <Typography variant="h6" component="div">
          {username && `Welcome, ${username}!`}
        </Typography>
      </div> 
        </div>
        <div>
        </div>
        </div> 

      <div>
        <h3>Expenses</h3>
        {transactions.map(transaction => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
            onOpenUpdateModal={handleOpenUpdateModal}
          />
        ))}
      </div>
      <div className="total-expenses">
        <p>Total Expenses: ${getTotalExpenses()}</p>
      </div>
      <Button variant="contained"  onClick={handleLogout} style={{marginTop: '15%'}}>Logout</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: "column",  marginLeft: '40%', marginTop: '50px'}}>
        <h3>Add New Expense</h3>
        <TextField
          label="Enter text..."
          value={newTransaction.text}
          onChange={(e) => setNewTransaction({ ...newTransaction, text: e.target.value })}
          fullWidth
          size="small"
          sx={{ width: '150px', marginBottom: '10px' }}
        />
        <TextField
          label="Enter amount..."
          type="number"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          fullWidth
          size="small"
          sx={{ width: '150px', marginBottom: '10px' }}
        />
        <Button variant="contained" onClick={addTransaction}>Add Expense</Button>
      </div>
     


      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>Update Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details of the selected transaction.
          </DialogContentText>
          <TextField
            label="Text"
            value={selectedTransaction ? selectedTransaction.text : ''}
            onChange={(e) => setSelectedTransaction({ ...selectedTransaction, text: e.target.value })}
            fullWidth
            size="small"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Amount"
            type="number"
            value={selectedTransaction ? selectedTransaction.amount : ''}
            onChange={(e) => setSelectedTransaction({ ...selectedTransaction, amount: e.target.value })}
            fullWidth
            size="small"
            sx={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal}>Cancel</Button>
          <Button onClick={updateTransaction} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Expense;
