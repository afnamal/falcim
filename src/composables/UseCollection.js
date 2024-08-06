import { ref } from "vue";
import { projectFirestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";


const UseCollection = (_collection) => {
    const error = ref(null);
    const addDocuman = async (doc) => {
        error.value = null;
        try {
            const col= collection(projectFirestore,_collection)
            await addDoc(col,doc)
        } catch (err) {
            console.log(err.message);
            error.value = err.message;
        }
    };
    return { error, addDocuman };
};
export default UseCollection;
