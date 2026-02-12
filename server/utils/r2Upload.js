const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true, // 🔥 REQUIRED (prevents SSL + signature issues)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


module.exports.uploadImage = async ({ buffer, contentType, folder }) => {
  const fileName = `${crypto.randomUUID()}.webp`;
  const key = `${folder}/${fileName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: "image/webp",
    })
  );

  // ✅ PUBLIC URL
  return `${process.env.R2_PUBLIC_URL}/${key}`;
};

module.exports.deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  const key = imageUrl.replace(`${process.env.R2_PUBLIC_URL}/`, "");

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    })
  );
};

