//finished
const inquirer = require('inquirer');
const promptUser = require('../index');

const connection = require('../config/db');
const { allDepartments } = require('../db/queries'); //annoying me
const { getAllDepartments } = require('./getAll');

const addRole = async () => {
    const allDepartments = await getAllDepartments()
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What is the department for this role?',
            choices: allDepartments
        }
    ])
    await connection.queryPromise(
        "INSERT INTO roles SET ?",
        {
            title: answers.title,
            salary: answers.salary,
            department_id: Number(answers.departmentId),
        }
    );
    console.log('The role was added successfully!');
};

module.exports = addRole;