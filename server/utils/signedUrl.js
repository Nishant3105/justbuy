const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const r2 = require("../config/r2");

exports.getSignedImageUrl = async (key, expiresIn = 300) => {
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    }),
    { expiresIn }
  );
};
