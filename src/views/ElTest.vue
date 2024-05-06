<template>
  <div>
    <NavbarOrg />
    <div class="container mt-5">
      <div class="row main-container">
        <div class="col-md-6 upload-container">
          <img v-if="buttonActive" :src="newUrl" alt="Uploaded Hand Image" class="img-fluid">
          <div v-if="!buttonActive" class="text-center">
            <label for="file-upload2" class="btn btn-primary my-2">
              <img src="https://firebasestorage.googleapis.com/v0/b/chat-api-aa04a.appspot.com/o/site%20photos%2Fels1.1.png?alt=media&token=dcf41e80-4e4a-403f-993e-fb9863b077c6" alt="Hand Image Upload" class="img-fluid">
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
              <p class="bg-light p-2 rounded">{{ msg.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc,  addDoc, collection, serverTimestamp,getDoc } from 'firebase/firestore';
import { ref, onMounted,watch } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue'; // Import the loading spinner component
import * as tmImage from '@teachablemachine/image';
import NavbarOrg from '../components/NavbarOrg.vue'
import { useI18n } from 'vue-i18n';


export default {
  components: { LoadingSpinner,NavbarOrg },
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
    const loading = ref(false); // Add a new data property for loading state
    const modelUrl = ref("https://teachablemachine.withgoogle.com/models/sZdvGcSjR/");
    let model;
    const { t } = useI18n();  // Destructuring the translation function `t` from useI18n


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
    if (!buttonActive.value) {  // Sadece buton aktif değilse mesajı yazdır
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
        // Buton aktif olduğunda, başlangıç mesajını kaldır
        messages.value = messages.value.filter(msg => msg.type !== 'bot');
      }
    });
    onMounted(() => {
      const messageContent = t('messages.uploadPrompt');  // Fetching the localized message
      typeMessage({ type: 'bot', content: messageContent });
      });


    const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      newUrl.value = URL.createObjectURL(file);
      photoUploadedText.value = t('upload.uploadingPhoto');
      const imageUrl = URL.createObjectURL(file);
      const imageElement = new Image();
      imageElement.src = imageUrl;
      imageElement.onload = async () => {
        // Check if the model is loaded
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
      loading.value = true; // Set loading to true before making the API call

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
          tipi:"elfali",
          title:"El Falı",
          imageUrl:"https://www.efsunasor.com/img/elcizgileri.jpg"
        });
        messages.value.push({ text: t('chat.botReply', { content: response.data.choices[0].message.content }), type: 'bot' });
        } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({ text: t('errors.communicationError'), type: 'bot' });
        } finally {
        loading.value = false; // Set loading back to false after receiving the response
      }
    };
    onMounted(async () => {
    const model = await loadModel();
    console.log("Model yüklendi!", model);
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

    return { messages, sendMessage, handleFileUpload, buttonActive, newUrl, photoUploadedText, loading,t };
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: auto;
  background-color: #f8f9fa;  /* Açık gri arkaplan rengi */
}

.main-container {
  padding: 20px;
}

.upload-container, .chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;  /* Alt elemanlarla arasında boşluk */
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 8px; /* Resim köşelerini yuvarlak yap */
}

.messages {
  overflow-y: auto;
  max-height: 400px;
  width: 100%;
}

.bg-light {
  background-color: #e9ecef; /* Bootstrap bg-light rengi ile uyumlu */
}

.btn-primary, .btn-success {
  width: 100%;
  margin-top: 10px;
  background-color: #007bff; /* Mavi tema rengi */
}

.btn-primary:hover, .btn-success:hover {
  background-color: #0056b3; /* Hover durumunda daha koyu mavi */
}

button.disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>

