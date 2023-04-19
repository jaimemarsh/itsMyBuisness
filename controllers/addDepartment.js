const inquirer = require('inquirer');
const connection = require('../config/db')

const addDepartment = (askTask) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department',
            name: 'department_name',
        }
    ])
        .then((answers) => {
            console.log(answers);
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    department_name: answers.deptName
                },
                function (err) {
                    console.log('Successfully added new department');
                    askTask();
                });
        })
}
module.exports = addDepartment;