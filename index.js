const express = require('express');
const mongoose  = require('mongoose'); ///compulsory to include for mongodb connections
const studentSchema = require('./models/studentsModel'); //schema(structure) of the mongodb table in cloud
const HelperFunctions  = require('./helperFunctions');
const cors = require('cors'); //Cross-Origin Resource Sharing()
const path = require('path');  //including for sending html file to show error on line no 49
const methods = new HelperFunctions(); //helper file to extract error and display value in place of error

app = express();
app.use(cors());
mongoose.set('strictQuery', true);
app.use(express.json()) // To parse the incoming json data; the data is attached to the req.body object after parsing.


const URL = "mongodb+srv://user:pranav2001@cluster0.gupbjvj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL)
.then(res => console.log('Connected to database!'))
.catch(err => console.log('ERROR connecting to database...'));


// CREATE
app.post('/addNewRecord', methods.validate, (req, res) => {
    const {name, surname, contact, dept} = req.body;
    console.log(name, surname, contact, dept);
    const database = studentSchema();// Initalizing object of schema "studentSchema"
    database.name = name;
    database.department = dept;
    database.contact = contact;
    database.surname = surname;

    database.save((error) => {
        if (error){
            res.status(500).json({message: "Internal server error!❌"}).end();
        } else {
            res.status(200).json({message: "Data added successfully!✅"}).end();
        }
    })
})

// READ
app.post('/getData',methods.validate, (req, res) => {
    const {type, name } = req.body;
    console.log(type, name);
    if (type == "single"){
        studentSchema.findOne({name: name}, (error, data) => {
            if (error){
                res.sendFile(path.join(__dirname, 'error.html'))
            } else {
                res.type('html').send({message: data});
            }
        })
    } else {
        studentSchema.find({}, (error, data) => {
            if (error){
                res.status(500).json({message: errMessage}).end();
            } else {
                res.status(200).json({message: data}).end();
            }
        } )
    }
})

// UPDATE
app.patch('/updateRecord', methods.validate,  (req, res) => {
    const { id, field, data } = req.body;
    studentSchema.findOneAndUpdate({name: id}, {[field]: data}, (error, data) => {
        if (error){
            res.status(500).json({message: errMessage}).end();
        } else {
            res.status(200).json({message: "Data updated successfully!✅"}).end();
        }
    })
})

// DELETE 
app.delete('/delete', methods.validate, (req, res) => {
    const {type, name} = req.body;
    if (type == "single"){
        studentSchema.deleteOne({name: name}, (error, status) => {
            if (error){
                res.status(500).json({message: errorMessage}).end();
                
            } else {
                res.status(200).json({message: status.acknowledged}).end();
            }
        })
    } else {
        studentSchema.deleteMany({},(error, status) => {
            if (error){
                res.status(500).json({message: errorMessage}).end();
                
            } else {
                res.status(200).json({message: status.acknowledged}).end();
            }
        } )
    }
})

app.get('/', (req, res)=>{
    res.type('html').send('<h1>Server is running</h1>');
})

app.listen(4000, () => {
    console.log('Active on port 4000');
})