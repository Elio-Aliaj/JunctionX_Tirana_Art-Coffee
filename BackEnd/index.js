// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware (optional)
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/hello', (req, res) => {
    res.send('Hello, World!222222');
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
