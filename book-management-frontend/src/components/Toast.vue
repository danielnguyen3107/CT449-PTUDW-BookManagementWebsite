<template>
    <div v-if="show" class="toast-container">
      <div class="toast-success">
        <span class="tick-icon">✔️</span>
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const show = ref(false);
  const message = ref('');
  
  // Watch for changes in show to automatically hide the toast after a delay
  watch(show, (value) => {
    if (value) {
      setTimeout(() => {
        show.value = false;
      }, 3000); // Auto hide after 3 seconds
    }
  });
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  }
  
  .toast-success {
    background-color: #32CD32; /* Xanh lá cây */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  
  .tick-icon {
    margin-right: 10px;
  }
  </style>
  