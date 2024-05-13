<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<template>
  <button class="styled-button" :class="color" :type="buttonType">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import './StyledButton.styles.scss';
</style>
