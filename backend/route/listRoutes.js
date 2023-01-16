//dependency 
const express = require('express');
const router = express.Router();
const listSchema = require('../model/cardList');

//post request add list 
router.post('/add' ,async (req,res) =>{
    //getting the data in
    let list = new listSchema({
        name: req.body.name,
        userId: req.body.userId,
        projectId: req.body.projectId,
        cards: []
    });
    
    //saving to mongo DB 
    const savedList = await list.save();
    res.json(savedList);
});

router.put('/:id', async (req, res) => {

    if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
    } 
    
    const data = await listSchema.updateOne(req.params.id, req.body);
    await res.json({ 'list': data });
});

//finally get 
router.get('/:id' , async (req,res)=>{
        
    if (!req.headers['access-token']) {
        return res.status(403).json({ 'msg' : 'No credentials sent!' });
    } 
    
    const data = await listSchema.findById(req.params.id); 
    //console.log(decoded);
    await res.json({'list': data.email});
});

//export the routes
module.exports = router;

