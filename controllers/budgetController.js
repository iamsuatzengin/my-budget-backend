const Budge = require('../model/Budge')


const getAllTransaction = async (req, res) => {
    const transactions = await Budge.find(
        {user_id: req.user.userId}
    );
    if(!transactions || transactions.length == 0) return res.json({message: 'No transcation found!'})

    res.json(transactions)
}

const createTransaction = async (req, res) => {
    try {
        const result = await Budge.create({
            transaction: req.body.transaction,
            amount: req.body.amount,
            description: req.body.description,
            user_id: req.user.userId
        })
        res.json(result)
    } catch (error) {
        console.error(error);
    }
}

const updateTransaction = async (req, res) => {
    if(!req?.query.id){
        return res.json({message: 'Id parameter is required!'})
    }

    const transaction = await Budge.findOne({ _id: req.query.id}).exec()

    if(!transaction) return res.json({message: `No transaction matches ID ${req.query.id}.`})

    if (req.body?.transaction) transaction.transaction = req.body?.transaction
    if (req.body?.amount) transaction.amount = req.body?.amount
    if (req.body?.description) transaction.description = req.body?.description
    transaction.date = Date.now()
    

    const result = await transaction.save();
    res.json(result)
    
}

const deleteTransaction = async (req, res) =>{
    if(!req?.body.id){
        return res.json({message: 'Id parameter is required!'})
    }
    const transaction = await Budge.findOne({ _id: req.body.id}).exec()
    if(!transaction) return res.json({message: `No transaction matches ID ${req.body.id}.`})

    const result = await transaction.deleteOne();
    res.json(result)
}

module.exports = {
    getAllTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
}