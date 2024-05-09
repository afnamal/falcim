<template>
  <div class="past-readings container">
    <h2 class="mb-3 text-center">{{ $t('pastReadings.title') }}</h2>
    <div v-if="loading" class="text-center">
      <span class="spinner-border text-primary" role="status"></span>
    </div>
    <div v-if="!loading && readings.length === 0" class="alert alert-info">
      {{ $t('pastReadings.noReadings') }}
    </div>
    <div v-else class="row">
      <div class="col-md-4 mb-4" v-for="reading in readings" :key="reading.id">
        <div class="card h-100 shadow-sm position-relative">
          <img :src="reading.imageUrl ? reading.imageUrl : defaultImage" class="card-img-top" :alt="$t('pastReadings.cardImageAlt')">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ reading.title }}</h5>
            <p class="card-text" v-if="reading.showDetails">{{ reading.text }}</p>
            <button @click="toggleDetails(reading)" class="btn btn-primary mt-auto">
              {{ reading.showDetails ? $t('pastReadings.hideDetails') : $t('pastReadings.viewDetails') }}
            </button>
          </div>
          <div class="card-footer text-muted">
            {{ formatDate(reading.timestamp.toDate()) }}
          </div>
          <span class="material-icons delete-icon" @click="deleteReading(reading.id)">delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useI18n } from 'vue-i18n';
import { orderBy } from 'firebase/firestore';

export default {
  setup() {
    const auth = getAuth();
    const user = ref(null);
    const readings = ref([]);
    const loading = ref(true);
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIuVnpYNMW66gZmUtnQrt3sY8f8q5QMlnUVQZ2T3Km7EOIOft-PSBWlopCUHYNVgoj658&usqp=CAU';
    const db = getFirestore();
    const { t } = useI18n();

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        user.value = authUser;
        fetchReadings();
      }
    });

    const fetchReadings = async () => {
      if (!user.value) return;
      const readingsRef = collection(db, 'users', user.value.uid, 'messages');
      // Sorguyu tarih alanına göre ters sıralama yapacak şekilde düzenleyin
      const q = query(readingsRef, orderBy("timestamp", "desc"));
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
      // Format the date to local string with options
      return date ? new Date(date).toLocaleString("tr-TR", {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) : '';
    }

    const toggleDetails = (reading) => {
      reading.showDetails = !reading.showDetails;
    };

    const deleteReading = async (id) => {
      if (!user.value) return;
      const readingDoc = doc(db, 'users', user.value.uid, 'messages', id);
      await deleteDoc(readingDoc);
      readings.value = readings.value.filter(reading => reading.id !== id);
    };

    watchEffect(() => {
      if (user.value) {
        fetchReadings();
      }
    });

    return { readings, loading, defaultImage, toggleDetails, deleteReading, formatDate, t };
  }
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0,0,0,0.1);
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  flex-grow: 1;
}

.card-title {
  font-size: 1.25rem;
  color: #333;
}

.card-text {
  flex: 1;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-primary:hover {
  background-color: #004494;
  border-color: #003570;
}

.alert-info {
  background-color: #e2f3ff;
  border-color: #b8e2f2;
  color: #31708f;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.delete-icon {
  position: absolute;
  top: 310px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #dc3545;
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: #a71d2a;
}
</style>
