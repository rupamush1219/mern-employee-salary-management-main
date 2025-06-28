import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const AttendanceData = db.define('attendance_data',{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Month: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        nik: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        employee_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(20)
        },
        position_name: {
            type: DataTypes.STRING(50)
        },
        present: {
            type: DataTypes.INTEGER(11)
        },
        sickdays: {
            type: DataTypes.INTEGER(11)
        },
        absences: {
            type: DataTypes.INTEGER(11)
        },
    },{freezeTableName: true});

export default AttendanceData