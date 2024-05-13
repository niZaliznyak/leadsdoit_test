<script>
import { NoteElement } from '@/components/NoteElement'

export default {
  components: {
    NoteElement
  }
}
</script>

<template>
  <div>
    <NoteElement
      :title="'I\'m note'"
      :description="'description'"
      :creation-date="new Date()"
      :edit-date="new Date()"
    />
  </div>
</template>
