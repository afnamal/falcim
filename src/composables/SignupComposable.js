import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ref } from 'vue';

const error = ref(null);
const OnayMaili = ref(null);

const user = async (email, password, name, birthDate, location) => {
    const auth = getAuth();
    const db = getFirestore(); // Firestore örneği al

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);

        // Kullanıcı bilgilerini Firestore'a kaydet
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name: name,
            email: email,
            birthDate: birthDate,
            location: location
        });

        OnayMaili.value = 'Onaylama maili gönderilmiştir';
        error.value = null;
        signOut(auth); // Kullanıcıyı sistemden çıkar
        return userCredential;
    } catch (err) {
        console.error('Kullanıcı oluşturma hatası:', err);
        error.value = err.message;
    }
};

const SignupComposable = () => {
    return { user, error, OnayMaili };
};

export default SignupComposable;
