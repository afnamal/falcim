<template>
 
  <router-view/>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      userLocation: '',
      userBirthDate: '',
      
      messages: []
    };
  },
  methods: {
    async sendMessage() {
      
      this.messages.push({ text: this.userInput, type: 'user' });

      const postData = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Bu bir kahve falı chatbotudur." },
          { role: "user", content: `Adım ${this.userName}, ${this.userLocation} şehrindenim ve doğum tarihim ${this.userBirthDate}. kahve falıma bakmanı istiyorum. önünde bir fincan varmış gibi yorumla. gerçek bir falcı gibi cümleler kur. yaşadığım yere yaşıma göre tahminlerde bulun. söylediğime cevap vermeden direkt kahve falına başla. ondan önce güzel sözler ekleyebilirsin örneğin kahveni iç gerisini bana bırak gibi. ama direkt olarak bana cevap verme örneğin tabii ki 'ismim' gibi cümleler kurma. ve tüm fala tek mesajda bak benden geri dönüş bekleme başka mesaj yazmayacağım` }
        ]
      };
      const config = {
        headers: {
          'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, config);
        const botReply = "Kahve Falı: " + response.data.choices[0].message.content;
        this.messages.push({ text: botReply, type: 'bot' });
      } catch (error) {
        console.error('Error sending message:', error);
        this.messages.push({ text: 'Kahve Falı Chatbot ile iletişimde bir hata oluştu.', type: 'bot' });
      }
      this.userInput = '';
    }
  }
};
</script>

<style>
.chat-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}
.chat-history {
  overflow-y: auto;
  max-height: 300px;
  margin-bottom: 20px;
}
.message {
  margin-bottom: 10px;
}
.user-message {
  background-color: #d1ecf1;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  align-self: flex-end;
  text-align: right;
}
.bot-message {
  background-color: #fff3cd;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  text-align: left;
}
.input-container {
  display: flex;
  flex-direction: column;
}
.input-container input,
.input-container button {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.input-container button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
