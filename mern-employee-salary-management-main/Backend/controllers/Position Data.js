import PositionData from "../models/PositionDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import { Op } from "sequelize";

// Showing semua Position Data
export const getPositionData = async (req, res) => {
    try {
        let response;
        if (req.access_rights === "admin") {
            response = await PositionData.findAll({
                attributes: ['id', 'position_name', 'basic_salary', 'transport_allowance', 'meal_allowance'],
                include: [{
                    model: EmployeeData,
                    attributes: ['employee_name', 'username', 'access_rights'],
                }]
            });
        } else {
            if (req.userId !== PositionData.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await PositionData.update({
                position_name, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ id_position: position.id_position }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk Showing Position Data by ID
export const getPositionDataByID = async (req, res) => {
    try {
        const response = await PositionData.findOne({
            attributes: [
                'id','position_name', 'basic_salary', 'transport_allowance', 'meal_allowance'
            ],
            where: {
                id: req.params.id
            }
        });
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg: 'Position Data dengan ID tersebut tidak ditemukan'});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// method untuk tambah Position Data
export const createPositionData = async (req, res) => {
    const {
        id_position, position_name, basic_salary, transport_allowance, meal_allowance
    } = req.body;
    try {
        if (req.access_rights === "admin") {
            await PositionData.create({
                id_position: id_position,
                position_name: position_name,
                basic_salary: basic_salary,
                transport_allowance: transport_allowance,
                meal_allowance: meal_allowance,
                userId: req.userId
            });
        } else {
            if (req.userId !== PositionData.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await PositionData.update({
                position_name, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ id_position: position.id_position }, { userId: req.userId }]
                },
            });
        }
        res.status(201).json({ success: true, message: "Position Data Succeed di Save" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

// method untuk update Position Data
export const updatePositionData = async (req, res) => {
    try {
        const position = await PositionData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!position) return res.status(404).json({ msg: "Data not found" });
        const { position_name, basic_salary, transport_allowance, meal_allowance } = req.body;
        if (req.access_rights === "admin") {
            await PositionData.update({
                position_name, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    id: position.id
                }
            });
        } else {
            if (req.userId !== PositionData.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await PositionData.update({
                position_name, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ id_position: position.id_position }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Position Data Succeed di Pebarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk delete Position Data
export const deletePositionData = async (req, res) => {
    try {
        const position = await PositionData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!position) return res.status(404).json({ msg: "Data not found" });
        if (req.access_rights === "admin") {
            await position.destroy({
                where: {
                    id: position.id
                }
            });
        } else {
            if (req.userId !== position.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await position.destroy({
                where: {
                    [Op.and]: [{ id_position: position.id_position }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Position Data Succeed di Hapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}