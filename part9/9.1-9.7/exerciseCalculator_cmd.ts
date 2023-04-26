import {
  getNumberPairFromProcessArgs,
  getNumber,
  parseExerciseData,
} from "./utils";

interface exerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (averageHours: number, targetHours: number): number => {
  if (averageHours == targetHours) return 2;
  if (averageHours < targetHours) return 3;
  if (averageHours > targetHours) return 1;
  throw new Error("invalid averageHours and or targetHours");
};

const getRatingLabel = (rating: number): string => {
  if (rating == 1)
    return "You did more than what you planned to do, this can be good or too much, be careful.";
  if (rating == 2)
    return "You reached your target hours of exercise this week, congrats!";
  if (rating == 3)
    return "You did not reach your target, stay on it and maybe next time you will.";
  throw new Error("invalid rating");
};

const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): exerciseReport => {
  const periodLength = exerciseHours.length;
  const trainingHours = exerciseHours.filter((e) => e > 0);
  const trainingDays = trainingHours.length;
  const averageHours =
    trainingHours.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    ) / periodLength;
  console.log(averageHours);
  const success = averageHours >= targetHours ? true : false;
  const rating = getRating(averageHours, targetHours);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: getRatingLabel(rating),
    target: targetHours,
    average: averageHours,
  } satisfies exerciseReport;
};

try {
  const { target, hoursPerDay } = parseExerciseData(process.argv);
  console.log(calculateExercises(hoursPerDay, target));
} catch (error: unknown) {
  if (error instanceof Error) console.log(error.message);
}
