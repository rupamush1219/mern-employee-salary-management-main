import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import { verifyUser } from "../middleware/AuthUser.js";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const employ = await EmployeeData.findOne({
      where: {
        username
      }
    });

    if (!employ) {
      return res.status(404).json({ msg: "Employee Data Not Found" });
    }

    // Verify password
    const match = await argon2.verify(employ.password, password);

    if (!match) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    // Set session userId
    req.session.userId = employ.id_employ;

    const user = {
      id_employ: employ.id_employ,
      employee_name: employ.employee_name,
      username: employ.username,
      access_rights: employ.access_rights
    };

    res.status(200).json({
      id_employ: user.id_employ,
      employee_name: user.employee_name,
      username: user.username,
      access_rights: user.access_rights,
      msg: "Login Successful"
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please log in to your account" });
  }

  try {
    const employ = await EmployeeData.findOne({
      attributes: ['id', 'nik', 'employee_name', 'username', 'access_rights'],
      where: {
        id_employ: req.session.userId
      }
    });

    if (!employ) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    res.status(200).json(employ);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const LogOut = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res.status(400).json({ msg: "Logout Failed" });
      }
      res.status(200).json({ msg: "You have been logged out" });
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    // Verify user authentication
    await verifyUser(req, res, () => { });

    const userId = req.userId;

    const user = await EmployeeData.findOne({
      where: {
        id_employ: userId
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    const { password, confPassword } = req.body;

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    const hashPassword = await argon2.hash(password);

    await EmployeeData.update(
      {
        password: hashPassword
      },
      {
        where: {
          id_employ: user.id_employ
        }
      }
    );

    res.status(200).json({ msg: "Password successfully updated" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
