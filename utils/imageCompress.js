import Compressor from 'compressorjs';

const imageCompress = (e, setCompressedImage) => {
  // const image = e.target.files[0];
  return new Compressor(e[0], {
    quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
    success(compressedResult) {
      // compressedResult has the compressed file.
      // Use the compressed file to upload the images to your server.
      console.log(compressedResult);
      setCompressedImage(compressedResult);
    },
  });
};

export default imageCompress;
