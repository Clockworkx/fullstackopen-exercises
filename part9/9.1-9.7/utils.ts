interface numberPair {
  number1: number;
  number2: number;
}

interface exerciseData {
  target: number;
  hoursPerDay: number[];
}

const isNotNumber = (number: any): boolean => {
  return isNaN(Number(number));
};

const getNumberPairFromProcessArgs = (args: string[]): numberPair => {
  if (args.length < 4) throw new Error("too few arguments");
  if (args.length > 5) throw new Error("too many arguments");

  if (isNotNumber(args[2]) || isNotNumber(args[3]))
    throw new Error("provided arguments were not only numbers");

  return {
    number1: Number(args[2]),
    number2: Number(args[3]),
  } satisfies numberPair;
};

const getNumber = (number: any): number => {
  if (isNotNumber(number))
    throw new Error(`provided argument was not a number ${number}`);
  return Number(number);
};

const parseExerciseData = (args: string[]): exerciseData => {
  if (args.length < 5) throw new Error("too few arguments"); // one day period does not make sense for an exercise average

  const hoursPerDay = args.slice(3).map((e) => getNumber(e));

  return {
    target: getNumber(process.argv[2]),
    hoursPerDay: hoursPerDay,
  } satisfies exerciseData;
};

export { getNumberPairFromProcessArgs, getNumber, parseExerciseData };
