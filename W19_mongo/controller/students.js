const students = require('../models/student');

module.exports.addstudent = async (req,res) =>{
    try{
        const {Name,Roll_No,WAD_Marks,CC_Marks,DSBDA_Marks,CNS_Marks,AI_marks} = req.body;
        console.log(req.body)
        if(!Name || !Roll_No || !WAD_Marks || !CC_Marks || !DSBDA_Marks || !CNS_Marks || !AI_marks){
            return res.status(400).json({message: "Please fill all the fields"})
        }

        const student = new students({
            Name,
            Roll_No,
            WAD_Marks,
            CC_Marks,
            DSBDA_Marks,
            CNS_Marks,
            AI_marks
        })

        await student.save();

        res.status(201).json(student)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}