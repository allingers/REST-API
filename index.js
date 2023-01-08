import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js'; 

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', usersRoutes);

//First route
app.get('/', (req, res) => res.send("Hello!"));


//Express server körs
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

