const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import UUID

const app = express();
const port = 2997;


// Endpoint untuk menghitung jumlah data

// Endpoint untuk menghasilkan UUID
app.post('/ms-auth/login', (req, res) => {
    
    res.json({ 
               "status": "success",
               "code": 200,
               "data" : {"username": "", "created_at": "" },
               "auth": "success"
            });
});

app.listen(port, () => {
    console.log(`Server Auth Runing di http://localhost:${port}`);
});
