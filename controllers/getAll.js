const util = require('util');
const connection = require('../config/db');

const queryAsync = util.promisify(connection.query).bind(connection);

const getAllEmployees = async (value) => {
    try {
        const rows = await queryAsync("SELECT * FROM employees");
        return rows.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
    } catch (err) {
        console.log('There was an error querying the database to select all employees.');
    }
};

const getAllRoles = async () => {
    try {
        const rows = await queryAsync("SELECT * FROM roles");
        return rows.map((role) => ({ name: role.title, value: role.id }));
    } catch (err) {
        console.log(`Err at getAllRoles,`, err);
    }
};

const getAllDepartments = async () => {
    try {
        const rows = await queryAsync("SELECT * FROM departments");
        return rows.map((dept) => ({ name: department.deptartment_name, value: department.id }));
    } catch (err) {
        console.log(`Err at getAllDepartments,`, err);
    }
};

module.exports = { getAllEmployees, getAllRoles, getAllDepartments }