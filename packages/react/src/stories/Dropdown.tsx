import * as React from 'react'

import {tw} from 'twind'

export function Dropdown({children, right = false, name}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <button
        className={tw`px-4 py-2 hover:bg-gray-700 rounded-md`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{name}</span>
        <svg
          style={{display: 'inline'}}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={tw`bg-white text-gray-800 mt-4 px-4 py-3 mx-auto border-1 rounded-md shadow-sm absolute ${
          right ? 'right-0' : 'left-0'
        } transform transition-all ${
          isOpen ? '-translate-y-1.5' : 'opacity-0 invisible'
        }`}
        role="menu"
      >
        {children}
      </div>
    </div>
  )
}
