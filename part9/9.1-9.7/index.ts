import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

interface bmiResponse {
  weight: number;
  height: number;
  bmiLabel: string;
}

// const requestLogger = (request, _response, next) => {
//   console.log(request.url);
//   console.log(request.path);
//   console.log(request.method);
//   next();
// };

// app.use(requestLogger);

app.get("/hello", (_request, response) => {
  response.status(200).send("hello fullstack");
});

app.get("/bmi", (request, response) => {
  console.log(request.query);

  const weight = Number(request.query.weight);
  const height = Number(request.query.height);

  console.log(weight, height);

  if (!weight || !height) {
    response.status(400).json({ error: "malformed weight or height" });
    return;
  }

  response.json({
    weight: weight,
    height: height,
    bmiLabel: calculateBmi(height, weight),
  } satisfies bmiResponse);
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = request.body;
  console.log(daily_exercises, target);

  if (!daily_exercises || !target) {
    response
      .status(400)
      .json({ error: "daily_exercises or target are missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    response.status(400).json({ error: "incorrect daily_exercises format" });
    return;
  }

  //verify members are numbers
  daily_exercises.forEach((e) => {
    if (isNaN(Number(e))) {
      response
        .status(400)
        .json({ error: "one of daily_exercises' members is not a number" });
      return;
    }
  });

  if (isNaN(Number(target))) {
    response.status(400).json({ error: "target is not a number" });
    return;
  }

  const exercise_report = calculateExercises(
    daily_exercises as number[],
    Number(target)
  );
  response.json(exercise_report);
});

app.listen(3001, () => console.log("server started on port", 3001));
