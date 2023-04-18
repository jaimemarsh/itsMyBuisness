//when application starts it give multiple options:
//view all departments, view all roles, view all employees, 
//add a department, add a role, add an employee, and update an employee role
//view all departments: formatted table showing department names and ids
//view all roles: job title, role id, department that role belongs to, and the salary for that role
//view all employees: matted table showing employee data, including employee ids, first names, last names, 
//job titles, departments, salaries, and managers that the employees report to

//add a department prompted to enter the name of the department and that department is added to the database
//add a role: prompted to enter the name, salary, and department for the role and that role is added to the database
//add an employee: I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//update an employee role: prompted to select an employee to update and their new role and this information is updated in the database
//need to install inquirer, sql2, and console.table

const inquirer = require('inquirer');
const mysql = require('mysql2');
const CTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Emerald132!',
        database: 'movies_db'
    },
    console.log(`Connected to the employees_db database.`)
);

//add a department
app.post('', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name)
      VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Department added',
            data: body
        });
    });
});

//add a role, including name, salary, department
app.post('', ({ body }, res) => {
    const sql = `INSERT INTO roles (job_title, salary, department_id)`;
    const params = [body.roles];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Role added',
            data: body
        });
    });
});


//add an employee 
app.post('', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)`;
    const params = [body.employees];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee Added',
            data: body
        });
    });
});


// Update employee role
app.put('', (req, res) => {
    const sql = `UPDATE employee SET review = ? WHERE id = ?`;
    const params = [req.body.employee, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'Employees role updated',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});