const express = require('express');
const router = express.Router();

const app = express();

const port = 3000

app.get('/', (req, res) => {
  res.send('root endpoint');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})