import { doc, onSnapshot, query } from "firebase/firestore";
import { fireStoreDB } from "../firebase";

function listenFeaturesFlags(callBack) {
  const unsubscribe = onSnapshot(
    doc(fireStoreDB, "config", "features"),
    (doc) => {
      callBack(doc.data());
    }
  );
  return unsubscribe;
}

export { listenFeaturesFlags };
