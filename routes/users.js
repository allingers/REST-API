
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = express.Router();


//GET
router.get('/', (req, res) => {
    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("ERROR. FILEN KUNDE INTE HITTAS")
        } else {

        const users = JSON.parse(data)
        console.log(data);
        
        res.send(users);
        }
        return;
    });
});

//POST
router.post('/', function(req, res){
    fs.readFile("users.json", function(err, data){
        if(err){
            console.log(err);
        }

        const users = JSON.parse(data)
        let user = req.body;

        if(!req.body) {
            res.status(404).send("Det gick inte att lägga till användare, försök igen.");
        } else {

        users.push({ ...user, id: uuidv4()}); //Får ett unikt id
        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
            if(err){
                console.log(err);
            }
        })

        res.status(201).json({"Message":"Ny användare tillagd"});
        return;
        }
    });
});
/*
router.post('/', (req, res) => {
        fs.readFile("users.json", function(err, data){
        if(err){
            console.log(err);
        }
    const user = req.body;

    users.push({...user, id:  uuidv4() });

    res.send(`user with the name ${user.firstName} added`); 
});*/


//FIND USER WITH ID
router.get('/:id', (req, res) => {

    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Filen du försöker nå finns inte")
        }

    const users = JSON.parse(data)

    const { id } = req.params;

    const foundUser = users.find((user) =>user.id === id);

    if(!foundUser) res.status(404).send("Användaren du försöker hitta finns inte");
        
    res.send(foundUser);
    });
});

//DELETE
router.delete('/:id', (req, res) => {

    fs.readFile("users.json", function (err, data){

        if(err){
            console.log(err);
            res.status(404).send("Filen du försöker nå finns inte")
        }

    let users = JSON.parse(data)

    const { id } = req.params;

    const user = users.find((user) => user.id === id);
  
    if(!user) {
        res.status(404).send("Error - id saknas, användaren kan inte raderas");
    } else {
        users = users.filter((user) => user.id !== id);

        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){

            if(err){
                console.log(err);
            }
        });

        let jsonData = {"Message":"Raderad"}
        res.json(jsonData);
        }
    });
});
export default router;

