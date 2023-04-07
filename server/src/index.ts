import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use((req, res, next) => {
  next();
}, cors({ origin: "*" }));
app.use(express.json());

app.post(`/users/create`, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(400);

  try {
    const verifyExistsUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verifyExistsUser) res.send("Esse usuário já existe").status(400);

    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(result).status(201);
  } catch (error) {
    res.status(400);
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await prisma.user.findMany();

    res.send(response).status(200);
  } catch (error) {
    res.status(400);
  }
});

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
