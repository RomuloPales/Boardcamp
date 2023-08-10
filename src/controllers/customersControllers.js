import db from "../database/db.js";

export async function insertNewCustomers(req, res) {
  const customers = res.locals.customer;
  
  try {
    await db.query("INSERT INTO customers (name, phone, cpf, birthday ) values ($1, $2, $3, $4)", [
      customers.name,
      customers.phone,
      customers.cpf,
      customers.birthday,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
    
  }
} 


export async function getAllCustomers (req,res){
  try{
    const {rows} = await db.query("SELECT * FROM customers");
    res.send(rows).status(200);
  }
  catch(err){
    res.status(400).send(err.message);
  }
} 