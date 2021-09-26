import Vue from 'vue'

import {tw} from 'twind'
import VueTailwind from 'vue-tailwind'
import TToggle from 'vue-tailwind/dist/t-toggle'

import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

Vue.use(VueTailwind, {
  't-toggle': {
    component: TToggle,
    fixedClasses: {
      wrapper: tw(
        'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
      ),
      wrapperChecked: tw(
        'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
      ),
      wrapperDisabled: tw(
        'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
      ),
      wrapperCheckedDisabled: tw(
        'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
      ),
      button: tw(
        'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
      ),
      buttonChecked: tw(
        'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
      ),
      checkedPlaceholder: tw('inline-block'),
      uncheckedPlaceholder: tw('inline-block'),
    },

    classes: {
      wrapper: tw(
        'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
      ),
      wrapperChecked: tw(
        'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
      ),
      wrapperDisabled: tw(
        'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
      ),
      wrapperCheckedDisabled: tw(
        'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
      ),
      button: tw(
        'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
      ),
      buttonChecked: tw(
        'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs',
      ),
      checkedPlaceholder: tw(
        'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
      ),
      uncheckedPlaceholder: tw(
        'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
      ),
    },
  },
})

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
