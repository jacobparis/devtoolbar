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

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'DevToolbar',
}
