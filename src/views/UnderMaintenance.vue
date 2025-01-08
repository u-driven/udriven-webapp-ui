<template>
  <div class="web vh-100 ud-bg">
    <div class="layout-content-inline">
      <div class="layout-content p-7 mt-10 align-items-center" style="height: 100vh">
<!--        <figure>-->
<!--          <img :src="store.themeMode === 'dark' ? maintenanceDogDark : maintenanceDog" alt="inefi Spotlight" class="img-fluid inefi-dog" />-->
<!--        </figure>-->
        <h3 class="title-font in-fw-bold text-center">{{ $t('UnderMaintenance.text_underMaintenance1') }}</h3>
        <h3 class="title-font in-fw-bold text-center pt-1">{{ $t('UnderMaintenance.text_underMaintenance2') }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePiStore } from '../store/index.js'
// import maintenanceDog from '@/assets/images/inefi_dog_maintenance.png'
// import maintenanceDogDark from '@/assets/images/inefi_dog_maintenance_dark.png'

const store = usePiStore() // vuex 取用
</script>
