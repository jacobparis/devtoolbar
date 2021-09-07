import './DevToolbar.css'

import * as React from 'react'

import {CrossStorageClient} from 'cross-storage'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
// A react component in typescript named HostItem
import Switch from 'react-switch'

const queryClient = new QueryClient()

function HostItem({host, setHost, getHost, optional = false}) {
  const current = window.location.origin === host

  const {isLoading, data} = useQuery(['host', host], () => getHost(host))

  const checked = data === 'true'

  return (
    <li className={`hostItem ${current ? 'current' : ''}`}>
      <a href={host}>{host}</a>
      {optional ? (
        <Switch
          checked={checked}
          onChange={(value) => {
            setHost(host, value)
            queryClient.invalidateQueries(['host', host])
          }}
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
  const storage = React.useRef(null)
  if (storage.current === null) {
    storage.current = new CrossStorageClient(
      'https://cross-storage-hub.vercel.app',
    )
  }

  const [isConnected, setConnected] = React.useState(false)

  React.useEffect(() => {
    if (storage.current) {
      storage.current.onConnect().then(
        () => {
          setConnected(true)
        },
        (error) => {
          console.error(error)
          setConnected(false)
        },
      )
    }
  }, [storage])

  if (typeof window === 'undefined') {
    console.error('Developer Toolbar should not run on the server.')

    return null
  }

  function setHost(host: string, enabled: boolean) {
    if (storage.current) {
      storage.current.set(host, JSON.stringify(enabled))
    }
  }

  function getHost(host: string) {
    if (storage.current) {
      return storage.current.get(host)
    }

    throw new Error('Connect to storage before trying to access it')
  }

  const isLocalhost = window.location.hostname === 'localhost'

  const shouldDisplay = isLocalhost
  return shouldDisplay ? (
    <QueryClientProvider client={queryClient}>
      <div className="toolbar">
        <div> Developer Toolbar </div>
        {hosts && isConnected ? (
          <div>
            <button onClick={() => setIsOpen((open) => !open)}>Host</button>

            <div className={isOpen ? 'menu visible' : 'menu'} role="menu">
              {hosts.production ? (
                <div>
                  <p className="section_heading"> Production </p>
                  <ul className="section_list">
                    {hosts.production.map((host) => (
                      <HostItem
                        key={host}
                        host={host}
                        optional
                        setHost={setHost}
                        getHost={getHost}
                      />
                    ))}
                  </ul>
                </div>
              ) : null}

              {hosts.staging ? (
                <div>
                  <p className="section_heading"> Staging </p>
                  <ul className="section_list">
                    {hosts.staging.map((host) => (
                      <HostItem
                        key={host}
                        host={host}
                        optional
                        setHost={setHost}
                        getHost={getHost}
                      />
                    ))}
                  </ul>
                </div>
              ) : null}

              {hosts.development ? (
                <div>
                  <p className="section_heading"> Development </p>
                  <ul className="section_list">
                    {hosts.development.map((host) => (
                      <HostItem
                        key={host}
                        host={host}
                        optional
                        setHost={setHost}
                        getHost={getHost}
                      />
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </QueryClientProvider>
  ) : null
}
