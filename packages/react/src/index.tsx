import './style.css'

import * as React from 'react'

const config = {
  hosts: {
    production: ['https://www.threeq.app'],
    staging: ['https://blag.vercel.com'],
    development: ['http://localhost:3000'],
  },
}

function HostItem({key, host, children = []}) {
  return (
    <li>
      <a href={host}>{host}</a>
      {children}
    </li>
  )
}

export function DevToolbar() {
  return (
    <div className="toolbar">
      <span> Developer Toolbar </span>
      <div>
        <span> Host </span>
        <div>
          <p> Production </p>
          <ul>
            {config.hosts.production.map((host) => (
              <HostItem key={host} host={host} />
            ))}
          </ul>

          <p> Staging </p>
          <ul>
            {config.hosts.staging.map((host) => (
              <HostItem key={host} host={host} />
            ))}
          </ul>

          <p> Development </p>
          <ul>
            {config.hosts.development.map((host) => (
              <HostItem key={host} host={host} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
