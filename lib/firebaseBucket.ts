import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { bucketStorage } from "./firebase";

export const uploadImageToFirebase = async (
  image: File,
  path: string,
): Promise<string> => {
  const imageRef = ref(bucketStorage, path);
  const snapshot = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
