<template>
    <div>
        <NavbarMenu/>
        <div class="container my-5">
            <div class="section">
                <button @click="togglePastReadings" class="btn btn-link text-left mb-2">Geçmiş Fallarım</button>
                <PastReadingVue v-if="showPastReadings"/>
            </div>
            <div class="section mt-4">
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
    color: #4A4A4A; /* Koyu gri tonu daha profesyonel bir izlenim verir */
    background-color: transparent;
    border: none;
    padding: 12px 20px;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.btn-link:hover {
    background-color: #f8f9fa; /* Hafif gri arkaplan, tıklanabilirliği vurgular */
    color: #0056b3; /* Marka rengi veya tema ile uyumlu bir renk */
}

.container {
    max-width: 800px;
    margin: auto; /* Merkezi hizalama */
    box-shadow: 0 2px 15px rgba(0,0,0,0.1); /* Soft shadow for depth */
    background: #fff; /* Clean white background */
    padding: 20px;
    border-radius: 8px; /* Rounded corners */
}

.section {
    border-bottom: 1px solid #ccc; /* Bölümler arası sınır */
    padding-bottom: 20px; /* Padding for visual space */
}

.section:last-child {
    border-bottom: none; /* Last section does not need a bottom border */
}
</style>
