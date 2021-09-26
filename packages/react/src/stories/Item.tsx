import * as React from 'react'

import {tw} from 'twind'

export function Item({button = false, active = false, ...props}) {
  return button ? (
    <button
      className={tw`list-none px-4 py-2 ${
        active ? 'bg-gray-200' : ''
      } rounded flex justify-between items-center hover:bg-gray-100`}
      {...props}
    />
  ) : (
    <div
      className={tw`list-none px-4 py-2 ${
        active ? 'bg-gray-200' : ''
      } rounded flex justify-between items-center hover:bg-gray-100`}
      {...props}
    />
  )
}
