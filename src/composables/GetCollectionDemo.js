import { ref } from "vue";
import { projectFirestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const documents = ref(null);
const error = ref(null);

const GetCollectionDemo = (collectionName) => {
  const collectionRef = collection(projectFirestore, collectionName);
  const q = query(collectionRef, orderBy("createTime"));

  onSnapshot(q, (snap) => {
    let result = [];
    snap.docs.forEach((doc) => {
      doc.data().createTime && result.push({ ...doc.data(), id: doc.id });
    });
    documents.value = result;
    error.value = null; // Hata olmadığında error değerini sıfırla
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = "Veriler getirilemedi.";
  });

  // documents ve error değişkenlerini döndür
  return { documents, error };
};

export default GetCollectionDemo;
