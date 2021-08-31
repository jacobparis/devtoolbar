import './style.css'

import * as React from 'react'

const config = {
  hosts: {
    production: ['https://www.threeq.app'],
    staging: ['https://blag.vercel.com'],
    development: ['http://localhost:3000'],
  },
}

export function DevToolbar() {
  return (
    <div className="toolbar">
      <span> Developer Toolbar </span>
      <div>
        <span> Host: </span>
        <div>
          <p> Production </p>
          <ul>
            {config.hosts.production.map((host) => (
              <li key={host}> {host} </li>
            ))}
          </ul>

          <p> Staging </p>
          <ul>
            {config.hosts.staging.map((host) => (
              <li key={host}> {host} </li>
            ))}
          </ul>

          <p> Development </p>
          <ul>
            {config.hosts.development.map((host) => (
              <li key={host}> {host} </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
