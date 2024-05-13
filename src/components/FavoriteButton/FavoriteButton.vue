<script>
export default {
  props: {
    isActive: Boolean
  }
}
</script>

<template>
  <button
    class="text-button favicon"
    :class="{ active: isActive }"
    :title="isActive ? 'Remove from favorite' : 'Add to favorite'"
  >
    ⭐
  </button>
</template>

<style>
@import './FavoriteButton.styles.scss';
</style>
