<template>
  <div>
    <div class="container mt-5">
      <div class="row main-container">
        <div class="col-md-6 upload-container">
          <img v-if="buttonActive" :src="newUrl" alt="Uploaded Hand Image" class="img-fluid">
          <div v-if="!buttonActive" class="text-center">
            <label for="file-upload2" class="btn btn-primary my-2">
              <img src="../assets/takeHand.webp" alt="Hand Image Upload" class="img-fluid">
              {{ $t('upload.handPhoto') }}
            </label>
            <input id="file-upload2" type="file" @change="handleFileUpload($event)" class="d-none" />
          </div>
          <p class="text-muted">{{ photoUploadedText }}</p>
          <button @click="sendMessage" :disabled="!buttonActive" class="btn btn-success mt-3" :class="{'disabled': !buttonActive}">{{ $t('actions.readPalm') }}</button>
        </div>
        <div class="col-md-6 chat-container">
          <div v-if="loading" class="loading-c d-flex justify-content-center align-items-center">
            <LoadingSpinner />
          </div>
          <div v-if="messages.length > 0" class="messages">
            <div v-for="(msg, index) in messages" :key="index" class="p-2">
              <p class="bg-light p-2 rounded" v-html="formatMessage(msg.text)"></p>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center position-relative">
              <span @click="readAloud" :disabled="messages.length === 0" class="bi bi-volume-up-fill mx-1"
                v-if="isReadAloudVisible" style="cursor: pointer; font-size: 1.5rem;"></span>
              <button @click="toggleShareOptions" class="btn btn-warning mx-1"><i class="bi bi-share-fill"></i></button>
              <!-- Sharing Options -->
              <transition name="fade">
                <div v-if="showShareOptions" class="share-dropdown position-absolute">
                  <button @click="shareTo('whatsapp')" class="btn btn"><i class="bi bi-whatsapp"></i></button>
                  <button @click="shareTo('facebook')" class="btn btn"><i class="bi bi-facebook"></i></button>
                  <button @click="shareTo('twitter')" class="btn btn"><i class="bi bi-twitter"></i></button>
                  <button @click="shareTo('instagram')" class="btn btn"><i class="bi bi-instagram"></i></button>
                </div>
              </transition>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { ref, onMounted, watch } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import * as tmImage from '@teachablemachine/image';
import { useI18n } from 'vue-i18n';

export default {
  components: { LoadingSpinner },
  setup() {
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
    const modelUrl = ref("https://teachablemachine.withgoogle.com/models/sZdvGcSjR/");
    let model;
    const { t, locale } = useI18n();
    const supportedLanguages = ['tr', 'en'];
    const isReadAloudVisible = ref(supportedLanguages.includes(locale.value));
    const showShareOptions = ref(false);

    watch(locale, (newLocale) => {
      isReadAloudVisible.value = supportedLanguages.includes(newLocale);
    });

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value = authUser;
      }
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


    watch(buttonActive, (newVal) => {
      if (newVal) {
        messages.value = messages.value.filter(msg => msg.type !== 'bot');
      }
    });

    onMounted(() => {
      const messageContent = t('messages.uploadPrompt');
      typeMessage({ type: 'bot', content: messageContent });
    });

    const readAloud = () => {
      const supportedLocales = {
        'en': 'en-US',
        'tr': 'tr-TR'
      };

      const synth = window.speechSynthesis;

      if (synth.speaking || synth.paused) {
        synth.cancel();
        isReadAloudVisible.value = true;
        return;
      }

      const speech = new SpeechSynthesisUtterance();
      speech.lang = supportedLocales[locale.value] || 'tr-TR';
      speech.text = messages.value.map(msg => msg.text).join('\n');

      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
      };

      speech.onend = () => {
        isReadAloudVisible.value = true;
      };

      synth.speak(speech);
      isReadAloudVisible.value = false;
    };

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        newUrl.value = URL.createObjectURL(file);
        photoUploadedText.value = t('upload.uploadingPhoto');
        const imageUrl = URL.createObjectURL(file);
        const imageElement = new Image();
        imageElement.src = imageUrl;
        imageElement.onload = async () => {
          if (!model) {
            console.error('Model is not loaded yet.');
            photoUploadedText.value = t('errors.modelNotLoaded');
            return;
          }

          const predictions = await model.predict(imageElement);
          const cupProbability = predictions.find(p => p.className === 'el').probability;
          if (cupProbability > 0.5) {
            photoUploadedText.value = t('photoFeedback.success');
            buttonActive.value = true;
          } else {
            photoUploadedText.value = t('photoFeedback.failure');
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
          { role: 'system', content: t('chat.systemMessage') },
          {
            role: 'user',
            content: t('chat.userMessage', {
              name: userName.value,
              location: userLocation.value,
              birthdate: userBirthDate.value
            })
          }
        ]
      };
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, config);
        const botReply = t('chat.palmReadingResult', { content: response.data.choices[0].message.content });
        const messageRef = collection(db, 'users', user.value.uid, 'messages');
        await addDoc(messageRef, {
          text: botReply,
          timestamp: serverTimestamp(),
          tipi: "elfali",
          title: t('fortuneTypes.palm'),
          imageUrl: "https://www.efsunasor.com/img/elcizgileri.jpg"
        });
        messages.value.push({ text: formatMessage(botReply), type: 'bot' });
      } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({ text: t('errors.communicationError'), type: 'bot' });
      } finally {
        loading.value = false;
      }
    };

    const formatMessage = (text) => {
      return text.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    };

    const shareTo = (platform) => {
      const messageContent = messages.value.map(msg => msg.text).join('\n');
      const encodedMessage = encodeURIComponent(messageContent);
      let shareUrl;

      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedMessage}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
          break;
        case 'instagram':
          shareUrl = `https://www.instagram.com/?text=${encodedMessage}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }
    };

    const toggleShareOptions = () => {
      showShareOptions.value = !showShareOptions.value;
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
      t,
      readAloud,
      isReadAloudVisible,
      showShareOptions,
      toggleShareOptions,
      shareTo,
      formatMessage
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make sure the main container takes up the full height of the viewport */
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

.share-buttons .btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  color: white;
  margin: 5px;
  transition: all 0.3s;
}

.share-buttons .btn-success {
  background-color: #25D366;
}

.share-buttons .btn-primary {
  background-color: #1877F2;
}

.share-buttons .btn-info {
  background-color: #1DA1F2;
}

.share-buttons .btn-danger {
  background-color: #E1306C;
}

.share-buttons .btn:hover {
  transform: scale(1.1);
}

.btn-warning {
  background-color: #FFC107;
}

.btn-warning:hover {
  background-color: #E0A800;
}

.bi-volume-up-fill {
  font-size: 1.5rem;
  cursor: pointer;
}

.chat-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
}

.share-dropdown {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
