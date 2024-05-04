<template>
    <div class="past-readings container">
      <h2 class="mb-3">Geçmiş Fallarınız</h2>
      <div v-if="loading" class="text-center">
        <span class="spinner-border text-primary" role="status"></span>
      </div>
      <div v-if="!loading && readings.length === 0" class="alert alert-info">
        Henüz fal kaydınız bulunmamaktadır.
      </div>
      <div v-else class="row">
        <div class="col-md-4 mb-4" v-for="reading in readings" :key="reading.id">
          <div class="card">
            <img :src="reading.imageUrl ? reading.imageUrl : defaultImage" class="card-img-top" alt="Fal Resmi">
            <div class="card-body">
              <h5 class="card-title">{{ reading.title }}</h5>
              <p class="card-text" v-if="reading.showDetails">{{ reading.text }}</p>
              <button @click="toggleDetails(reading)" class="btn btn-primary">
                {{ reading.showDetails ? 'Detayları Gizle' : 'Detayları Gör' }}
              </button>
            </div>
            <div class="card-footer text-muted">
              {{ formatDate(reading.timestamp.toDate()) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import { ref, watchEffect } from 'vue';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  setup() {
    const auth = getAuth();
    const user = ref(null);
    const readings = ref([]);
    const loading = ref(true);
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIuVnpYNMW66gZmUtnQrt3sY8f8q5QMlnUVQZ2T3Km7EOIOft-PSBWlopCUHYNVgoj658&usqp=CAU';
    const db = getFirestore();

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value = authUser;
        fetchReadings();
      }
    });

    const fetchReadings = async () => {
      if (!user.value) return;
      const readingsRef = collection(db, 'users', user.value.uid, 'messages');
      const q = query(readingsRef);
      const querySnapshot = await getDocs(q);
      readings.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp,
        showDetails: false  // İlk durumda detaylar gizli
      }));
      loading.value = false;
    };

    function formatDate(date) {
      return date ? new Date(date).toLocaleDateString("tr-TR") : '';
    }

    const toggleDetails = (reading) => {
      reading.showDetails = !reading.showDetails;
    };

    watchEffect(() => {
      if (user.value) {
        fetchReadings();
      }
    });

    return { readings, loading, defaultImage, toggleDetails, formatDate };
  }
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
.card-img-top {
  height: 200px;  /* Sabit boyut veya responsive bir yapı oluşturun */
  object-fit: cover;
}
.card-body p {
  transition: all 0.3s ease-in-out;
}
</style>
  