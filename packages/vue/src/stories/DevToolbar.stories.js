import Button from './Button.vue'
import DevToolbar from './DevToolbar.vue'
import Dropdown from './Dropdown.vue'
import Item from './Item.vue'

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
      Button,
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
        <Button v-if="isDesignMode" name="🎨" active @click="setDesignMode(false)" />
        <Button v-else name="🎨" @click="setDesignMode(true)" />
      </dev-toolbar>
    `,
  }
}

export const WithDropdown = (args) => {
  return {
    components: {
      Dropdown,
      Item,
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
          <Item button v-if="isDesignMode" name="🎨" active @click="setDesignMode(false)">
            Disable design mode
          </Item>
          <Item button v-else name="🎨" @click="setDesignMode(true)">
            Enable design mode
          </Item>
        </dropdown>
      </dev-toolbar>
    `,
  }
}
