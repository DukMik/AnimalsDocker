const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  "WPDataBase",
  "fabien",
  "pass",
  {
    host: animal-mysql,
    port: 2525,
    dialect: "mysql",
  }
);

// mapping de table de bdd vers javascript 
const Animals = sequelize.define("Animals", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nom: DataTypes.STRING,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await Animals.sync();
    await Animals.findOrCreate({
      where: { id: 1 },
      defaults: {
        nom: "Deepstaria enigmatica (Méduse)",
      },
    });
    await Animals.findOrCreate({
      where: { id: 2 },
      defaults: {
        nom: "Lybia tessellata (Crabe)",
      },
    });
    await Animals.findOrCreate({
      where: { id: 3 },
      defaults: {
        nom: "Isistius brasiliensis (Requin)",
      },
    });
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const app = express();
const port = 2525;

app.get("/", (req, res) => {
  Animals.findAll().then(r => res.send(r));
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
