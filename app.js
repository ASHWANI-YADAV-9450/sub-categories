const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/database');
const productRoutes = require('./routers/productRouter');
require('dotenv').config(); // Load .env
const cors = require('cors');
app.use(cors());


connectDB();
app.use(express.json());

app.use(express.static('public'));


app.get('/status', (req, res) => {
  res.send('API is running...');

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Routes

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
