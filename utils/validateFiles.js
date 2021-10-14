const validateFiles = (value) => {
  if (value.length < 1) {
    return 'Wajib diisi';
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 2;
    if (fsMb > MAX_FILE_SIZE) {
      return 'Ukuran foto lebih dari 2MB';
    }
  }
  return true;
};

export default validateFiles;
