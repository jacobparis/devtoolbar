import * as React from 'react'

import {tw} from 'twind'

export function Button({name, active = false, ...props}) {
  return (
    <div>
      <button
        className={tw`py-2 px-4 ${
          active ? 'bg-gray-500' : ''
        } hover:bg-gray-700 rounded-md`}
        {...props}
      >
        {name}
      </button>
    </div>
  )
}
