<template>
  <button
    v-if="button"
    :class="
      tw([
        `list-none px-4 py-2 ${
          active ? 'bg-gray-200' : ''
        } rounded flex justify-between items-center hover:bg-gray-100`,
      ])
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
  <div
    v-else
    :class="
      tw([
        `list-none px-4 py-2 ${
          active ? 'bg-gray-200' : ''
        } rounded flex justify-between items-center hover:bg-gray-100`,
      ])
    "
  >
    <slot />
  </div>
</template>

<script>
import {tw} from 'twind'

export default {
  name: 'item',

  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    tw,
  },
}
</script>
