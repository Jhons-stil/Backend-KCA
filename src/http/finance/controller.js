const {
  tambahFinance,
  tampilKeuangan,
  cariFinanceById,
  ubahFinance,
  hapusFinance,
  findUser,
} = require("../finance/service.js")

const { resSukses, resGagal } = require("../../payloads/payload.js");
const { body } = require("express-validator");


const getAllFinance = async (req, res) => {
    try {
        const data = await tampilKeuangan()
       return resSukses(res, 200, "succes", "Data keuangan",data);
    } catch (error) {
        return resGagal(res, 500, "error", error.message);
    }
};

const getFinanceById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await cariFinanceById(id)
        return resSukses(res, 200, "success", "Data berdasarkan ID",data)
    } catch (error) {
        return resGagal(res, 500, "error", error.message);        
    }
};

const createFinance = async (req, res) => {
    try {
        const { type, category, amount, date, note } = req.body;
        const user_id = req.user.id;
        
        const finance = await tambahFinance({
            user_id,
            type,
            category,
            amount,
            date, 
            note,
        });
        return resSukses(res, 201, "success", "Data berhasil ditambahkan",finance)
    } catch (error) {
        return resGagal(res, 500, "error", error.message);
    }
};

const updateFinance = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const {
            type,
            category,
            amount,
            date,
            note,   
         } = req.body;

         const user_id = req.user.id; 
         const body = {
            user_id,
            type,
            category,
            amount,
            date,
            note,
        }

        const data = await ubahFinance(id, body);
        return resSukses(res, 200, "success", "Data berhasil diubah",data);   
    } catch (error) {
        return resGagal(res, 500, "error", error.message);
    }
};

const deleteFinance = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await hapusFinance(id);
        return resSukses(res, 201, "success", "Data berhasil dihapus")
    } catch (error) {
        return resGagal(res, 500, "error", error.message);
    }
};



module.exports = {
    getAllFinance,
    getFinanceById,
    createFinance,
    updateFinance,
    deleteFinance,
}
