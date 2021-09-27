<template>
  <div>
    <button
      :class="tw(['px-4 py-2 hover:bg-gray-700 rounded-md'])"
      @click="isOpen = !isOpen"
    >
      <span>{{ name }}</span>
      <svg
        :class="tw(['w-4 h-4'])"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style="display: inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      style="z-index: 1"
      :class="
        tw([
          `bg-white text-gray-800 mt-4 px-4 py-3 mx-auto border-1 rounded-md shadow-sm absolute ${
            right ? 'right-0' : 'left-0'
          } transform transition-all ${
            isOpen ? '-translate-y-1.5' : 'opacity-0 invisible'
          }`,
        ])
      "
      role="menu"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {tw} from 'twind'

export default {
  name: 'dev-dropdown',

  props: {
    hosts: {
      type: Array,
      default: () => [],
    },
    right: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    tw,
  },
}
</script>
