import { projectAuth } from "@/firebase";
import { ref } from "vue";


const user = ref('')

projectAuth.onAuthStateChanged((_user) => {
    console.log('authstatechanged run')
    user.value=_user
})

const GetUser = ()=>{
    return {user}
}
export default GetUser