<template>
  <button
    :class="
      tw([
        `py-2 px-4 ${active ? 'bg-gray-500' : ''} hover:bg-gray-700 rounded-md`,
      ])
    "
    @click="$emit('click')"
  >
    {{ name }}
  </button>
</template>

<script>
import {tw} from 'twind'

export default {
  name: 'dev-button',

  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    tw,
  },
}
</script>
