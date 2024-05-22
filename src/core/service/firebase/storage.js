import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

async function getImageUrlByName(name) {
  const imagesRef = ref(storage, `images/${name}`);
  let response = await getDownloadURL(imagesRef);
  return response;
}

export { getImageUrlByName };
// one_way.png
