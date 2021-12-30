var db = window.openDatabase("fgw_shop", "1.0", "FGW Shop", 200000);

function fetch_transaction_success(name){
    log("INFO", `Insert "${name} successfully.`);
  }
  
  function table_transaction_success(table_name){
    log("INFO", `Create table "${table_name}" successfully.`);
  }
  
  function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
  }
  
  function transaction_error(tx, error) {
    log("ERROR", `SQL Error ${error.code}: ${error.message}.`);
  }
  
function initialize_database() {
    db.transaction(function (tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL)`;
  
      tx.executeSql(query,[],table_transaction_success("city"),transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS district (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        city_id INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
      tx.executeSql(query,[],table_transaction_success("district"),transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS ward (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        district_id INTEGER NOT NULL,
        FOREIGN KEY (district_id) REFERENCES district(id))`;
        
      tx.executeSql(query,[],table_transaction_success("ward"),transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstname TEXT NULL,
        lastname TEXT NULL,
        birthday REAL NULL,
        phone TEXT NULL,
        street TEXT NULL,
        ward_id INTEGER NULL,
        district_id INTEGER NULL,
        city_id INTEGER NULL,
        status INTEGER NOT NULL,
        FOREIGN KEY (ward_id) REFERENCES ward(id),
        FOREIGN KEY (district_id) REFERENCES district(id),
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
      tx.executeSql(query,[],table_transaction_success("account"),transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        parent_id INTEGER NULL,
        FOREIGN KEY (parent_id) REFERENCES category(id))`;
  
      tx.executeSql(query,[],table_transaction_success("category"),transaction_error);
      
      query = `CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        price REAL NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id))`;
      
      tx.executeSql(query,[],table_transaction_success("product"),transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (account_id) REFERENCES account(id),
        FOREIGN KEY (product_id) REFERENCES product(id))`;
  
      tx.executeSql(query,[],table_transaction_success("cart"),transaction_error);
  
      
    });
}
function fetch_database(){
    db.transaction(function (tx){
      var query = "INSERT INTO category (name, description) VALUES (?, ?)";
      tx.executeSql(query, ["Category 01", "Cat Description 01"], fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["Category 02", "Cat Description 02"], fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["Category 03", "Cat Description 03"], fetch_transaction_success("Category 03"), transaction_error);
      tx.executeSql(query, ["Category 04", "Cat Description 04"], fetch_transaction_success("Category 04"), transaction_error);
  
      query = "INSERT INTO product (name, description, price, category_id) VALUES (?, ?, ?, ?)";
      tx.executeSql(query, ["Product 01", "Description 01", 20000,1], fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["Product 02", "Description 02", 30000,1], fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["Product 03", "Description 03", 40000,2], fetch_transaction_success("Category 03"), transaction_error);
      tx.executeSql(query, ["Product 04", "Description 04", 50000,2], fetch_transaction_success("Category 04"), transaction_error);
      tx.executeSql(query, ["Product 05", "Description 05", 60000,3], fetch_transaction_success("Category 05"), transaction_error);
      
      query = "INSERT INTO account(username, password, status) VALUES (?, ?, ?)";
      
      tx.executeSql(query, ["test_01@test.com","123",1],fetch_transaction_success("test_01@test.com"), transaction_error);
    });
  }
  