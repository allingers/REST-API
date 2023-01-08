
import express from 'express';
import { v4 as uuidv4 } from 'uuid'; //Ger unikt id till varje användare 
import fs from 'fs';

const router = express.Router();

//GET - hämtar alla användare
router.get('/', (req, res) => {
    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Error! - Filen du söker hittas inte")
        }

        const users = JSON.parse(data)
        
        res.send(users);
        return;
    });
});

//POST - lägg till användare
router.post('/', function(req, res){

    fs.readFile("users.json", function(err, data){
        if(err){
            console.log(err);
        }

        let users = JSON.parse(data)

        let newUser= req.body;

        if(!req.body.firstName) {
            res.status(404).send("Error - Det gick inte att lägga till användaren.");
        } else {

        users.push({ ...newUser, id: uuidv4()}); //Får ett unikt id

        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
            if(err){
                console.log(err);
            }
        })

        res.status(201).json({"Message":`Ny användare tillagd!`});
        return;
        }
    });
});

//GET - hämta specifik användare med id
router.get('/:id', (req, res) => {

    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Error! - Filen du söker hittas inte")
        }

    let users = JSON.parse(data)

    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if(!foundUser) res.status(404).send("Error - Användare kunde inte hittas, vänligen testa med ett annat id");
        
    res.send(foundUser);
    });
});

//DELETE - radera en specifik användare
router.delete('/:id', (req, res) => {

    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Error! Filen du söker hittas inte")
        }

    let users = JSON.parse(data)

    const { id } = req.params;

    let user = users.find((user) => user.id === id);
  
    if(!user) {
        res.status(404).send("Error - id saknas, användare kunde inte raderas eftersom id saknas");
    } else {
        users = users.filter((user) => user.id !== id);

        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){

            if(err){
                console.log(err);
            }
        });

        let jsonData = {"Message":"Användare är nu raderad"}
        res.json(jsonData);
        }
    });
});

//PATCH - ändra/uppdatera en användares uppgifter
router.patch('/:id', (req, res) => {

    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Error! - Filen du söker hittas inte")
        }

    let users = JSON.parse(data)

    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(!user) res.status(404).send("Användaren hittas inte");
    
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
        if(err){
            console.log(err);
        }
    })

    let jsonData = {
        "User" : user,
        "Message":"Användaren är nu uppdaterad!"
    }

    res.json(jsonData);
    });
});

export default router;