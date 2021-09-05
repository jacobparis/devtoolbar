import './DevToolbar.css'

import * as React from 'react'

// A react component in typescript named HostItem
import Switch from 'react-switch'

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

type Props = {
  hosts: {
    [key: string]: string[]
  }
}

export function DevToolbar({hosts}: Props) {
  const [isOpen, setIsOpen] = React.useState(false)

  const isLocalhost = window.location.hostname === 'localhost'

  const shouldDisplay = isLocalhost
  return shouldDisplay ? (
    <div className="toolbar">
      <div> Developer Toolbar </div>
      {hosts ? (
        <div>
          <button onClick={() => setIsOpen((open) => !open)}> Host </button>

          <div className={isOpen ? 'menu visible' : 'menu'} role="menu">
            {hosts.production ? (
              <div>
                <p className="section_heading"> Production </p>
                <ul className="section_list">
                  {hosts.production.map((host, i) => (
                    <HostItem key={host} host={host} optional />
                  ))}
                </ul>
              </div>
            ) : null}

            {hosts.staging ? (
              <div>
                <p className="section_heading"> Staging </p>
                <ul className="section_list">
                  {hosts.staging.map((host, i) => (
                    <HostItem key={host} host={host} optional />
                  ))}
                </ul>
              </div>
            ) : null}

            {hosts.development ? (
              <div>
                <p className="section_heading"> Development </p>
                <ul className="section_list">
                  {hosts.development.map((host, i) => (
                    <HostItem key={host} host={host} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  ) : null
}
