const e = require("express");
const express = require("express");
const app = express();

const PORT = 5000;
app.use(express.json())
const movies =[
    { id:0 , name:"HI0", isFav: false, isDeleted:true},
    { id:1 , name:"HI1", isFav: false, isDeleted:false},
    { id:2 , name:"HI2", isFav: true, isDeleted:false},
    { id:3 , name:"HI3", isFav: false, isDeleted:false},
    { id:4 , name:"HI4", isFav: true, isDeleted:false}
]
 
//get all movies
app.get("/allMovies", (req, res) => {
            res.status(200)
            res.json(movies)
});

// 1: Get All Movies = isDEleted = false
app.get("/movies", (req, res) => {
    const found = movies.filter(elem => elem.isDeleted ===false);
    if (found) {
      res.status(200);
      res.json(found);
    }
  });

  // 2: Search by id
  app.get("/searchById/:id", (req, res) => {
    const {id }= req.params;
    const arr = movies.find(elem=> elem.id == id);
    console.log(arr);
    if (arr) {
      res.status(200);
      res.json(arr);
      
    } else {
      res.status(404);
      res.json("Task is not found");
    }
  });



// 3: Create new movie
app.post("/create", (req, res) => {
    const { id,name, isFav ,isDeleted} = req.body;
const newId = movies.length -1
    movies.push({ newId,name, isFav, isDeleted });
    res.status(201),
    res.json({ newId ,name, isFav, isDeleted });
  });

  // 4: Update movie by id
app.put("/updateByID/:id",(req,res)=>{
    const id = req.params.id;
    const {name} =req.body;
    console.log(name);
    movies.forEach((elem)=>{
        if(elem.id === Number(id)){
            elem.name =name
            res.status(200).json(movies);
        }
    })   
    res.status(404).json("Task is not found");
})

  // 5: Soft deleted movie by id
app.delete("/softDeleteByID/:id", (req, res) => {
    const {id} = req.params;
    movies.forEach((elem,i)=>{ 
        if(elem.id === Number(id)){
            elem.isDeleted = true
            res.status(200).json(movies);
       }
    })

  });
  // 6: Get All Movies = isDEleted = false
app.get("/favorite", (req, res) => {
    const found = movies.filter(elem => elem.isFav ===true);
    if (found) {
      res.status(200).json(found);
    }
  });

  // 7: Data from file & write to file 
////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
  });