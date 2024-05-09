<template>
  <div>
    <NavbarOrg />
    <div class="container mt-5">
      <div class="row main-container">
        <div class="col-md-6 upload-container">
          <img v-if="buttonActive" :src="newUrl" alt="$t('altText.uploadedPhoto')" class="img-fluid">
          <div v-if="!buttonActive" class="text-center">
            <label for="file-upload2" class="btn btn-primary my-2">
              <img src="../assets/takePhoto.webp" :alt="$t('altText.uploadCupPhoto')" class="img-fluid">
              {{ $t('upload.uploadPhoto') }}
            </label>
            <input id="file-upload2" type="file" @change="handleFileUpload($event)" class="d-none" />
          </div>
          <p class="text-muted">{{ photoUploadedText }}</p>
          <button @click="sendMessage" :disabled="!buttonActive" class="btn btn-success mt-3" :class="{'disabled': !buttonActive}">
            {{ $t('upload.checkFortune') }}
          </button>
        </div>
        <div class="col-md-6 chat-container">
          <div v-if="loading" class="loading-c d-flex justify-content-center align-items-center">
            <LoadingSpinner />
          </div>
          <div class="messages">
            <div v-for="(msg, index) in messages" :key="index" class="p-2">
              <p class="bg-light p-2 rounded">{{ msg.text }}</p>
            </div>
          </div>
          <span @click="readAloud" :disabled="messages.length === 0" class="material-icons" v-if="isReadAloudVisible" style="cursor: pointer;">volume_up</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { ref, onMounted, watch } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import * as tmImage from '@teachablemachine/image';
import NavbarOrg from '../components/NavbarOrg.vue';

export default {
  components: { LoadingSpinner, NavbarOrg },
  setup() {
    const { t, locale } = useI18n();
    const auth = getAuth();
    const db = getFirestore();
    const user = ref(null);
    const userName = ref('');
    const userLocation = ref('');
    const userBirthDate = ref('');
    const messages = ref([]);
    const buttonActive = ref(false);
    const newUrl = ref(null);
    const photoUploadedText = ref('');
    const loading = ref(false);
    const modelUrl = ref("https://teachablemachine.withgoogle.com/models/9F8M8zkGa/");
    let model;
    const supportedLanguages = ['tr', 'en'];
    const isReadAloudVisible = ref(supportedLanguages.includes(locale.value));

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value = authUser;
      }
    });

    watch(locale, (newLocale) => {
      isReadAloudVisible.value = supportedLanguages.includes(newLocale);
    });

    async function loadModel() {
      model = await tmImage.load(modelUrl.value + "model.json", modelUrl.value + "metadata.json");
      console.log("Model yüklendi!", model);
    }

    function typeMessage(newMessage) {
      if (!buttonActive.value) {
        let fullText = newMessage.content;
        let currentChar = 0;
        messages.value.push({ text: '', type: newMessage.type });
        const interval = setInterval(() => {
          if (currentChar < fullText.length) {
            messages.value[messages.value.length - 1].text += fullText[currentChar++];
          } else {
            clearInterval(interval);
          }
        }, 50);
      }
    }

    const readAloud = () => {
      const supportedLocales = {
        'en': 'en-US',
        'tr': 'tr-TR'
      };

      if (supportedLanguages.includes(locale.value)) {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = supportedLocales[locale.value] || 'tr-TR';
        speech.text = messages.value.map(msg => msg.text).join('\n');
        window.speechSynthesis.speak(speech);
      }
    };

    watch(buttonActive, (newVal) => {
      if (newVal) {
        messages.value = messages.value.filter(msg => msg.type !== 'bot');
      }
    });

    onMounted(() => {
      typeMessage({ type: 'bot', content: t('userPrompts.initialPrompt') });
    });

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        newUrl.value = URL.createObjectURL(file);
        photoUploadedText.value = t('systemMessages.loadingPhoto');
        const imageUrl = URL.createObjectURL(file);
        const imageElement = new Image();
        imageElement.src = imageUrl;
        imageElement.onload = async () => {
          if (!model) {
            console.error('Model is not loaded yet.');
            photoUploadedText.value = t('systemMessages.modelNotLoaded');
            return;
          }

          const predictions = await model.predict(imageElement);
          const cupProbability = predictions.find(p => p.className === 'fincan').probability;
          if (cupProbability > 0.5) {
            photoUploadedText.value = t('systemMessages.fortuneReady');
            buttonActive.value = true;
          } else {
            photoUploadedText.value = t('systemMessages.cupNotDetected');
            buttonActive.value = false;
          }
        };
      }
    };

    const sendMessage = async () => {
      loading.value = true;

      const postData = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: t('chat.systemMessage2') },
          {
            role: 'user',
            content: t('chat.userMessage2', {
              name: userName.value,
              location: userLocation.value,
              birthdate: userBirthDate.value
            })
          },
        ],
      };
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, config);
        const botReply = t('chat.coffeeReadingResult', { content: response.data.choices[0].message.content });
        const messageRef = collection(db, 'users', user.value.uid, 'messages');
        await addDoc(messageRef, {
          text: botReply,
          timestamp: serverTimestamp(),
          tipi: "kahvefali",
          title: t('fortuneTypes.coffee'),
          imageUrl: "https://image.cnnturk.com/i/cnnturk/75/740x416/644e0770ae0a8f1610c2a267.jpg"
        });
        messages.value.push({ text: botReply, type: 'bot' });
      } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({ text: t('systemMessages.errorSendingMessage'), type: 'bot' });
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await loadModel();
    });

    onMounted(() => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      if (user) {
        userName.value = user.displayName || 'Kullanıcı';
        const userDoc = doc(db, 'users', user.uid);
        getDoc(userDoc).then((userSnapshot) => {
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            userLocation.value = userData.location;
            userBirthDate.value = userData.birthDate;
          } else {
            console.log('No such document!');
          }
        });
      }
    });

    return {
      messages,
      sendMessage,
      handleFileUpload,
      buttonActive,
      newUrl,
      photoUploadedText,
      loading,
      readAloud,
      isReadAloudVisible
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: auto;
  background-color: #f8f9fa;
}

.main-container {
  padding: 20px;
}

.upload-container, .chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.messages {
  overflow-y: auto;
  max-height: 400px;
  width: 100%;
}

.bg-light {
  background-color: #e9ecef;
}

.btn-primary, .btn-success {
  width: 100%;
  margin-top: 10px;
  background-color: #007bff;
}

.btn-primary:hover, .btn-success:hover {
  background-color: #0056b3;
}

button.disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
