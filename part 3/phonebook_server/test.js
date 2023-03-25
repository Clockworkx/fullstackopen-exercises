// const p1 = new Promise((resolve, reject) => {
//   resolve("Success");
// });

// p1.then((value) => {
//   console.log(value); // "Success!"
//   throw new Error("oh, no!");
// })
//   .catch((e) => {
//     console.error(e.message); // "oh, no!"
//   })
//   .then(
//     () => console.log("after a catch the chain is restored"),
//     () => console.log("Not fired due to the catch")
//   );

// The following behaves the same as above
// p1.then((value) => {
//   console.log(value); // "Success!"
//   return Promise.reject("oh, no!");
// })
//   .catch((e) => {
//     console.error(e); // "oh, no!"
//   })
//   .then(
//     () => console.log("after a catch the chain is restored"),
//     () => console.log("Not fired due to the catch")
//   );

// const prom = new Promise((resolve, reject) => {
//   reject("reject");
// });

// prom
//   .then((d) => console.log("should not be called"))
//   .catch((error) => console.log("rejected catched", error))
//   .then(() => console.log("resolves prob"))
//   .catch(() => "shouldnot resovle");

// const test = () => {
//   return new Promise();
// };

async function test() {
  return "testing";
}

let request = test();
request.then((data) => console.log(data));
