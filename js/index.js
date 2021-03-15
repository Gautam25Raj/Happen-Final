const fs = require("fs");
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `My name is Gautam Raj ${textIn} \n I'm 19. \n Created on ${Date.now()}`;
fs.writeFileSync("./txt/output", textOut);
console.log("File Written");

fs.readFile("start.txt", "utf-8", (err, data1) => {
  fs.readFile(`${data1}`, "utf-8", (err, data2) => {
    fs.readFile("append.txt", "utf-8", (err, data3) => {
      fs.writeFile("final.txt", `${data2} ${data3}`, "utf-8", (err) => {
        if (err) throw err;
      });
    });
  });
});

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!!");

  console.log(data1);
  fs.readFile(`./txt/${dta1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data);

      fs.writeFile(".txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file is written");
      });
    });
  });
});
console.log("Will Read File");
