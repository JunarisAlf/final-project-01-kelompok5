const Reflection = require('../models/Reflection');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { emptyQuery } = require('pg-protocol/dist/messages');

class ReflectionController {
    static async create(req, res, next) {
        const {succes, low_point, take_away} = req.body;
        const id = uuidv4();
        try{
            // Agar request tidak kosong
            if (!Object.keys(req.body).length) throw Error('Request Kosong');
            const addData = await Reflection.addReflection(id, succes, low_point, take_away, req.user.id);
            if(addData.succeed == true){
                res.status(201).json(addData.data);
            }
        }catch(err){
            next(err) //internal server error
        }
    }
    static async find(req, res, next) {
        try{
            const getData = await Reflection.getReflections(req.user.id);
            if(getData.succeed == true){
                const { data } = getData;
                res.status(200).json({
                    data
                });
            }
        }catch(err){
            next(err) //internal server error
        }
    }
    
    static async update(req, res, next) {
        const {succes, low_point, take_away} = req.body;
        try {
            if (!Object.keys(req.body).length) throw Error('Request Kosong');
                const updateData = await Reflection.updateReflections(succes, low_point, take_away, req.params.id);
                if(updateData.succeed == true){
                    const { data } = updateData;
                    res.status(201).json({data,message: "reflections updated"});
                }
        }catch(err){
            next(err) //internal server error
        }
    }

    static async delete(req, res, next) {
        try{
            const deleteData = await Reflection.deleteReflections(req.params.id);
            if(deleteData.succeed == true){
                const { data } = deleteData;
                res.status(200).json({data,message: "reflection deleted"});
            } 
        } catch(err){
            next(err) //internal server error
        }
    }
}

module.exports = ReflectionController;