require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());

app.use(express.json());

app.use(express.static("build"));

//app.use(morgan("tiny"));

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    res.status(400).send({ error: "incorrect format for phone number" });
  }

  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(requestLogger);

morgan.token("postData", (req, res) => {
  if (req.method === "POST") {
    // console.log(res);
    return `${JSON.stringify(req.body)} res ${res}`;
  }
});
app.use(
  morgan(
    ":method :url :status Req-Content-Length: :req[content-length] - :response-time ms :postData"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>Seite wäre hier</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  Person.find({})
    .then((persons) =>
      response.send(`Phonebook has entries for ${persons.length} people 
    <br> Time of request: ${new Date()}`)
    )
    .catch((error) => console.log(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).json({ error: "person was not found" });
      }
      response.json(person);
    })
    // .catch((error) => response.status(400).json({ error: "malformatted id" }));
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((removed) => {
    console.log("removed", removed);
  });

  response.status(204).end();
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;
  // if (!body.name || !body.number)
  //   return response.status(400).json({
  //     error: "Number and or name of the person are missing",
  //   });

  // if (isNaN(body.number)) {
  //   return response
  //     .status(400)
  //     .json({ error: "The number field does not contain a number" });
  // }

  const foundPerson = await Person.findOne({ name: body.name });
  if (foundPerson) {
    console.log("found existing Person", foundPerson);
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }

  const newPerson = {
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    name: body.name,
    number: body.number,
  };

  const person = new Person(newPerson);
  console.log("new person", person);

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const replacingPerson = {
    name: name,
    number: number,
  };

  console.log("received put");
  Person.findByIdAndUpdate(request.params.id, replacingPerson, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
