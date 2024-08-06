<template>
  <div>
    <div class="container mt-5">
      <div class="kosullar bg-light p-4 rounded">
        <h4 class="text-center mb-4">{{ $t('terms.title') }}</h4>
        <p>{{ $t('terms.intro') }}</p>
        <p>{{ $t('terms.disclaimer') }}</p>
        <p>{{ $t('terms.ageRestriction') }}</p>
        <p>{{ $t('terms.contentOwnership') }}</p>
        <p>{{ $t('terms.usageRestrictions') }}</p>
        <p>{{ $t('terms.registrationRequired') }}</p>
        <p>{{ $t('terms.respectPrivacy') }}</p>
        <p>{{ $t('terms.disclaimerDataBreach') }}</p>
      </div>
    </div>
  </div>
  </template>

  <script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();  // Destructuring the translation function `t` from useI18n
    return { t };  // Return `t` so it can be used in the template
  }
}
</script>

<style>
.kosullar {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
  padding: 20px;
}
</style>
