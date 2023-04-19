const inquirer = require('inquirer');
const CTable = require('console.table');
const questions = require('./controllers/questions');

const promptUser = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const task = answers.task;
            if (task === "view all employees") {
                dal.viewAll(queries.allEmployees).then(() => promptUser())
            }
        })
        .catch((err) => console.log(err))
}

promptUser();