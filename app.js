const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Shobhit Ji. Padhariye hamare desh va!');
});

app.listen(3001, () => console.log('App running on port 3001'));
