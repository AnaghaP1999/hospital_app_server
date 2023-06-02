const express = require('express');
const fs = require('fs');
const api = require('./routes/sample');
require('dotenv').config();
const app = new express();
app.use('/api',api);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
