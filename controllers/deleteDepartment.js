//finished
const inquirer = require('inquirer');
const { getAllDepartments } = require('./getAll');

const toDeleteDepartments = () => {
    return new Promise((resolve, reject) => {
        getAllDepartments()
            .then((allDepartments) =>
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentToDelete',
                        message: "Which department would you like to delete?",
                        choices: allDepartments
                    },
                ])
            )
            .then((answers) => resolve(answers))
            .catch((err) => reject(err))
    });
};

module.exports = toDeleteDepartments;