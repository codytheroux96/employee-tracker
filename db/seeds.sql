USE employeesDB;

INSERT INTO department (name)
VALUES  ("Back Of House");
INSERT INTO department (name)
VALUES  ("Front Of House");
INSERT INTO department (name)
VALUES  ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Cook", 35000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Server", 40000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Bartender", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Kitchen Manager", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Service Manager", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Celix", "Ramos", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Cody", "Fincher", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jerome", "Clyburn", 4, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Veronica", "Stringfield", 3, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Cami", "Jenkins", 3, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Cody", "Theroux", 5, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Hunter", "Ueberoth", 2, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Taniya", "Hargrove", 2, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Candice", "Hotte", 5, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Gregg", "Bibik", 6, NULL);


    