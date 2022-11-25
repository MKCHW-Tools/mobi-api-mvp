const storage = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const cloudStorage = new storage.Storage({
	keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = "mobiklinic-objects";
const bucket = cloudStorage.bucket(bucketName);
const getPublicUrl = (filePath) =>
	"https://storage.googleapis.com/" + bucketName + "/" + filePath;

module.exports = {
	uploadImage: (fileContent, filePrefix, fileName) =>
		new Promise(async (resolve, reject) => {
			if (!fileName)
				// we assume that this is jpeg
				fileName = uuidv4() + ".jpg";

			const file = bucket.file(`${filePrefix}${fileName}`);
			await file.save(fileContent);
			await file.makePublic();
			resolve(getPublicUrl(file.name));
		}),
};
