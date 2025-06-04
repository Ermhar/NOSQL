const express = require('express');
const path = require('path');
const db = require('./firebase-config');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// CREATE - POST
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const docRef = await db.collection('users').add({ name, email });
    res.status(201).json({ id: docRef.id, name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - GET (all users)
app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - GET (single user)
app.get('/users/:id', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - PUT
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    await db.collection('users').doc(req.params.id).update({ name, email });
    res.status(200).json({ id: req.params.id, name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅Server running at http://localhost:${PORT}`);
});