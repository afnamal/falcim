<template>
    <div>
        <NavbarMenu/>
    <div class="container my-5">
        <div class="d-flex flex-column align-items-start">
            <button @click="togglePastReadings" class="btn btn-link text-left mb-2">Geçmiş Fallarım</button>
            <PastReadingVue v-if="showPastReadings"/>
            <button @click="toggleUserInfo" class="btn btn-link text-left mb-2">Üyelik Bilgilerim</button>
            <UserInfoVue v-if="showUserInfo"/>
        </div>
    </div>
</div>
</template>


<script>
import PastReadingVue from '../components/PastReading.vue'
import NavbarMenu from '@/components/NavbarMenu.vue';
import UserInfoVue from '../components/UserInfo.vue';
import { ref } from 'vue';

export default {
    components: {
        PastReadingVue,
        NavbarMenu,
        UserInfoVue
    },
    setup() {
        const showPastReadings = ref(false);
        const showUserInfo = ref(false);

        const togglePastReadings = () => {
            showPastReadings.value = !showPastReadings.value;
        };

        const toggleUserInfo = () => {
            showUserInfo.value = !showUserInfo.value;
        };

        return { showPastReadings, showUserInfo, togglePastReadings, toggleUserInfo };
    }
}
</script>
<style scoped>
.btn-link {
    color: rgb(78, 78, 102); 
    text-decoration: none;
    padding: 10px;
    width: 100%;  
}

.container {
    max-width: 800px;
}
</style>