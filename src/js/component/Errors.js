/* 
new Error([message[, fileName[, lineNumber]]])

class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

try {
  throw new CustomError('baz', 'bazMessage');
} catch(e){
  console.log(e.name); //CustomError
  console.log(e.foo); //baz
  console.log(e.message); //bazMessage
  console.log(e.stack); //stacktrace
}


const common = promise => {
    promise
    .then(result => ({ok: true, result}))
    .catch(error => ({ok: false, error}))
}

// define an async operation that rejects if the path is not a string
export const errorFn = async (path) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof path === 'string') {
          resolve(`No Error = ${path}`);
        } else {
          reject(new Error(`Error is there(${typeof path}) = ${path}`));
        }
      }, 1000);
    });
  };
  errorFn(54); */