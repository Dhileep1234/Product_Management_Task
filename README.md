# Product_Management_Task
Basic Product Management System API Development with Sequelize and MySQL

Using RESTful API for managing users, categories, and products where authenticated users
can create
categories and map products under those categories.

**Steps for setup new project application environment.**
npm init -y

**Dependency Package Installation**
npm install bcrypt dotenv express jsonwebtoken mysql2 sequelize

**Create the Directories for Routing,Models,Database Configuration with Middleware Authenction and .environement file**
mkdir routes,models,config,middleware

Main Routes File **app.js**

**Versions of all Setups Depedency Package With Node.js and Mysql.**
Using the latest **node** version of **22.12.0**
Database **mysql2** version of **3.2.4**

Dependency Package Versions
ORM **sequelize** version of **6.37.5**
Backend Framework **express** version of **4.18.2**
Hash **bcrypt** version of **5.1.1**
Token **jsonwebtoken** version of **9.0.2**
Environment Variable **dotenv** version of **16.4.7**

**In this product management task components comprehension create Registration and Login Routes With Authenication**
**Features:**
 **Authentication:**
 Use JSON Web Tokens (JWT) for authentication.
 Protect all routes except for registration and login.

 **Endpoints:**
 Registration Api
 http://192.168.31.102:5400/auth/register
 Login Api
 http://192.168.31.102:5400/auth/login
 Category Api's
     Add Api
 http://192.168.31.102:5400/categories/addcategories
    Get Api
 http://192.168.31.102:5400/categories/getcategories
   Delete Api
 http://192.168.31.102:5400/categories/deletecategories:id

These are process of steps to create project application process of new environement.
************************Conclusion****************************
