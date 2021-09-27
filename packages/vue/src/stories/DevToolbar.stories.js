import DevButton from './DevButton.vue'
import DevDropdown from './DevDropdown.vue'
import DevItem from './DevItem.vue'
import DevToolbar from './DevToolbar.vue'

export default {
  title: 'DevToolbar',
  component: DevToolbar,
}

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {DevToolbar},
  template: '<dev-toolbar v-bind="$props" />',
})

export const Empty = Template.bind({})
Empty.args = {}

export const WithHosts = Template.bind({})
WithHosts.args = {
  hosts: {
    production: ['https://www.threeq.app'],
    staging: ['https://blag.vercel.com'],
    development: ['http://localhost:3000'],
  },
}

export const WithButton = (args) => {
  return {
    components: {
      DevButton,
      DevToolbar,
    },

    data() {
      return {
        isDesignMode: document.designMode === 'on',
      }
    },

    methods: {
      setDesignMode(mode) {
        this.isDesignMode = mode

        document.designMode = this.isDesignMode ? 'on' : 'off'
      },
    },

    template: `
      <dev-toolbar>
        <DevButton v-if="isDesignMode" name="🎨" active @click="setDesignMode(false)" />
        <DevButton v-else name="🎨" @click="setDesignMode(true)" />
      </dev-toolbar>
    `,
  }
}

export const WithDropdown = (args) => {
  return {
    components: {
      DevDropdown,
      DevItem,
      DevToolbar,
    },

    data() {
      return {
        isDesignMode: document.designMode === 'on',
      }
    },

    methods: {
      setDesignMode(mode) {
        this.isDesignMode = mode

        document.designMode = this.isDesignMode ? 'on' : 'off'
      },
    },

    template: `
      <dev-toolbar>
        <dropdown name="⚡️ Triggers" right>
          <DevItem button v-if="isDesignMode" name="🎨" active @click="setDesignMode(false)">
            Disable design mode
          </DevItem>
          <DevItem button v-else name="🎨" @click="setDesignMode(true)">
            Enable design mode
          </DevItem>
        </dropdown>
      </dev-toolbar>
    `,
  }
}
