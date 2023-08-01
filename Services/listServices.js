const listModel = require('../Model/listModel.js')

exports.getAllItems = (req,res)=>{
    listModel.find()
    .then(item =>{
        res.json({
            message:'All items have been returned',
            data:item,
            length: item.length
        })
    })
    .catch(err => {
        res.status(404).json({
            message:"Failed to return all items",
            error:err
    })
})
}


exports.getAnItem = (req,res)=>{
    listModel.findById(req.params.id)
     .then((item)=>{
        res.json({
            message:`item id: ${req.params.id} has been returned`,
            data:item
        })
     })
     .catch(err=>{
        res.status(404).json({
            message:`Failure to return item`,
            error:err
        })
     })
}

exports.AddAnItem = (req,res) => {
    
    const newItem = new listModel(req.body)

    newItem.save()
        .then((item)=>{
            if(item){
                res.json({
                    message:"Item was created",
                    body:item
           
            })
        }
        else {

            res.status(404).json({
                message:"error occured "
            })

        }

        })
        .catch(err=>{
            res.status(500).json({
                message:'New Item could not be created'
            })
        })
}

exports.deleteAnItem = (req,res)=>{

    listModel.findByIdAndDelete({_id:req.params.id})
        .then((item)=>{
            res.json({
                message:`item ${req.params.id} is deleted`,
                data:item
            })
        })
        .catch(err =>{
            res.status(404).json({
                message:`Error occured while trying to delete item ${req.params.id}`,
                error: err
            })

        })
}

exports.updateAnItem = (req,res) =>{
    const update = req.body
    listModel.findByIdAndUpdate(req.params.id,update,{new:true})
        .then((item)=>{
            res.json({
                message:`Item ${req.params.id} updated`,
                data:item
            })
        })
        .catch(err =>{
            res.status(404).json({
                message:'Error occured while updating item',
                error:err
            })
        })
}