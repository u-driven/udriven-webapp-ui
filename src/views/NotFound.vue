<template>
  <div class="web vh-100 ud-bg">
    <div class="layout-content-inline">
      <div class="layout-content p-7 mt-10 align-items-center" style="height: 100vh">
<!--        <figure>-->
<!--          <img :src="store.themeMode === 'dark' ? notFoundDogDark : notFoundDog" alt="inefi Spotlight" class="img-fluid inefi-dog" />-->
<!--        </figure>-->
        <h3 class="title-font in-fw-bold text-center">{{ $t('NotFound.title_notFound') }}</h3>
        <div class="text-center mt-8 row g-0">
<!--          <el-button @click="$router.push('/overview')" class="col-24 col-sm-auto mt-2">{{ $t('button.goBack') }}</el-button>-->
<!--          <el-button @click="$router.push('/support')" class="col-24 col-sm-auto mt-2" plain>{{ $t('NotFound.link_goToSupport') }}</el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePiStore } from '../store/index.js'
// import notFoundDog from '@/assets/images/inefi_dog_not_found.png'
// import notFoundDogDark from '@/assets/images/inefi_dog_not_found_dark.png'

const store = usePiStore() // vuex 取用
</script>
