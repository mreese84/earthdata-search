import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Dropdown } from 'react-bootstrap'

import { RadioSettingDropdown } from '../RadioSettingDropdown'

Enzyme.configure({ adapter: new Adapter() })

const itemOnClickCallbackMock = jest.fn()

let windowEventMap = {}

beforeEach(() => {
  jest.clearAllMocks()
  const rootNode = document.createElement('div')
  rootNode.id = 'root'
  document.body.appendChild(rootNode)

  windowEventMap = {}
  window.addEventListener = jest.fn((event, cb) => {
    windowEventMap[event] = cb
  })
})

afterEach(() => {
  const rootNode = document.getElementById('root')
  document.body.removeChild(rootNode)
})

function setup(overrideProps) {
  const props = {
    id: 'radio-setting-dropdown',
    children: null,
    className: null,
    handoffLinks: [],
    activeIcon: '',
    label: 'Label',
    ...overrideProps
  }

  const enzymeWrapper = shallow(<RadioSettingDropdown {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('RadioSettingDropdown component', () => {
  test('renders nothing when no settings are provided', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.type()).toBeNull()
    expect(enzymeWrapper.type()).toBeNull()
  })

  test('renders correctly when items links are provided', () => {
    const { enzymeWrapper } = setup({
      id: 'test-id',
      label: 'menu label',
      settings: [
        {
          label: 'setting label',
          isActive: false,
          onClick: itemOnClickCallbackMock
        }
      ]
    })

    expect(enzymeWrapper.find(Dropdown).length).toEqual(1)
  })
})
