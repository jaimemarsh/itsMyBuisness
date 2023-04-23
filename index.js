//finished
const inquirer = require('inquirer');
const CTable = require('console.table');
const questions = require('./controllers/questions');


const addEmployee = require('./controllers/addEmployees');
const addDepartment = require('./controllers/addDepartment');
const addRole = require('./controllers/addRole');
const toDeleteEmployee = require('./controllers/deleteEmployee');
const toDeleteRole = require('./controllers/deleteRole');
const toDeleteDepartment = require('./controllers/deleteDepartment');
const viewByManager = require('./controllers/viewByManager')

const dal = require('./controllers/dal');
const queries = require('./db/queries');

const promptUser = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const task = answers.task;
            if (task === "view all employees") {
                dal.viewAll(queries.allEmployees).then(() => promptUser())
            } else if (task === 'View employees by manager') {
                viewByManager()
                    .then((answers) => dal.viewAllBy(queries.allEmployeesByManager, 'm.id', answers.managerId))
                    .then(() => promptUser());
            } else if (task === 'View all roles') {
                dal.viewAll(queries.allRoles)
                    .then(() => promptUser());
            } else if (task === 'View all departments') {
                dal.viewAll(queries.allDepartments)
                    .then(() => promptUser());
            } else if (task === 'Add employee') {
                addEmployee(promptUser)

            } else if (task === 'Add role') {
                addRole().then(() => promptUser());

            } else if (task === 'Add department') {
                addDepartment(promptUser);

            } else if (task === 'Update employee') {
                updateEmployee().then(() => promptUser())

            } else if (task === 'Delete employee') {
                toDeleteEmployee()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'employees', Number(answers.empToDelete)))
                    .then(() => promptUser());
            } else if (task === 'Delete role') {
                toDeleteRole()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'roles', Number(answers.roleToDelete)))
                    .then(() => promptUser());
            } else if (task === 'Delete department') {
                toDeleteDepartment()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'departments', Number(answers.departmentToDelete)))
                    .then(() => promptUser());
            } else {
                process.exit();
            }
        })
        .catch((err) => console.log(err));
};

promptUser();

module.exports = promptUser;