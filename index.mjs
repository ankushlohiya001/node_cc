process.stdin.pause();
process.stdin.setEncoding("utf8");

export function read() {
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

export async function input(txt = "") {
  print(txt);
  return await read();
}

export async function read_vec() {
  return (await read()).split(" ");
}

export function int(any) {
  return typeof any == "number" ? Math.floor(any) : parseInt(any);
}

export function float(any) {
  return typeof any == "number" ? any : parseFloat(any);
}

export function print(txt) {
  return process.stdout.write(String(txt));
}

export function run(main) {
  process.stdout.cork();
  main();
  process.stdout.uncork();
}
