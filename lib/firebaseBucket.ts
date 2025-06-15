import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { bucketStorage } from "./firebase";

export const uploadImageToFirebase = async (
  lenderId: string,
  paymentId: string,
  image: File,
  imageName: string,
): Promise<string> => {
  const imageRef = ref(
    bucketStorage,
    `payments/${lenderId}/${paymentId}-${imageName}`,
  );
  const snapshot = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
