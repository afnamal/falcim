<template>
    <div class="doctor-ali">
      <h1>Doktor Ali'ye Soru Sorun</h1>
      <input v-model="userQuestion" placeholder="Sorunuzu buraya yazın" @keyup.enter="askQuestion">
      <button @click="askQuestion">Soru Sor</button>
      <p v-if="answer">{{ answer }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userQuestion: '',
        answer: ''
      };
    },
    methods: {
      askQuestion() {
        const apiURL = 'https://api.openai.com/v1/engines/davinci/completions';
        const headers = {
          headers: {
            'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        };
        const data = {
          prompt: this.userQuestion,
          max_tokens: 150
        };
  
        axios.post(apiURL, data, headers)
          .then(response => {
            this.answer = "Merhaba, ben Doktor Ali. " + response.data.choices[0].text;
          })
          .catch(error => {
            console.error('API Error:', error);
            this.answer = "Üzgünüm, bir hata oluştu.";
          });
      }
    }
  };
  </script>
  
  <style>
  .doctor-ali {
    margin: 20px;
  }
  </style>
  