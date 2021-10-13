const server = (values, reason, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time <= 1500) {
        resolve({ ...values, reason });
      } else {
        reject(console.log('Timeout'));
      }
    }, time);
  });
};

export default server;
