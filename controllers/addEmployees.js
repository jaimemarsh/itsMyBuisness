//finished, error about manager
const inquirer = require('inquirer');
const connection = require('../config/db.js');

const { getAllRoles, getAllManagers } = require('./getAll')

const addEmployee = (promptUser) => {

    Promise.all([getAllRoles(), getAllManagers()])
        .then(([allRoles, allManagers]) =>
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: "What is the employee's role?",
                    choices: allRoles
                },
                {
                    type: 'list',
                    name: 'managerOrNo',
                    message: "Does the employee have a manager?",
                    choices: ['yes', 'no'],
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: "Who is the employee's manager?",
                    choices: allManagers,
                    when: (answers) => answers.managerOrNo === 'yes',
                }
            ])).then((answers) => {
                if (answers.managerOrNo === 'yes') {
                    connection.query(
                        "INSERT INTO employees SET ?",
                        {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: Number(answers.roleId),
                            manager_id: Number(answers.managerId) //ERROR
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Your employee was added successfully!");
                            promptUser();
                        }
                    );
                } else {
                    connection.query(
                        "INSERT INTO employees SET ?",
                        {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: Number(answers.roleId),
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Your manager was added successfully!");
                            promptUser();
                        }
                    );
                }

            }).catch((err) => console.log(err));
};
module.exports = addEmployee