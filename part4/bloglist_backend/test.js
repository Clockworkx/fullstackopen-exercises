function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
      if (onSuccess) {
        resolve([
          { id: 1, name: "Jerry" },
          { id: 2, name: "Elaine" },
          { id: 3, name: "George" },
        ]);
      } else {
        reject("Failed to fetch data!");
      }
    }, 1000);
    console.log("test");
  });
}

getUsers(true).then((d) => console.log(d));
//console.log(");
