import * as React from 'react'

import {CrossStorageClient} from 'cross-storage'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
// A react component in typescript named HostItem
import Switch from 'react-switch'
import {tw} from 'twind'

import {Dropdown} from './Dropdown'

const queryClient = new QueryClient()

type Props = {
  hosts: {
    [key: string]: string[]
  }
  children: React.ReactNode
}

export function DevToolbar(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toolbar {...props} />
    </QueryClientProvider>
  )
}

function Toolbar({hosts, children}: Props) {
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

  const {data: enabledValue} = useQuery(
    ['host', window ? window.location.origin : null],
    () => {
      if (window && window.location) {
        if (window.location.hostname === 'localhost') return 'true'

        return getHost(window.location.origin)
      }
    },
  )

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

  const shouldDisplay = isLocalhost || enabledValue === 'true'
  return shouldDisplay ? (
    <QueryClientProvider client={queryClient}>
      <div
        className={tw`font-sans px-4 py-2 bg-gray-900 text-gray-100 flex justify-between items-center`}
      >
        {hosts && isConnected ? (
          <Dropdown name={window.location.origin}>
            {hosts.production ? (
              <div>
                <p className={tw`uppercase opacity-60 text-sm mb-0`}>
                  Production
                </p>
                <ul className={tw`p-0 mb-2`}>
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
                <p className={tw`uppercase opacity-60 text-sm mb-0`}>Staging</p>
                <ul className={tw`p-0 mb-2`}>
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
                <p className={tw`uppercase opacity-60 text-sm mb-0`}>
                  Development
                </p>
                <ul className={tw`p-0 mb-2`}>
                  {hosts.development.map((host) => (
                    <HostItem
                      key={host}
                      host={host}
                      setHost={setHost}
                      getHost={getHost}
                    />
                  ))}
                </ul>
              </div>
            ) : null}
          </Dropdown>
        ) : null}

        <div className={tw`flex flex-grow justify-end`}>{children}</div>
      </div>
    </QueryClientProvider>
  ) : null
}

function HostItem({host, setHost, getHost, optional = false}) {
  const current = window.location.origin === host

  const {isLoading, data: checked} = useQuery(['host', host], () =>
    getHost(host),
  )

  return (
    <li
      className={tw`list-none px-4 py-2 rounded flex justify-between items-center ${
        current ? 'bg-yellow-100' : 'hover:bg-gray-100'
      }`}
    >
      <a className={tw`pr-8 text-blue-600 hover:underline`} href={host}>
        {host}
      </a>
      {optional ? (
        isLoading ? (
          <i
            style={{borderTopColor: '#333'}}
            className={tw`inline-block animate-spin w-4 h-4 border-4 border-black border-opacity-30 rounded-full `}
          />
        ) : (
          <Switch
            checked={checked === 'true'}
            onChange={(value) => {
              setHost(host, value)
              queryClient.invalidateQueries(['host', host])
            }}
            height={20}
            width={40}
            aria-label="Show toolbar on host"
          />
        )
      ) : null}
    </li>
  )
}
