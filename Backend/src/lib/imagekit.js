const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

/**
 * Generic uploader — works for any file type (images, audio, video, docs).
 * Returns the full ImageKit URL that can be stored in the DB and served directly.
 */
export async function uploadToImageKit(fileBuffer, fileName, folder = "/artfolio/artworks") {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not set");
  }

  const form = new FormData();
  form.append("file", new Blob([fileBuffer]), fileName);
  form.append("fileName", fileName);
  form.append("folder", folder);
  form.append("useUniqueFileName", "true");

  const authToken = Buffer.from(`${privateKey}:`).toString("base64");
  const response = await fetch(IMAGEKIT_UPLOAD_URL, {
    method: "POST",
    headers: { Authorization: `Basic ${authToken}` },
    body: form,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "ImageKit upload failed");
  }

  return result; // result.url is the CDN URL
}

export async function uploadProfileImageToImageKit(fileBuffer, fileName, userId) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not set");
  }

  const form = new FormData();
  form.append("file", new Blob([fileBuffer]), fileName);
  form.append("fileName", fileName);
  form.append("folder", "/artfolio/profile-images");
  form.append("useUniqueFileName", "true");
  form.append("tags", ["artfolio", "profile-image", userId].join(","));

  const authToken = Buffer.from(`${privateKey}:`).toString("base64");
  const response = await fetch(IMAGEKIT_UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
    },
    body: form,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "ImageKit upload failed");
  }

  return result;
}
