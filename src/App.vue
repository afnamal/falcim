<template>
 <NavbarMenuVue/>
  <router-view/>
  <FooterCompVue style="margin-top: 220px;"/>
</template>


<script>
import FooterCompVue from "./components/FooterComp.vue";
import NavbarMenuVue from './components/NavbarMenu.vue';

export default {components:{FooterCompVue,NavbarMenuVue}}
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
