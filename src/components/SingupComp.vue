<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">{{ $t('signup.title') }}</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="name" :placeholder="$t('signup.namePlaceholder')" required v-model="name">
        <label for="name">{{ $t('signup.nameLabel') }}</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" :placeholder="$t('signup.emailPlaceholder')" required v-model="email">
        <label for="email">{{ $t('signup.emailLabel') }}</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" :placeholder="$t('signup.passwordPlaceholder')" required v-model="password">
        <label for="password">{{ $t('signup.passwordLabel') }}</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="birthDate" :placeholder="$t('signup.birthDatePlaceholder')" v-model="birthDate">
        <label for="birthDate">{{ $t('signup.birthDateLabel') }}</label>
      </div>
      <div class="form-floating mb-3">
    <select class="form-select" id="location" v-model="location" aria-label="Yaşadığınız Yer">
      <option selected disabled value="">{{ $t('signup.locationPlaceholder') }}</option>    <option value="Adana">Adana</option>
    <option value="Adıyaman">Adıyaman</option>
    <option value="Afyonkarahisar">Afyonkarahisar</option>
    <option value="Ağrı">Ağrı</option>
    <option value="Amasya">Amasya</option>
    <option value="Ankara">Ankara</option>
    <option value="Antalya">Antalya</option>
    <option value="Artvin">Artvin</option>
    <option value="Aydın">Aydın</option>
    <option value="Balıkesir">Balıkesir</option>
    <option value="Bilecik">Bilecik</option>
    <option value="Bingöl">Bingöl</option>
    <option value="Bitlis">Bitlis</option>
    <option value="Bolu">Bolu</option>
    <option value="Burdur">Burdur</option>
    <option value="Bursa">Bursa</option>
    <option value="Çanakkale">Çanakkale</option>
    <option value="Çankırı">Çankırı</option>
    <option value="Çorum">Çorum</option>
    <option value="Denizli">Denizli</option>
    <option value="Diyarbakır">Diyarbakır</option>
    <option value="Edirne">Edirne</option>
    <option value="Elazığ">Elazığ</option>
    <option value="Erzincan">Erzincan</option>
    <option value="Erzurum">Erzurum</option>
    <option value="Eskişehir">Eskişehir</option>
    <option value="Gaziantep">Gaziantep</option>
    <option value="Giresun">Giresun</option>
    <option value="Gümüşhane">Gümüşhane</option>
    <option value="Hakkâri">Hakkâri</option>
    <option value="Hatay">Hatay</option>
    <option value="Isparta">Isparta</option>
    <option value="Mersin">Mersin</option>
    <option value="İstanbul">İstanbul</option>
    <option value="İzmir">İzmir</option>
    <option value="Kars">Kars</option>
    <option value="Kastamonu">Kastamonu</option>
    <option value="Kayseri">Kayseri</option>
    <option value="Kırklareli">Kırklareli</option>
    <option value="Kırşehir">Kırşehir</option>
    <option value="Kocaeli">Kocaeli</option>
    <option value="Konya">Konya</option>
    <option value="Kütahya">Kütahya</option>
    <option value="Malatya">Malatya</option>
    <option value="Manisa">Manisa</option>
    <option value="Kahramanmaraş">Kahramanmaraş</option>
    <option value="Mardin">Mardin</option>
    <option value="Muğla">Muğla</option>
    <option value="Muş">Muş</option>
    <option value="Nevşehir">Nevşehir</option>
    <option value="Niğde">Niğde</option>
    <option value="Ordu">Ordu</option>
    <option value="Rize">Rize</option>
    <option value="Sakarya">Sakarya</option>
    <option value="Samsun">Samsun</option>
    <option value="Siirt">Siirt</option>
    <option value="Sinop">Sinop</option>
    <option value="Sivas">Sivas</option>
    <option value="Tekirdağ">Tekirdağ</option>
    <option value="Tokat">Tokat</option>
    <option value="Trabzon">Trabzon</option>
    <option value="Tunceli">Tunceli</option>
    <option value="Şanlıurfa">Şanlıurfa</option>
    <option value="Uşak">Uşak</option>
    <option value="Van">Van</option>
    <option value="Yozgat">Yozgat</option>
    <option value="Zonguldak">Zonguldak</option>
    <option value="Aksaray">Aksaray</option>
    <option value="Bayburt">Bayburt</option>
    <option value="Karaman">Karaman</option>
    <option value="Kırıkkale">Kırıkkale</option>
    <option value="Batman">Batman</option>
    <option value="Şırnak">Şırnak</option>
    <option value="Bartın">Bartın</option>
    <option value="Ardahan">Ardahan</option>
    <option value="Iğdır">Iğdır</option>
    <option value="Yalova">Yalova</option>
    <option value="Karabük">Karabük</option>
    <option value="Kilis">Kilis</option>
    <option value="Osmaniye">Osmaniye</option>
    <option value="Düzce">Düzce</option>
    </select>
</div>



<div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">{{ $t('signup.submit') }}</button>
    </form>
  </div>
</template>


<script>
import SignupComposable from '../composables/SignupComposable';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showToast } from '../services/notificationService';

export default {
  setup() {
    const { error, user } = SignupComposable();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const birthDate = ref('');
    const location = ref('');
    const { t } = useI18n();

    const handleSubmit = async () => {
      await user(email.value, password.value, name.value, birthDate.value, location.value);
      showToast(t('alerts.verificationEmailSent'), 'success');
      
    };

    return { name, email, password, birthDate, location, handleSubmit, error,t };
  }
}
</script>


<style scoped>
.container {
  max-width: 500px;
  margin: 30px auto;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #f8f9fa;
}

.form-floating {
  position: relative;
}

.form-floating > input {
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 0; /* Remove margin-bottom for cleaner floating label effect */
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 16px;
  height: 48px;
}

.form-floating > label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  background-color: transparent; /* Ensure background is transparent */
  padding: 0 5px;
  pointer-events: none;
  transition: all 0.3s;
}

.form-floating > input:focus + label,
.form-floating > input:not(:placeholder-shown) + label {
  top: -15px; /* Adjust this value based on your padding and height */
  font-size: 15px;
  color: #007bff;
}

input[type="date"] {
  height: auto; /* Adjust height to auto for the date picker */
  padding: 12px 15px; /* Ensure internal elements are visible */
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

input, button {
  height: 48px;
  font-size: 18px;
}

.alert {
  font-size: 14px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
}

button {
  padding: 12px 0;
  background-color: #0056b3;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #004494;
}
</style>