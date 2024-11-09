import { userModel } from "../models/userModel.js";


const getHandler = async (req,res) => {
    try {
        const data = await userModel.find()
        res.send(data)
    } catch (error) {
        console.log('error in getHandler ==========',error)
    }
}

const getByIdHandler = async (req,res) => {
    try {
        const data = await userModel.findById(req.params.id)
        res.send(data)
    } catch (error) {
        console.log('error in getHandler ==========',error)
    }
}

const deleteHandler = async (req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.send('data is deleted')
    } catch (error) {
        console.log('error in getHandler ==========',error)
    }
}

const postHandler = async (req,res) => {
    const { name, email, password } = req.body;
        try {
             await userModel.create({     // it can save also so no need of data.save() method
                name : name,
                email: email,
                password: password,
            }) 
            console.log('successfull  ======')
            res.send('successfull  ======')
        } catch (error) {
            console.log('data not post =======',error)        
        }
}
const putHandler = async (req,res) => {
    const { name, email, password } = req.body;
    const {id} = req.params
        try {
             await userModel.findByIdAndUpdate(id,{     
                name : name,
                email: email,
                password: password,
            },{new:true}) 
            console.log('successfull  ======')
            res.send('successfull  ======')
        } catch (error) {
            console.log('data not post =======',error)        
        }
}


export {postHandler, getHandler, getByIdHandler, deleteHandler, putHandler }