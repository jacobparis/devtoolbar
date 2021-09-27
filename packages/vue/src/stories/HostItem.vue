<template>
  <li
    :class="
      tw([
        `list-none
      px-4
      py-2
      rounded
      flex
      justify-between
      items-center
      ${current ? 'bg-yellow-100' : 'hover:bg-gray-100'}`,
      ])
    "
  >
    <a :class="tw([`pr-8 text-blue-600 hover:underline`])" :href="host">
      {{ host }}
    </a>

    <template v-if="optional">
      <i
        v-if="isLoading"
        style="border-top-color: #333"
        :class="
          tw([
            `inline-block animate-spin w-4 h-4 border-4 border-black border-opacity-30 rounded-full `,
          ])
        "
      />

      <t-toggle
        v-else
        :checked="checked === 'true'"
        @change="
          (value) => {
            $emit('setHost', {host, value})
            queryClient.invalidateQueries(['host', host])
          }
        "
        aria-label="Show toolbar on host"
        :fixedClasses="{
          wrapper: tw(
            'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
          ),
          wrapperChecked: tw(
            'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
          ),
          wrapperDisabled: tw(
            'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
          ),
          wrapperCheckedDisabled: tw(
            'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
          ),
          button: tw(
            'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
          ),
          buttonChecked: tw(
            'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
          ),
          checkedPlaceholder: tw('inline-block'),
          uncheckedPlaceholder: tw('inline-block'),
        }"
        :classes="{
          wrapper: tw(
            'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ),
          wrapperChecked: tw(
            'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ),
          wrapperDisabled: tw(
            'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ),
          wrapperCheckedDisabled: tw(
            'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ),
          button: tw(
            'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
          ),
          buttonChecked: tw(
            'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs',
          ),
          checkedPlaceholder: tw(
            'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
          ),
          uncheckedPlaceholder: tw(
            'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
          ),
        }"
      />
    </template>
  </li>
</template>

<script>
import {tw} from 'twind'
import TToggle from 'vue-tailwind/dist/t-toggle'

import {defineComponent, ref, computed} from '@vue/composition-api'
import {useQuery, useQueryClient} from 'vue-query'

export default defineComponent({
  name: 'dev-toolbar',
  components: {
    TToggle,
  },
  props: {
    host: {
      type: String,
      required: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    getHost: {
      type: Function,
      required: true,
    },
  },
  emits: ['setHost'],

  setup({host, getHost}) {
    const {isLoading, data: checked} = useQuery(['host', host], () =>
      getHost(host),
    )

    return {
      isLoading,
      checked,
      isOpen: ref(false),
      current: computed(() => window.location.origin === host),
      tw,
      queryClient: useQueryClient(),
    }
  },
})
</script>
