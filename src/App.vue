<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView
  }
}
</script>

<template>
  <div>
    <div class="main-container">
      <header class="nav-header">
        <img
          alt="Vue logo"
          class="pulsating-image"
          src="@/assets/logo.svg"
          width="60"
          height="60"
        />

        <nav>
          <RouterLink to="/" :class="{ active: $route.path === '/' }">📃 notes list</RouterLink>
          <RouterLink to="/edit" :class="{ active: $route.path === '/edit' }"
            >➕ add/edit note</RouterLink
          >
        </nav>
      </header>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './App.styles.scss';
</style>
