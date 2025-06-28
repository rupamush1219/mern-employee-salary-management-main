import EmployeeData from '../models/EmployeeDataModel.js'

export const verifyUser = async (req, res, next) => {
    console.log("Session Data:", req.session); // Debug session
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Please log in to your account!" });
    }
    try {
      const employ = await EmployeeData.findOne({
        where: { id_employ: req.session.userId },
      });
      if (!employ) return res.status(404).json({ msg: "User not found" });
      req.userId = employ.id_employ; // Correct field
      req.access_rights = employ.access_rights;
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "An error occurred on the server" });
    }
  };
  
export const adminOnly = async (req, res, next) => {
    try {
        const employ = await EmployeeData.findOne({
            where:{
                id_employ: req.session.userId
            }
        });
        if(!employ) return res.status(404).json({msg: "Employee data not found"});
        if(employ.access_rights !== "admin") return res.status(403).json({msg: "Forbidden access"});
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "An error occurred on the server" });
    }
}
