<script>
import {defineComponent, computed, ref, watchEffect} from '@vue/composition-api'
import {CrossStorageClient} from 'cross-storage'

import {setup, tw} from 'twind'
import Dropdown from './DevDropdown.vue'
import HostItem from './DevHostItem.vue'
import {useQuery, useQueryProvider} from 'vue-query'

setup({
  hash: true,
})

export default defineComponent({
  name: 'dev-toolbar',

  components: {
    Dropdown,
    HostItem,
  },

  props: {
    hosts: {
      type: Object,
      default: null,
    },
  },

  setup(props) {
    const storage = ref(null)
    if (storage.value === null) {
      storage.value = new CrossStorageClient(
        'https://cross-storage-hub.vercel.app',
      )
    }

    const isConnected = ref(false)

    watchEffect(() => {
      if (storage.value) {
        storage.value.onConnect().then(
          () => {
            isConnected.value = true
          },
          (error) => {
            console.error(error)
            isConnected.value = false
          },
        )
      }
    })

    useQueryProvider()

    const {data: enabledValue} = useQuery(
      ['host', window ? window.location.origin : null],
      () => {
        if (window && window.location) {
          if (window.location.hostname === 'localhost') return 'true'

          return getHost(window.location.origin)
        }
      },
    )

    function setHost({host, value}) {
      if (storage.value) {
        storage.value.set(host, JSON.stringify(value))
      }
    }

    function getHost(host) {
      if (storage.value) {
        return storage.value.get(host)
      }

      throw new Error('Connect to storage before trying to access it')
    }

    const isLocalhost = window.location.hostname === 'localhost'

    return {
      enabledValue,
      isConnected,
      shouldDisplay: computed(() => isLocalhost || enabledValue === 'true'),
      origin: computed(() => window.location.origin),
      getHost,
      setHost,
      tw,
    }
  },
})
</script>

<template>
  <div
    :class="
      tw([
        'relative font-sans px-4 py-2 bg-gray-900 text-gray-100 flex justify-between items-center',
      ])
    "
  >
    <dropdown v-if="hosts && isConnected" :name="origin">
      <div v-if="hosts.production">
        <p :class="tw(`uppercase opacity-60 text-sm mb-0`)">Production</p>
        <ul :class="tw('p-0 mb-2')">
          <host-item
            v-for="host of hosts.production"
            :key="host"
            :host="host"
            optional
            @setHost="setHost($event)"
            :getHost="getHost"
          />
        </ul>
      </div>

      <div v-if="hosts.staging">
        <p :class="tw(`uppercase opacity-60 text-sm mb-0`)">Staging</p>
        <ul :class="tw('p-0 mb-2')">
          <host-item
            v-for="host of hosts.staging"
            :key="host"
            :host="host"
            optional
            @setHost="setHost($event)"
            :getHost="getHost"
          />
        </ul>
      </div>

      <div v-if="hosts.development">
        <p :class="tw(`uppercase opacity-60 text-sm mb-0`)">Development</p>
        <ul :class="tw('p-0 mb-2')">
          <host-item
            v-for="host of hosts.development"
            :key="host"
            :host="host"
            @setHost="setHost($event)"
            :getHost="getHost"
          />
        </ul>
      </div>
    </dropdown>

    <div :class="tw(['flex flex-grow justify-end'])">
      <slot />
    </div>
  </div>
</template>
