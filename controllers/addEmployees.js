const inquirer = require('inquirer');
const connection = require('../config/db.js');

const { getAllRoles, getAllManagers } = require('./getAll')

const addEmployee = (askTask) => {

    Promise.all([getAllRoles(), getAllManagers()])
        .then(([allRoles, allManagers]))
    inquirer.prompt([
        {

        }
    ])







}

module.exports = addEmployee;