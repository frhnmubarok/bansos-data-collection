const server = (data) => {
  let time = Math.floor(Math.random() * 2500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time < 1500) {
        resolve({ ...data, nik: parseInt(data.nik), no_kk: parseInt(data.no_kk) });
      } else {
        reject('Internal Server Error');
      }
    }, time);
  });
};

export default server;
