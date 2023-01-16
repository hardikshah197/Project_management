//dependency 
const express = require('express');
const router = express.Router();
const cardSchema = require('../model/card');

//post request add list 
router.post('/add' ,async (req,res) =>{
    //getting the data in
    let list = new cardSchema({
        name: req.body.name,
        userId: req.body.userId,
        projectId: req.body.projectId,
        listId: req.body.listId,
    });
    
    //saving to mongo DB 
    const savedList = await list.save();
    res.json(savedList);
});

router.put('/:id', async (req, res) => {

    if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
    } 
    
    const data = await cardSchema.updateOne(req.params.id, req.body);
    await res.json({ 'list': data });
});

//finally get 
router.get('/:id' , async (req,res)=>{
        
    if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
    } 
    
    const data = await cardSchema.findById(req.params.id); 
    //console.log(decoded);
    await res.json({'list': data.email});
});

//export the routes
module.exports = router;

