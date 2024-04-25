import { getAuth } from 'firebase/auth'
import { ref } from 'vue';

const error = ref(null);

const logout= async()=>{
    error.value=null
    try {
        await getAuth().signOut()
    } catch (err) {
        console.log(err.message)
        error.value=err.message
    }
}

const useLogout=()=>{
    return {error,logout}
}
export default useLogout