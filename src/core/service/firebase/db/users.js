import {
  addDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { fireStoreDB } from "../firebase";

async function readUsers() {
  const querySnapshot = await getDocs(collection(fireStoreDB, "users"));
  let response = querySnapshot.docs.map((doc) => doc.data());
  return response;
}

async function customDoc() {
  const docRef = doc(
    fireStoreDB,
    "collection",
    "document",
    "nestedCollection",
    "document"
  );
  const querySnapshot = await getDoc(docRef);
  if (querySnapshot.exists) return querySnapshot.data();
  return null;
}

async function customCollection() {
  const docsRef = collection(
    fireStoreDB,
    "collection",
    "document",
    "nestedCollection"
  );
  const querySnapshot = await getDocs(docsRef);
  let response = querySnapshot.docs.map((doc) => doc.data());
  return response;
}

async function readUserById(id) {
  const querySnapshot = await getDocument("users", id);
  console.log("querySnapshot", querySnapshot);
  return null;
}

async function getDocument(coll, id) {
  const docRef = doc(fireStoreDB, coll, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  else return null;
}

async function deleteById(id) {
  const docRef = doc(fireStoreDB, "users", id);
  await deleteDoc(docRef);
}

async function addUser(name, lastName) {
  try {
    const docRef = await addDoc(collection(fireStoreDB, "users"), {
      name: name,
      lastName: lastName,
    });

    await updateDoc(docRef, {
      id: docRef.id,
    });

    return docRef.id;
  } catch (e) {
    return null;
  }
}

export {
  readUsers,
  addUser,
  readUserById,
  customDoc,
  customCollection,
  deleteById,
};
