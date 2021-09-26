import React from 'react'

import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import {Button} from './Button'
import {DevToolbar} from './DevToolbar'
import {Dropdown} from './Dropdown'
import {Item} from './Item'

export default {
  title: 'DevToolbar',
  component: DevToolbar,
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

export const WithDropdown: ComponentStory<typeof DevToolbar> = (args) => {
  const [isDesignMode, setIsDesignMode] = React.useState(false)

  React.useEffect(() => {
    document.designMode = isDesignMode ? 'on' : 'off'
  }, [isDesignMode])

  return (
    <DevToolbar {...args}>
      <Dropdown name="⚡️ Triggers" right>
        {isDesignMode ? (
          <Item button active onClick={() => setIsDesignMode(false)}>
            Disable design mode
          </Item>
        ) : (
          <Item button onClick={() => setIsDesignMode(true)}>
            Enable design mode
          </Item>
        )}
      </Dropdown>
    </DevToolbar>
  )
}

export const WithButton: ComponentStory<typeof DevToolbar> = (args) => {
  const [isDesignMode, setIsDesignMode] = React.useState(false)

  React.useEffect(() => {
    document.designMode = isDesignMode ? 'on' : 'off'
  }, [isDesignMode])

  return (
    <DevToolbar {...args}>
      {isDesignMode ? (
        <Button name="🎨" active onClick={() => setIsDesignMode(false)} />
      ) : (
        <Button name="🎨" onClick={() => setIsDesignMode(true)} />
      )}
    </DevToolbar>
  )
}
