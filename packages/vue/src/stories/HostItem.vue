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
      />
    </template>
  </li>
</template>

<script>
import {tw} from 'twind'
import {defineComponent, ref, computed} from '@vue/composition-api'
import {useQuery, useQueryClient} from 'vue-query'

export default defineComponent({
  name: 'dev-toolbar',

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
