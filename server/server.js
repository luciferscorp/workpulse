const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();


// Structure of the json
app.use(bodyParser.json());

//Enabling the Cors
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Assigning Size of the json return value from the request and response
app.use(express.json({ limit: "100mb" }));

// Configure the DB

let db = new sqlite3.Database("workpulse.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});



//Add new rows into the SQLite in the Employee Table
app.post("/addnewrecord", (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    sql = "Insert into Employee(firstname,lastname)Values(?,?)";
    db.run(sql, [firstname, lastname], (err) => {
      if (err) return res.json({ status: 500, success: false, error: err });
      console.log("Success", firstname, lastname);
    });
    return res.json({ status: 200, success: true });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});


app.get("/getallusers", (req, res) => {
  // sql = "select * from Employee ";
  sql = "select *,(select RoleName from roles where RoleId = e.Role) as rolename from Employee e where Role != 1 and isdelete != 1";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});


// Login Page API
app.post("/api/login", (req, res) => {

  const { Email, Password } = req.body
  console.log(Email, Password);
  try {
    // let Email ="Admin@workpulse.com", Password= "496c65616648393a3b";
    sql = "SELECT * FROM Employee WHERE Email = ? and Password = ?";
    db.all(sql, [Email, Password], (err, rows) => {
      if (err)
        return res.json({ status: 500, success: false, error: err });
      if (rows.length < 1)
        return res.json({ status: 300, success: false, error: "No match" })
      return res.json({ status: 200, success: true, data: rows })
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }


});

// Add new employee into the database
app.post("/api/addemployee", (req, res) => {
  const { EmployeeName, Email, Password, Role, JoiningDate, CreatedOn, CreatedBy } = req.body;
  console.log("Add employee", req.body)
  try {
    sql = "INSERT INTO Employee (CreatedBy,isActive,isDelete, EmployeeName,Email,Password,Role,JoiningDate,CreatedOn) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    db.run(sql, [CreatedBy, 1, 0, EmployeeName, Email, Password, Role, JoiningDate, CreatedOn], (err) => {
      if (err)
        return res.json({ status: 500, success: false, error: err })
      return res.json({ status: 200, success: true, data: "A row has been inserted into Employee table" })
    })

  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

//API to Update Employee details
app.put("/api/updateemployee", (req, res) => {
  const { EmployeeID, isActive, UpdatedBy, UpdatedOn } = req.body;
  console.log("Update employee: data", req.body)
  try {
    sql = "UPDATE Employee SET UpdatedBy = ?, isActive = ?, UpdatedOn = ? WHERE EmployeeID = ?;"
    db.run(sql, ["Developer", isActive, UpdatedOn, EmployeeID], (err) => {
      if (err)
        return res.json({ status: 500, success: false, error: err })
      return res.json({ status: 200, success: true, data: "A row has been updated on Employee table" })
    })

  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

//API to Update Company details
app.put("/api/updatecompany", (req, res) => {
  const { CompanyID, isActive, UpdatedBy, UpdatedOn } = req.body;
  console.log("Update Company: data", req.body)
  try {
    sql = "UPDATE Company SET UpdatedBy = ?, isActive = ?, UpdatedOn = ? WHERE CompanyID = ?;"
    db.run(sql, ["Developer", isActive, UpdatedOn, CompanyID], (err) => {
      if (err)
        return res.json({ status: 500, success: false, error: err })
      return res.json({ status: 200, success: true, data: "A row has been updated on Company table" })
    })

  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
});


//API to get all records about companies

app.get("/getallcompanies", (req, res) => {
  // sql = "select * from Employee ";
  sql = "select * from Company where isDelete != 1";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});


app.get("/api/getallusers", (req, res) => {
  // sql = "select * from Employee order by Id asc";
  sql = "select *,(select RoleName from roles where RoleId = e.Role) as rolename from Employee e where Role != 1 isDelete != 1 ";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

app.get("/api/getallprojects", (req, res) => {
  // sql = "select * from Employee order by Id asc";
  sql = "select  c.CompanyID, c.CompanyName, e.EmployeeName, p.* from Company c inner join Projects p on p.CompanyID = c.CompanyID left join Employee e on e.EmployeeID = p.ProjectLeader  or  p.ProjectLeader=null where p.isDelete==0";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

app.post("/api/addcompany", (req, res) => {
  const { CompanyName, CreatedBy, CreatedOn } = req.body;
  console.log("Add Company", CompanyName)
  try {
    sql = "INSERT INTO Company (CompanyName, CreatedBy, CreatedOn) values ( ? , ? , ?);"
    db.run(sql, [CompanyName, CreatedBy, CreatedOn], (err) => {
      if (err)
        return res.json({ status: 500, success: false, error: err })
      return res.json({ status: 200, success: true, data: "A row has been inserted into Comapany table" })
    })

  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
})

// Update employee table 

app.put("/updateEmployeeUsers", (req, res) => {
  const { isactivate, EmployeeID } = req.body;
  try {

    sql = "update employee set isactive=(?) where employeeid=(?)";

    db.run(sql, [isactivate, EmployeeID], (err) => {
      // console.log("empod",id);
      if (err) return res.json({ status: 500, success: false, error: err });
    });
    return res.json({ status: 200, success: true });

  }
  catch (error) {
    return res.json({ status: 400, success: false, });
  }
});


//API tp delete employee records
app.put('/deleterecord', (req, res) => {

  try {
    let data = req.body;
    let id = data.id;

    console.log("EmployeeID", id)
    sql = "update employee set isdelete='1' where employeeid=(?)";
    db.run(sql, [id], (err) => {
      if (err) { return res.json({ status: 300, success: false }) }
      return res.json({ status: 200, success: true })
    })
  }
  catch (error) {
    return res.json({ status: 400, success: false })
  }

})

//API to delete Project records
app.put('/deleteProjectData', (req, res) => {

  try {
    let data = req.body;
    let id = data.id;
    // console.log("CompanyID",id)
    sql = "update projects set isDelete='1' where ProjectID=(?)";
    db.run(sql, [id], (err) => {
      if (err) { return res.json({ status: 300, success: false }) }
      return res.json({ status: 200, success: true })
    })
  }
  catch (error) {
    return res.json({ status: 400, success: false })
  }

})


//api to update project records
app.put("/updateProjectData", (req, res) => {

  try {
    const { ProjectName, Description, ProjectID  } = req.body;
    sql = "update projects set ProjectName=(?), Description=(?) where projectid=(?)";
    db.run(sql, [ProjectName, Description, ProjectID], (err) => {
      if (err) return res.json({ status: 500, success: false, error: err });
    });
    return res.json({ status: 200, success: true });
  }

  catch (error) {
    return res.json({ status: 400, success: false, });
  }
});

//API to add Projects in Projects Table
app.post("/api/addprojects", (req, res) => {
  const { ProjectName, Description, StartDate, EndDate, CreatedBy, CreatedOn, CompanyID } = req.body;
  console.log("Add xProject", req.body)
  try {
    sql = "INSERT INTO Projects (isDelete, ProjectName, Description, StartDate, EndDate, CreatedBy, CreatedOn, CompanyID) values ( ?, ?, ?, ?, ?, ?, ?, ?);"
    db.run(sql, [0, ProjectName, Description, StartDate, EndDate, CreatedBy, CreatedOn, CompanyID], (err) => {
      if (err)
        return res.json({ status: 500, success: false, error: err })
      return res.json({ status: 200, success: true, data: "A row has been inserted into Projects table" })
    })

  } catch {
    return res.json({
      status: 400,
      success: false,
    });
  }
})



app.put("/updaterecord", (req, res) => {

  try {
    const { EmployeeName } = req.body;
    sql = "update employee set EmployeeName=(?) where employeeid='7'";
    db.run(sql, [EmployeeName], (err) => {
      if (err) return res.json({ status: 500, success: false, error: err });
    });
    return res.json({ status: 200, success: true });
  }

  catch (error) {
    return res.json({ status: 400, success: false, });
  }
});

//API only to get email address of user to check duplications
  
app.get("/api/getonlyemail", (req, res) => {
  sql = "SELECT Email FROM Employee";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

//API for Project Manager.js
{
  //Get All available projects from Projects Table
  {

    app.get("/api/getavailableprojects", (req, res) => {
      sql = "SELECT ProjectName, ProjectID FROM Projects WHERE isDelete !=1 AND ProjectLeader IS NULL;";
      try {
        db.all(sql, [], (err, rows) => {
          if (err) return res.json({ status: 300, success: false });
    
          if (rows.length < 1)
            return res.json({
              status: 300,
              success: false,
              error: "No Match Found",
            });
    
          return res.json({ status: 200, data: rows, success: true });
        });
      } catch (error) {
        return res.json({
          status: 400,
          success: false,
        });
      }
    });
  }

  

  //Get All available project leaders from Projects Table
  {
    app.get("/api/getavailableprojectleaders", (req, res) => {
      sql = "SELECT EmployeeName, EmployeeID FROM Employee where isDelete !=1 and Role=3 and isActive = 1 ;";
      try {
        db.all(sql, [], (err, rows) => {
          if (err) return res.json({ status: 300, success: false });
    
          if (rows.length < 1)
            return res.json({
              status: 300,
              success: false,
              error: "No Match Found",
            });
    
          return res.json({ status: 200, data: rows, success: true });
        });
      } catch (error) {
        return res.json({
          status: 400,
          success: false,
        });
      }
    });
  }
  {
    
    app.post("/api/assignleader", (req, res) => {
      const { ProjectID, ProjectLeader } = req.body;
      console.log("Add xProject", req.body)
      try {
        sql = "UPDATE Projects SET ProjectLeader = ? WHERE ProjectID = ?"
        db.run(sql, [ProjectLeader, ProjectID], (err) => {
          if (err)
            return res.json({ status: 500, success: false, error: err })
          return res.json({ status: 200, success: true, data: "A row has been inserted into Projects table" })
        })
    
      } catch {
        return res.json({
          status: 400,
          success: false,
        });
      }
    })
  }
}


// function logger(req, res, next) {
//   console.log(req.body)
// }

// app.get("/getRandomUsers", async (req, res) => {
//   try {
//     const limit = req.query.limit || 5; // You can adjust the default limit

//     const response = await axios.get(
//       `https://randomuser.me/api/?results=${limit}&inc=name,gender,email,nat,picture&noinfo`
//     );
//     const users = response.data.results;
//     res.json({ status: 200, data: users, success: true });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.json({ status: 500, success: false, error: "Internal Server Error" });
//   }
// });

// API route for paginated items
app.get("/api/items", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get page from query parameter, default to 1
  const pageSize = parseInt(req.query.pageSize) || 5; // Get page size from query parameter, default to 10

  try {
    const query = "SELECT COUNT(*) AS employeeCount FROM employee";

    db.get(query, async (err, row) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }

      const employeeCount = row.employeeCount;
      console.log(`Number of employees: ${employeeCount}`);
      const totalPages = Math.ceil(employeeCount / pageSize);
      console.log("totalpages", totalPages);

      const limit = pageSize;
      const offset = (page - 1) * pageSize;

      const query = "SELECT * FROM Employee where Isactive=0 LIMIT ? OFFSET ? ";

      const items = db.all(query, [limit, offset], (err, items) => {
        if (err) {
          throw err;
        }

        console.log(items);
        res.json({
          items,
          totalPages,
          currentPage: page,
        });
        // Close the database connection
      });
    });
    // const totalItems = await db.get("SELECT COUNT(*) as count FROM Employee");
    // const totalPages = Math.ceil(totalItems.count / pageSize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getall", (req, res) => {
  db.all(`select * from Employee`, (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      res.send({ validation: true });
    } else {
      res.send({ validation: false });
    }
  });
});

// PUT method
app.put("/api/update/:itemId", (req, res) => {
  const { itemId } = req.params;
  const { Isactive } = req.body; // Assuming you have a JSON body with updated data

  db.run(
    `UPDATE Employee SET Isactive = ? WHERE Id = ?`,
    [Isactive, itemId],
    function (err) {
      if (err) {
        console.log("errorrorororo", err.message);
        return res.status(500).send(err.message);
      }
      res.send({ message: `Employee with ID ${itemId} updated successfully` });
    }
  );
});

app.put("/updateCompanyUsers", (req, res) => {
  const { isactivate, CompanyID } = req.body;
  try {

    sql = "update company set isactive=(?) where companyid=(?)";

    db.run(sql, [isactivate, CompanyID], (err) => {
      // console.log("empod",id);
      if (err) return res.json({ status: 300, success: false, error: err });
    });
    return res.json({ status: 200, success: true });

  }
  catch (error) {
    return res.json({ status: 400, success: false, });
  }
});

//API to delete Company records
app.put('/deletecomapanyrecord', (req, res) => {

  try {
    let data = req.body;
    let id = data.id;
    // console.log("CompanyID",id)
    sql = "update company set isdelete='1' where companyid=(?)";
    db.run(sql, [id], (err) => {
      if (err) { return res.json({ status: 300, success: false }) }
      return res.json({ status: 200, success: true })
    })
  }
  catch (error) {
    return res.json({ status: 400, success: false })
  }

})

app.get("/api/getuser/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM Employee WHERE Id = ?";

  try {
    db.get(sql, [userId], (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      if (!row) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      return res.status(200).json({ success: true, data: row });
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

//Add new task into the SQLite in the task Table
app.post("/addTask", (req, res) => {
  const { ProjectID ,TaskDescription } = req.body;
  try {
    sql = "Insert into Tasks ( ProjectID, TaskDescription)  values (?,?)";
    db.run(sql, [ProjectID ,TaskDescription], (err) => {
      if (err) return res.json({ status: 500, success: false, error: err });});
    return res.json({ status: 200, success: true });


  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
})

//API to get all records about projects

app.get("/getallprojects", (req, res) => {
  // sql = "select * from Employee ";
  sql = "select * from projects where isDelete != 1";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

// get all the records from Tasks
app.get("/getallTasks", (req, res) => {
  // sql = "select * from Employee order by Id asc";
  sql = "SELECT Tasks.ProjectID, Tasks.TaskDescription, Projects.ProjectName FROM Tasks INNER JOIN Projects ON Tasks.ProjectID = Projects.ProjectID;";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false });

      if (rows.length < 1)
        return res.json({
          status: 300,
          success: false,
          error: "No Match Found",
        });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

app.listen(3001, () => console.log("Listening at port 3001"));
