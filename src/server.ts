import express from "express";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

app.post("*", async (req, res, next) => {
  try {
    const data = req.body;

    if (data && data._type === "location") {
      const { lat, lon, tst, tid } = data;
      await prisma.location.create({
        data: {
          lat,
          lon,
          tst,
          tid,
        },
      });
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

app.get("/", async (req, res) => {
  const locations = await prisma.location.findMany({});
  return res.status(200).json(locations);
});

const PORT = 8002;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
