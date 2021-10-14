const server = (values, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time <= 1500) {
        resolve({ ...values, nik: parseInt(values.nik), no_kk: parseInt(values.no_kk) });
      } else {
        reject(console.log('Timeout'));
      }
    }, time);
  });
};

export default server;
