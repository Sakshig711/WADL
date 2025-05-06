const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.use(bodyparser.json())

mongoose.connect("mongodb://localhost:27017/Student").then(()=>{
    console.log("mongo connected");
    
}).catch((error)=>{
    console.log(error);
    
})

const Schema = new mongoose.Schema({
    Name : {
        type : String
    }, 
    Roll_No : {
        type : Number

    }, 
    WAD_Marks : {
        type : Number

    }, 
    CC_Marks : {
        type : Number

    },
    DSBDA_Marks : {
        type : Number

    },
    CNS_Marks : {
        type : Number

    },
    AI_marks : {
        type : Number
    }
})

const Student = mongoose.model('Student',Schema);

// c
app.get("/add-data",async(req,res)=>{
    const student = [
        {
            Name: 'ABC',
            Roll_No: 111,
            WAD_Marks: 25,
            CC_Marks: 25,
            DSBDA_Marks: 25,
            CNS_Marks: 25,
            AI_marks: 25,
        },
        {
            Name: 'DEF',
            Roll_No: 112,
            WAD_Marks: 15,
            CC_Marks: 20,
            DSBDA_Marks: 15,
            CNS_Marks: 30,
            AI_marks: 20,
        },
    ]

    await Student.insertMany(student);
    res.send("added data successfully")
})

//d

app.get("/count",async(req,res)=>{
    try{

        const count = await Student.countDocuments();
        const stud = await Student.find();

        res.send(
           ` <html>
                <head>
                    <title>Student catalog</title>
                </head>
                <body>
                    <h1>COUNT is ${count}</h1>
                    <table border = '1'>
                        <tr>
                            <th>Name</th>
                            <th>Roll_No</th>
                            <th>WAD_Marks</th>
                            <th>
                            DSBDA_Marks 
                            </th>
                        </tr>
                        ${stud.map(student=>
                            `<tr>
                                <td>
                                    ${student.Name}
                                </td>
                                <td>
                                    ${student.Roll_No}
                                </td>
                                <td>
                                    ${student.WAD_Marks}
                                </td>
                            </tr>`
                            
                        ).join('')
                    }
                </table>

                </body>
            </html>
            `
        )



    }
    catch(error)
    {
        console.log(error);
        
    }
})

app.get("/dsbda-greater-than-20",async(req,res)=>{

    try{
        const students = await Student.find({DSBDA_Marks : {$gt:20}}, 'Name');
        res.send(students);
    }
    catch(err){
        console.log(err);
    }
})

app.put("/update/:studid",async(req,res)=>{
    try{        
        const studId = req.params.studid;
        await Student.findByIdAndUpdate(studId, {DSBDA_Marks:20});
        res.send("updated")
    }
    catch(err)
    {
        console.log(err);
        
    }
})

app.get('/marks-greater-than-25', async (req, res) => {
    try {
        const students = await Student.find(
            { WAD_Marks: { $gt: 25 }, CC_Marks: { $gt: 25 }, DSBDA_Marks: { $gt: 25 }, CNS_Marks: { $gt: 25 }, AI_marks: { $gt: 25 } },
            'Name'
        );
        res.send(students);
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});
app.get('/less-than-40', async (req, res) => {
    try {
        const students = await Student.find(
            
                
                    { WAD_Marks: { $lt: 40 } , DSBDA_Marks: { $lt: 40 },CNS_Marks: { $lt: 40 },AI_marks: { $lt: 40 }},
            
            'Name'
        );
        res.send(students);
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});

app.delete('/remove-student', async (req, res) => {
    try {
        const { rollNo } = req.body;
        await Student.deleteOne({ Roll_No: rollNo });
        res.send('Student removed');
    } catch (err) {
        return res.status(500).send('Error deleting student');
    }
});



app.listen(2000,()=>{
    console.log("server is runnign on port 3000");
    
})