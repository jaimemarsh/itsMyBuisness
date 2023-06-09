DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- departments: formatted table showing department names and ids
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

-- roles: job title, role id, department that role belongs to, and the salary for that role
CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY,
  job_title VARCHAR(100) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

-- employees: formatted table showing employee data, including employee ids, first names, last names, 
-- job titles, departments, salaries, and managers that the employees report to
CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
 role_id INT NOT NULL,
 manager_id VARCHAR(30) 
);
