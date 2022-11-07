import fs from "fs";

const imagePattern = /(?:\/uploads\/)(.+)/gi;

const deleteImage = (imageLink: string): boolean => {
  let deleted: boolean = true;
  const resolvedRegexData = imagePattern.exec(imageLink);
  if (resolvedRegexData === null) {
    deleted = false;
  } else {
    const imageName = resolvedRegexData[1];
    try {
      fs.unlinkSync(`../../uploads/${imageName}`);
      console.log("[+] Deleted successfully!");
    } catch (e: any) {
      deleted = false;
    }
  }
  return deleted;
};

export default deleteImage;
