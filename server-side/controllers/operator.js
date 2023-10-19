const {Models} = require('../models');

const getOperator = async(request,reply)=>{
    const {operatorId} = request.params;

    try {
        const operator = await Models.operator.findOne({
            where:{
                operatorId: operatorId
            }
        });

        if(!operator){
            return reply('Error in getting operator').code(401);
        }

        return reply(operator).code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal server error').code(500);
    }
}

const createOperator = async (request,reply)=>{
    const operatorDetails = request.payload;

    try {
        const newOperator = await Models.Operator.create(operatorDetails);

        if(!newOperator){
            return reply('Error in creating Operator!').code(401);
        }

        return reply('Created Operator Successfully').code(201);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const updateOperator = async(request,reply)=>{
    const updatedDetails = request.payload;
    const {operatorId} = request.params;
    try {
        const operator = await Models.Operator.findOne({
            where:{
                operatorId: operatorId
            }
        });

        if (!operator) {
            return reply('Operator does not exist').code(401);
        }
        
        const updatedOperator = await Models.Operator.update(
            updatedDetails,
            {
                where: {
                    operatorId: operatorId
                }
            }
        );
        
        if(!updatedOperator){
            return reply('Error updating Operator').code(401);
        }
        return reply('Operator details updated successfully').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
};

const deleteOperator = async(request,reply)=>{
    const {operatorId} = request.params;
    try {
        const operator = await Models.Operator.findOne({
            where:{
                operatorId: operatorId
            }
        });

        if (!operator) {
            return reply('Operator does not exist').code(401);
        }

        const deletedOperator = await Models.Operator.destroy({
                where: {
                    operatorId: operatorId
                }
            }
        );
        if(!deletedOperator){
            return reply('Error deleting Operator').code(401);
        }
        return reply('Operator details deleted').code(200);
    } catch (error) {
        console.log(error);
        return reply('Internal Server Error').code(500);
    }
}

module.exports = {
    getOperator,
    createOperator,
    updateOperator,
    deleteOperator
}