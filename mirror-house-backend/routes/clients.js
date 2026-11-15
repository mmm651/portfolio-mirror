const express= require('express');
const router= express.Router();
const fs= require('fs').promises;
const path= require('path');


const dataFilePath=path.join(__dirname,'../data/client.json');
async function getclients(){
    try{
        const data =await fs.readFile(dataFilePath,'utf8');
        return JSON.parse(data);

    } catch(err){
       return {
            sectionTag: "OUR CLIENTS",
            trustedLabel: "Trusted Globally",
            title: "Partnerships built on shared vision.",
            clientsList: [
                { id: 1, name: "Solstice", category: "FINTECH" },
                { id: 2, name: "Aurelia", category: "BOTANICALS" },
                { id: 3, name: "Kanso", category: "ARCHITECTURE" },
                { id: 4, name: "Vespera", category: "HOSPITALITY" }
            ],
            testimonial: {
                quote: "mirror-house transformed our platform into an effortless, luminous experience our customers love.",
                author: "Nadia Al-Mansoor, CPO at Solstice"
            }
    };
}
}// get
route.get('/',async(req,res)=>{
    const clientData= await getclients();
    res.json(clientsData);
});

//headers
 router.patch('/',async(req,res)=>{
    try{
        const currentData =await getclients();
        const updatedData ={...currentData,...req.body};
        await fs.writeFile(dataFilePath,JSON.stringify(updatedData,null,2),'utf8');
        res.json({ message: 'Clients section updated successfully!', data: updatedData });}
    catch(err){
        res.status(500).json({error:'failed to update '})
    }
 });

 // elcard
 router.patch('/card/:id',async(req,res)=>{
    try{
       const clientId = parseInt(req.params.id);
        const currentData = await getclients();

        const clientIndex = currentData.clientsList.findIndex(c => c.id === clientId);
        if (clientIndex=== -1){
            return res.status(404).json({error:'client card not found'});
        }
        currentData.clientsList[clientIndex]={
            ...currentData.clientsList[clientIndex],...req.body
        };
        await fs.writeFile(dataFilePath,JSON.stringify(currentData,null,2),'utf8');
        res.json({
            message: `Client card ${clientId} updated successfully!`,
            client: currentData.clientsList[clientIndex]
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update client card' });
    }
 });

 module.exports =router;