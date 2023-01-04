import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello from homePage.'));


app.listen (PORT, () => console.log(`Server är igång: http://localhost:${PORT}`));
