import Resizer from 'react-image-file-resizer';

const imageResizer = (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1080,
      'JPEG',
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      1920,
      1080,
    );
  });
};

export default imageResizer;
