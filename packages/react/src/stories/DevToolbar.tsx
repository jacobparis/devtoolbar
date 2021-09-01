import './DevToolbar.css'

import * as React from 'react'

// A react component in typescript named HostItem
import Switch from 'react-switch'

const config = {
  hosts: {
    production: ['https://www.threeq.app'],
    staging: ['https://blag.vercel.com'],
    development: ['http://localhost:3000'],
  },
}

function HostItem({host, optional = false}) {
  const [checked, setChecked] = React.useState(false)
  const current = window.location.origin === host

  return (
    <li className={`hostItem ${current ? 'current' : ''}`}>
      <a href={host}>{host}</a>
      {optional ? (
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
          height={20}
          width={40}
          aria-label="Show toolbar on host"
        />
      ) : null}
    </li>
  )
}

export function DevToolbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const isLocalhost = window.location.hostname === 'localhost'

  const shouldDisplay = isLocalhost
  return shouldDisplay ? (
    <div className="toolbar">
      <span> Developer Toolbar </span>
      <div>
        <button onClick={() => setIsOpen((open) => !open)}> Host </button>

        <div className={isOpen ? 'menu visible' : 'menu'} role="menu">
          <p className="section_heading"> Production </p>
          <ul className="section_list">
            {config.hosts.production.map((host, i) => (
              <HostItem key={host} host={host} optional />
            ))}
          </ul>

          <p className="section_heading"> Staging </p>
          <ul className="section_list">
            {config.hosts.staging.map((host, i) => (
              <HostItem key={host} host={host} optional />
            ))}
          </ul>

          <p className="section_heading"> Development </p>
          <ul className="section_list">
            {config.hosts.development.map((host, i) => (
              <HostItem key={host} host={host} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null
}
