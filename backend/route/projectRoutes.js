//dependency 
const express = require('express');
const router = express.Router();
const project = require('../model/project');

//post request add project 
router.post('/add' ,async (req,res) =>{
    //getting the data in
    let proj = new project({
        name: req.body.name,
        userId: req.body.userId
    });
    
    //saving to mongo DB 
    const savedProject = await proj.save();
    res.json(savedProject);
});

//finally get 
router.get('/:id' , async (req,res)=>{
        
    if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
    } 
    
    const data = await project.findById(req.params.id); 
    //console.log(decoded);
    await res.json({'project': data.email});
});

//export the routes
module.exports = router;

