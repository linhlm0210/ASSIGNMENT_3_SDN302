import Student from "../model/studentModel.js";

export const createForm = async (req, res) => {
  try {
    console.log("get create form");
    res.render("students/createStudent");
  } catch (error) {
    console.log("Internal Server Error. ");
    res.status(500).json({ error: "Internal Server Error. " });
  }
};

export const create = async (req, res) => {
  try {
    const studentData = new Student(req.body);
    const { name, studentCode, isActive } = studentData;
    
    const studentExist = await Student.findOne({ studentCode });
    if (studentExist) {
      return res.render("students/createStudent", {
        error: "Student Code already exists.",
        name,
        studentCode,
        isActive
      });
    }

    const savedStudent = await studentData.save();
    res.status(201).redirect("/students");
  } catch (error) {
    console.error("Internal Server Error: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const { isActive } = req.query; 
    let filter = {};
    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }
    const students = await Student.find(filter).lean();
    res.render("students/listStudents", {
      student: students,
      query: req.query, 
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    console.log(id);

    const studentExist = await Student.findOne({ _id: id });
    if (!studentExist) {
      return res.status(404).json({ message: " Student Not Found. " });
    }
    await Student.findByIdAndDelete(id);
    res.redirect("/students");
  } catch (error) {
    res.status(500).json({ error: " Internal Server Error. " });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id; 
    const studentExist = await Student.findById(id);
    
    if (!studentExist) {
      return res.status(404).json({ message: "Student not found." });
    }

    const { name, studentCode, isActive } = req.body;

    const existingStudent = await Student.findOne({ studentCode, _id: { $ne: id } });
    if (existingStudent) {
      return res.render("students/updateStudent", {
        error: "Student code already exists.",
        student: {
          _id: id,
          name: name || studentExist.name,
          studentCode: studentCode || studentExist.studentCode,
          isActive: isActive !== undefined ? isActive : studentExist.isActive, 
        },
      });
    }
    studentExist.name = name || studentExist.name;
    studentExist.studentCode = studentCode || studentExist.studentCode;
    studentExist.isActive = isActive !== undefined ? isActive : studentExist.isActive;

    await studentExist.save();
    res.redirect("/students");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getUpdateForm = async (req, res) => {
  try {
    const id = req.params.id; 
    const student = await Student.findById(id).lean();
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.render("students/updateStudent", { student, id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};





