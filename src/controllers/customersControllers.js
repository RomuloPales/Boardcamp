import db from "../database/db.js";

export async function insertNewCustomers(req, res) {
  const customers = res.locals.customer;

  try {
    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday ) values ($1, $2, $3, $4)",
      [customers.name, customers.phone, customers.cpf, customers.birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function getAllCustomers(req, res) {
  const { cpf } = req.query;
  try {
    let users;
    if (cpf) {
      users = await db.query(
        `
      SELECT *
       FROM 
        customers
       WHERE 
        cpf ILIKE '%' || $1 || '%';`,
        [cpf]
      );
      return res.send(users.rows).status(200);
    }
    const { rows } = await db.query("SELECT * FROM customers");
    res.send(rows).status(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.sendStatus(404);
    }
    res.send(rows).status(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  try {
    const cpfExist = await db.query("SELECT * FROM customers WHERE cpf = $1", [
      cpf,
    ]);
    if (cpfExist.rows.length > 0) {
      return res.sendStatus(409);
    }
    await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
