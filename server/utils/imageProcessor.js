const sharp = require("sharp");


exports.optimizeImage = async (buffer) => {
  const optimizedBuffer = await sharp(buffer)
    .resize(1200, 1200, { fit: "inside" })
    .webp({ quality: 80 })
    .toBuffer();

  return {
    buffer: optimizedBuffer,
    contentType: "image/webp",
  };
};

