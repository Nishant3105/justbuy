const { S3Client } = require("@aws-sdk/client-s3");

console.log({
  accessKey: process.env.AWS_ACCESS_KEY_ID?.slice(0, 6),
  secretKey: process.env.AWS_SECRET_ACCESS_KEY ? "present" : "missing",
  endpoint: process.env.R2_ENDPOINT,
});


// const r2 = new S3Client({
//   region: "auto", // REQUIRED for R2
//   endpoint: process.env.R2_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true, // 🔥 THIS FIXES SSL HANDSHAKE
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



module.exports = s3;
