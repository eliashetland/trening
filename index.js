const express = require('express');
const fs = require('fs');
// const nedb = require('nedb');

const program = JSON.parse(fs.readFileSync('program.json'));

console.log(program);

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, ()=> console.log(`listening at port ${port}`));
app.use(express.static('public'));


app.get('/add/:muscleGroup/:exercise/:description?', (req, res)=>{
    let muscleGroup = req.params.muscleGroup;
    let exercise = req.params.exercise;
    let description = req.params.description;
    
    let reply;
    if (!description){
        reply = {
            msg: "exercise is required"
        }
        res.send(reply);
    }else{
  
        program[muscleGroup][exercise] = {
            "head": exercise,
            "body": description,
            "img": "300.png"
        };


        fs.writeFile('program.json', JSON.stringify(program, null, 2), ()=>{
            reply = {
                msg: "thanks for submitting",
                status: "sucess",
                muscleGroup: muscleGroup,
                exercise: exercise,
                description: description
            }
            res.send(reply);
            
        });

    }

});



app.get('/all', (req,res)=>{
    res.send(program);
})



// app.get('/search/:muscleGroup/:Exercise?', (req, res) => {
//     let muscleGroup = req.params.muscleGroup;
//     let reply;
//     if(program[muscleGroup]){
//         reply = {
//             status: "found",
//             muscleGroup: muscleGroup,
//             exercise: program[muscleGroup]
//         }
//     }else{
//         reply = {
//             status: "not found",
//             muscleGroup: muscleGroup
//         }
//     }
    


//     res.send(reply);
// })