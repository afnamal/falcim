<template>
  <div class="container tarot-container">
    <h1 class="my-4 text-center">{{ $t('tarot.title') }}</h1>
    <p class="text-center mb-4">{{ $t('tarot.subtitle') }}</p>
    <button class="btn btn-secondary a-block mx-auto my-4" @click="shuffleCards">
      {{ $t('tarot.shuffleCards') }}
    </button>

    <div class="row justify-content-center mb-3">
      <div
        v-for="(card, index) in tarotCards"
        :key="index"
        class="col-4 col-sm-3 col-md-2 mb-2"
        :style="card.style"
      >
        <div
          class="tarot-card img-fluid d-flex align-items-center justify-content-center position-relative"
          :class="{ selected: allSelectedCards.includes(card) }"
          @click="toggleCardSelection(card)"
        >
          <img src="../assets/tarotArkasi.webp" alt="Card Back" class="card-back img-fluid">
          <i v-if="allSelectedCards.includes(card)" class="fas fa-check position-absolute checkmark"></i>
        </div>
      </div>
    </div>

    <div v-if="step === 1">
      <button
        class="btn btn-primary d-block mx-auto mb-4"
        :disabled="selectedCards.length !== 3"
        @click="submitInitialCards"
      >
        {{ $t('tarot.submitInitialCards') }}
      </button>
    </div>

    <div v-if="step === 2">
      <h4>{{ chatQuestion }}</h4>
      <input
        type="text"
        v-model="userAnswer"
        placeholder="Cevabınızı buraya yazın"
        class="form-control mb-3"
      />
      <button
        class="btn btn-primary d-block mx-auto mb-4"
        :disabled="selectedCards.length !== 4 || userAnswer === ''"
        @click="submitFinalCards"
      >
        {{ $t('tarot.getFinalReading') }}
      </button>
    </div>

    <div v-if="loading" class="d-flex justify-content-center mb-4">
      <LoadingSpinner />
    </div>

    <div v-if="allSelectedCards.length && prediction" class="selected-cards-display">
      <h4>Seçtiğiniz Kartlar:</h4>
      <ul>
        <li v-for="(card, index) in allSelectedCards" :key="card.name">
          <img :src="card.image" alt="card.name" class="card-image">
          {{ index + 1 }}. seçim: {{ card.name }}
        </li>
      </ul>
    </div>

    <div v-if="prediction" class="mb-4">
      <h4>{{ $t('tarot.predictionTitle') }}</h4>
      <p v-html="formatPrediction(prediction)"></p>
      <div class="mt-4 p-3 border-top">
      <div class="d-flex justify-content-center align-items-center position-relative">
        <span @click="readAloud" :disabled="!isReadAloudVisible" class="bi bi-volume-up-fill mx-1"
          style="cursor: pointer; font-size: 1.5rem;"></span>
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
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useI18n } from 'vue-i18n';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  components: { LoadingSpinner },
  setup() {
    const { t, locale } = useI18n();
    const tarotCards = ref([
      { name: 'The Fool', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/255px-RWS_Tarot_00_Fool.jpg' },
      { name: 'The Magician',image:'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
      { name: 'The High Priestess',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/640px-RWS_Tarot_02_High_Priestess.jpg' },
      { name: 'The Empress',image:'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
      { name: 'The Emperor',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/800px-RWS_Tarot_04_Emperor.jpg' },
      { name: 'The Hierophant',image:'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' },
      { name: 'The Lovers' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/RWS_Tarot_06_Lovers.jpg/800px-RWS_Tarot_06_Lovers.jpg'},
      { name: 'The Chariot' ,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wU2SuZcdMG3ZYzBz-rEWpordmqmclHPgI7d7MUdofw&s'},
      { name: 'Strength' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/RWS_Tarot_08_Strength.jpg/800px-RWS_Tarot_08_Strength.jpg'},
      { name: 'The Hermit' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/RWS_Tarot_09_Hermit.jpg/800px-RWS_Tarot_09_Hermit.jpg'},
      { name: 'Wheel of Fortune' ,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv88FSykK7BgbE8dlCbary11KfwqBwl0mUUPGzDwgyKQ&s'},
      { name: 'Justice' ,image:'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg'},
      { name: 'The Hanged Man' ,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqqcOdY-dZMAp2tYLXUf5vKCAtYX0uCcmKeT4cu002A&s'},
      { name: 'Death' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/RWS_Tarot_13_Death.jpg/640px-RWS_Tarot_13_Death.jpg'},
      { name: 'Temperance' ,image:'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg'},
      { name: 'The Devil' ,image:'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg'},
      { name: 'The Tower',image:'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' },
      { name: 'The Star' ,image:'https://ih1.redbubble.net/image.3687510998.4678/fposter,small,wall_texture,product,750x1000.jpg'},
      { name: 'The Moon',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSm0bBgqD-wq1YD0YvySZgCXWOZsxxGdH50UsUml1Sg&s' },
      { name: 'The Sun' ,image:'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg'},
      { name: 'Judgement' ,image:'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg'},
      { name: 'The World' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/RWS_Tarot_21_World.jpg/800px-RWS_Tarot_21_World.jpg'},
      { name: 'Ace of Cups' ,image:'https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg'},
      { name: 'Ace of Pentacles',image:'https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg' },
      { name: 'Ace of Swords' ,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Swords01.jpg/150px-Swords01.jpg'},
      { name: 'Ace of Wands' ,image:'https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg'},
      { name: 'Two of Cups' ,image:'https://upload.wikimedia.org/wikipedia/commons/f/f8/Cups02.jpg'},
      { name: 'Three of Swords' ,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7e9tRWOmBXS6xhwuukqBp4snjQ6jEG9_SUnVA7rC&s'},
      { name: 'Four of Wands' ,image:'https://upload.wikimedia.org/wikipedia/commons/a/a4/Wands04.jpg'},
    ]);

    const selectedCards = ref([]);
    const allSelectedCards = ref([]);
    const prediction = ref('');
    const loading = ref(false);
    const step = ref(1);
    const chatQuestion = ref('');
    const userAnswer = ref('');
    const showShareOptions = ref(false);
    const isReadAloudVisible = ref(true);
    const user = ref(null);
    const auth = getAuth();

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value = authUser;
      }
    });

    const formatPrediction = (text) => {
      // Split text into paragraphs by newline and wrap in <p> tags
      return text.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    };

    const readAloud = () => {
      const supportedLocales = {
        'en': 'en-US',
        'tr': 'tr-TR'
      };

      const synth = window.speechSynthesis;

      // Check if speech synthesis is currently speaking or paused
      if (synth.speaking || synth.paused) {
        synth.cancel(); // Cancel the current speech synthesis
        isReadAloudVisible.value = true;
        return;
      }

      const speech = new SpeechSynthesisUtterance();
      speech.lang = supportedLocales[locale.value] || 'tr-TR';
      speech.text = prediction.value; // Assuming prediction.value is a string

      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
      };

      speech.onend = () => {
        isReadAloudVisible.value = true;
      };

      synth.speak(speech);
      isReadAloudVisible.value = false;
    };

    const toggleShareOptions = () => {
      showShareOptions.value = !showShareOptions.value;
    };

    const shareTo = (platform) => {
      const messageContent = 'Falcımda baktirdiğim bu harika fala bir göz at.\n https://falc-m.vercel.app/#/ \n' + prediction.value;
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
          // Instagram does not support direct sharing via URL parameters.
          alert('Instagram does not support direct sharing. Please copy the text and share manually.');
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }
    };

    const shuffleCards = () => {
      tarotCards.value.forEach(card => {
        // Rastgele bir açı ve mesafe belirleyin
        const angle = Math.random() * 360;  // Dönme açısı
        const distance = Math.random() * 300;  // Mesafe
        const x = distance * Math.cos(angle * Math.PI / 180);  // X koordinatı
        const y = distance * Math.sin(angle * Math.PI / 180);  // Y koordinatı

        // Kartın animasyon stilini ayarlayın
        card.style = `transform: translate(${x}px, ${y}px) rotate(${angle}deg); transition-duration: 0.5s;`;
      });

      // Animasyonun bitmesini bekleyin
      setTimeout(() => {
        // Gerçek karıştırma işlemi
        let currentIndex = tarotCards.value.length, randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [tarotCards.value[currentIndex], tarotCards.value[randomIndex]] = [
            tarotCards.value[randomIndex], tarotCards.value[currentIndex]];
        }

        // Kartların stilini sıfırlayın
        tarotCards.value.forEach(card => {
          card.style = '';  // Stilleri sıfırla, kartları orijinal konumlarına geri getir
        });
      }, 500); // Animasyon süresi
    };

    const toggleCardSelection = (card) => {
      // Check if the card is already selected
      const selectedIndex = allSelectedCards.value.indexOf(card);

      if (selectedIndex !== -1) {
        // Card is already selected, remove it from both selectedCards and allSelectedCards
        allSelectedCards.value.splice(selectedIndex, 1);
        selectedCards.value.splice(selectedIndex, 1);
      } else {
        // Card is not selected, add it if within the allowed limits
        if ((step.value === 1 && selectedCards.value.length < 3) || (step.value === 2 && selectedCards.value.length < 4)) {
          allSelectedCards.value.push(card);
          selectedCards.value.push(card);
        }
      }
    };

    const submitInitialCards = async () => {
      loading.value = true;
      const [selected1, selected2, selected3] = selectedCards.value.map((card) => card.name);
      const postData = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Sen tarot falı bakarsın. Önce kullanıcı 3 kart seçer, daha sonra sen kullanıcıya daha iyi fal bakabilmek için bir soru sorarsın. Kullanıcı sorduğun soruya yanıt verir ve 4 kart daha seçmesini istersin.',
          },
          {
            role: 'user',
            content: `Seçtiğim kartlar: ${selected1}, ${selected2}, ${selected3}.`,
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
        chatQuestion.value = response.data.choices[0].message.content + " Lütfen bu soruyu cevaplayın ve 4 kart daha seçin.";
        step.value = 2;
        allSelectedCards.value = [...selectedCards.value];
        selectedCards.value = [];
      } catch (error) {
        console.error('Error submitting initial cards:', error);
        chatQuestion.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      } finally {
        loading.value = false;
      }
    };

    const submitFinalCards = async () => {
      loading.value = true;
      const [selected1, selected2, selected3, ...rest] = allSelectedCards.value.map((card) => card.name);
      const postData = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Sen tarot falı bakarsın. Önce kullanıcı 3 kart seçer, daha sonra sen kullanıcıya daha iyi fal bakabilmek için bir soru sorarsın. Kullanıcı sorduğun soruya yanıt verir ve 4 kart daha seçer.Sen de tüm seçilen kartlara ve kullanıcının cevabına göre yorum yaparsın.',
          },
          {
            role: 'user',
            content: `Seçtiğim kartlar: ${selected1}, ${selected2}, ${selected3}.`,
          },
          {
            role: 'assistant',
            content: chatQuestion.value,
          },
          {
            role: 'user',
            content: `Kullanıcının cevabı: ${userAnswer.value}`,
          },
          {
            role: 'user',
            content: `Ek olarak seçtiğim kartlar: ${rest.join(', ')}.`,
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
        prediction.value = response.data.choices[0].message.content;
        await savePrediction(); // Save the prediction after receiving it
      } catch (error) {
        console.error('Error getting final reading:', error);
        prediction.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      } finally {
        loading.value = false;
      }
    };

    const savePrediction = async () => {
      const db = getFirestore();
      const messageRef = collection(db, 'users', user.value.uid, 'messages');
      await addDoc(messageRef, {
        text: prediction.value,
        timestamp: serverTimestamp(),
        type: 'tarotfali',
        title: t('fortuneTypes.tarot'),
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg/640px-RWS_Tarot_10_Wheel_of_Fortune.jpg"
      });
    };

    return {
      tarotCards,
      selectedCards,
      allSelectedCards,
      prediction,
      loading,
      step,
      chatQuestion,
      userAnswer,
      toggleCardSelection,
      submitInitialCards,
      submitFinalCards,
      shuffleCards,
      t,
      toggleShareOptions,
      shareTo,
      showShareOptions,
      readAloud,
      isReadAloudVisible,
      formatPrediction
    };
  },
};
</script>

<style scoped>
.tarot-container {
  max-width: 960px;
  margin: 40px auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h4 {
  color: #343a40;
}

.tarot-card {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  height: 110px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s, transform 0.3s;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tarot-card:hover {
  border-color: #007bff;
  transform: scale(1.05);
}

.selected {
  border-color: #28a745;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.5);
}

.card-back {
  max-width: auto;
  height: 100%; /* Ensure the image scales with the card */
  border-radius: 8px;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.checkmark {
  font-size: 24px;
  color: #28a745;
  top: 5px;
  right: 5px;
}

.card-image {
  width: 150px; /* Adjust size as needed */
  height: auto;
  margin-left: 10px; /* Adds space between image and text */
}

.selected-cards-display h4 {
  font-size: 1.2rem;
  color: #343a40;
  margin-top: 20px;
}

.selected-cards-display ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.selected-cards-display li {
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

li img {
  margin-right: 10px;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.border-top {
  border-top: 1px solid #dee2e6 !important;
}

.position-relative {
  position: relative !important;
}

.bi {
  font-size: 1.5rem;
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
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
