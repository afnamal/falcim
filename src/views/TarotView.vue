User
<template>
    <NavbarOrg/>
    <div class="container tarot-container">
      <h1 class="my-4 text-center">{{ $t('tarot.title') }}</h1>
      <p class="text-center mb-4">{{ $t('tarot.subtitle') }}</p>
      <div class="row justify-content-center mb-3">
        <div
          v-for="(card, index) in tarotCards"
          :key="index"
          class="col-4 col-sm-3 col-md-2 mb-2"
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
              {{ index + 1 }}. seçim: {{ card.name }}
            </li>
          </ul>
        </div>
      <div v-if="prediction" class="mb-4">
        <h4>{{ $t('tarot.predictionTitle') }}</h4>
        <p>{{ prediction }}</p>
      </div>
    </div>
  </template>
  <script>
import axios from 'axios';
import { ref } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useI18n } from 'vue-i18n';
import NavbarOrg from '../components/NavbarOrg.vue';

export default {
  components: { LoadingSpinner,NavbarOrg },
  setup() {
    const { t } = useI18n();
    const tarotCards = ref([
      { name: 'The Fool' },
      { name: 'The Magician' },
      { name: 'The High Priestess' },
      { name: 'The Empress' },
      { name: 'The Emperor' },
      { name: 'The Hierophant' },
      { name: 'The Lovers' },
      { name: 'The Chariot' },
      { name: 'Strength' },
      { name: 'The Hermit' },
      { name: 'Wheel of Fortune' },
      { name: 'Justice' },
      { name: 'The Hanged Man' },
      { name: 'Death' },
      { name: 'Temperance' },
      { name: 'The Devil' },
      { name: 'The Tower' },
      { name: 'The Star' },
      { name: 'The Moon' },
      { name: 'The Sun' },
      { name: 'Judgement' },
      { name: 'The World' },
      { name: 'Ace of Cups' },
      { name: 'Ace of Pentacles' },
      { name: 'Ace of Swords' },
      { name: 'Ace of Wands' },
      { name: 'Two of Cups' },
      { name: 'Three of Swords' },
      { name: 'Four of Wands' },
    ]);

    const selectedCards = ref([]);
    const allSelectedCards = ref([]);
    const prediction = ref('');
    const loading = ref(false);
    const step = ref(1);
    const chatQuestion = ref('');
    const userAnswer = ref('');

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
            content:
              'Sen tarot falı bakarsın. Önce kullanıcı 3 kart seçer, daha sonra sen kullanıcıya daha iyi fal bakabilmek için bir soru sorarsın. soru sarabilir miyim diye sormazsın sorunu direkt sorarsın Kullanıcı sorduğun soruya yanıt verir ve 4 kart daha seçer. Sen de tüm seçilen kartlara ve kullanıcının cevabına göre yorum yaparsın.',
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
        chatQuestion.value = response.data.choices[0].message.content;
        allSelectedCards.value = [...selectedCards.value];
        selectedCards.value = [];
        step.value = 2;
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
            content:
              'Sen tarot falı bakarsın. Önce kullanıcı 3 kart seçer, daha sonra sen kullanıcıya daha iyi fal bakabilmek için bir soru sorarsın. Kullanıcı sorduğun soruya yanıt verir ve 4 kart daha seçer.Sorunu sorduktan sonra kullanıya Sen de tüm seçilen kartlara ve kullanıcının cevabına göre yorum yaparsın.',
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
      } catch (error) {
        console.error('Error getting final reading:', error);
        prediction.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      } finally {
        loading.value = false;
      }
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
      t,
    };
  },
};
</script>
<style scoped>
.tarot-container {
  max-width: 960px;
  margin: auto;
  background-color: #f8f9fa;
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
  background-color: #f1f1f1;
  font-weight: bold;
  margin-bottom: 10px; /* Reduced from previously larger margin */
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
.selected-cards-display h4 {
  font-size: 1.2rem;
  color: #333;
}

.selected-cards-display ul {
  list-style-type: none;
  padding: 0;
}

.selected-cards-display li {
  font-size: 1rem;
  color: #666;
}
</style>