import { getNumberPairFromProcessArgs } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
  return getBmiLabel(bmi);
};

const getBmiLabel = (bmi: number): string => {
  if (bmi < 0) return "invalid bmi";
  if (bmi < 16.0) return "Underweight (Severe thinness)";
  else if (bmi < 16.9) return "Underweight (Moderate thinness)";
  else if (bmi < 18.4) return "Underweight (Mild thinness)";
  else if (bmi < 24.9) return "Normal range";
  else if (bmi < 29.9) return "Overweight (Pre-obese)";
  else if (bmi < 34.9) return "Obese (Class I)";
  else if (bmi < 39.9) return "Obese (Class II)";
  else return "Obese (Class III)";
};

try {
  const { number1, number2 } = getNumberPairFromProcessArgs(process.argv);
  console.log(calculateBmi(number1, number2));
} catch (error: unknown) {
  if (error instanceof Error) console.log(error.message);
}
