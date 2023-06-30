async function main(){
  let t = await read();
  for(let i=0;i<t;i++){
    const [a, b] = (await read_vec()).map(int);
    print(a+b);
    print("\n");
  }
}

process.stdin.pause();
process.stdin.setEncoding("utf8");

function read() {
  return new Promise((res, rej) => {
    if (input.buffer.length > 0) {
      setImmediate(() => {
        res(input.buffer.shift());
      });
    } else {
      process.stdin.once("readable", () => {
        const data = process.stdin.read();
        if (data !== null) {
          const lines = data.trim().split("\n");
          res(lines.shift());
          input.buffer = input.buffer.concat(lines);
        } else {
          rej("");
        }
      });
    }
  });
}
input.buffer = [];
async function input(txt=""){
  print(txt);
  return await read();
}

async function read_vec(){
  return (await read()).split(" ");
}

function int(any){
  return typeof any == "number" ? Math.floor(any) : parseInt(any)
}

function float(any){
  return typeof any == "number" ? any : parseFloat(any)
}

function print(txt){
  return process.stdout.write(String(txt));
}

process.stdout.cork();
main();
process.stdout.uncork();
