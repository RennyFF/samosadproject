const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require("cors");
import fs from 'fs';
app.use(bodyParser.json(), cors());
app.get('/api/dataUser', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(process.cwd()+'/server/tmp/users.json')));
});
app.get('/api/dataMarks', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(process.cwd()+'/server/tmp/marks.json')));
});
app.post('/api/saveUser', (req, res) => {
    const user = req.body;
    const jsonData = JSON.stringify(user, null, " ");
   fs.writeFileSync(process.cwd()+'/server/tmp/users.json', jsonData, (error)=>{
        if (error) {
            console.error(error);
            throw error;
        }
    })
    res.json({ message: 'User saved successfully!' });
});
app.post('/api/saveMark', (req, res) => {
    const mark = req.body;
    const jsonData = JSON.stringify(mark, null, " ");
    fs.writeFileSync(process.cwd()+'/server/tmp/marks.json', jsonData, (error)=>{
        if (error) {
            console.error(error);
            throw error;
        }
    })
    res.json({ message: 'Mark saved successfully!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));