import React from 'react'

import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import {DevToolbar} from './DevToolbar'

export default {
  title: 'DevToolbar',
  component: DevToolbar,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof DevToolbar>

const Template: ComponentStory<typeof DevToolbar> = (args) => (
  <DevToolbar {...args} />
)

export const Empty = Template.bind({})
Empty.args = {
  label: 'DevToolbar',
}

export const WithHosts = Template.bind({})
WithHosts.args = {
  hosts: {
    production: ['https://www.threeq.app'],
    staging: ['https://blag.vercel.com'],
    development: ['http://localhost:3000'],
  },
  label: 'DevToolbar',
}
