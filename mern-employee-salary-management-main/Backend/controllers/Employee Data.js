import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import path from "path";

// Showing semua Employee Data
export const getEmployeeData = async (req, res) => {
    try {
        const response = await EmployeeData.findAll({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'joining_date',
                'status', 'photo', 'access_rights'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari Employee Data berdasarkan ID
export const getEmployeeDataByID = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'username', 'joining_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee Data dengan ID tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari Employee Data berdasarkan NIK
export const getEmployeeDataByNik = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'joining_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                nik: req.params.nik
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee Data dengan NIK tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// method untuk mencari Employee Data berdasarkan name
export const getEmployeeDataByName = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'employee_name',
                'gender', 'position', 'joining_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                employee_name: req.params.name
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee Data dengan name tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//  method untuk tambah Employee Data
export const createEmployeeData = async (req, res) => {
    const {
        nik, employee_name,
        username, password, confPassword, gender,
        position, joining_date,
        status, access_rights
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirmation Password Tidak Cocok" });
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).json({ msg: "Upload Foto Failed Silahkan Upload Foto Ulang" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "File Foto Tidak Sesuai Dengan Format" });
    }

    if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Ukuran Gambar Harus Kurang from 2 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        const hashPassword = await argon2.hash(password);

        try {
            await EmployeeData.create({
                nik: nik,
                employee_name: employee_name,
                username: username,
                password: hashPassword,
                gender: gender,
                position: position,
                joining_date: joining_date,
                status: status,
                photo: fileName,
                url: url,
                access_rights: access_rights
            });

            res.status(201).json({ success: true, message: "Registrasi Succeed" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};


// method untuk update Employee Data
export const updateEmployeeData = async (req, res) => {
    const employ = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employ) return res.staus(404).json({ msg: "Employee Data not found" });
    const {
        nik, employee_name,
        username, gender,
        position, joining_date,
        status, access_rights
    } = req.body;

    try {
        await EmployeeData.update({
            nik: nik,
            employee_name: employee_name,
            username: username,
            gender: gender,
            position: position,
            joining_date: joining_date,
            status: status,
            access_rights: access_rights
        }, {
            where: {
                id: employ.id
            }
        });
        res.status(200).json({ msg: "Employee Data Succeed di Update" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method untuk update password Employ
export const changePasswordAdmin = async (req, res) => {
    const employ = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employ) return res.status(404).json({ msg: "Employee Data not found" });


    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirmation Password Tidak Cocok" });

    try {
        if (employ.access_rights === "employ") {
            const hashPassword = await argon2.hash(password);

            await EmployeeData.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: employ.id
                    }
                }
            );

            res.status(200).json({ msg: "Password Employ Succeed di Update" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// method untuk delete Employee Data
export const deleteEmployeeData = async (req, res) => {
    const employ = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!employ) return res.status(404).json({ msg: "Employee Data not found" });
    try {
        await EmployeeData.destroy({
            where: {
                id: employ.id
            }
        });
        res.status(200).json({ msg: "Employee Data Succeed di Hapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}