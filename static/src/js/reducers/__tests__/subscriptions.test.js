import subscriptionsReducer from '../subscriptions'

import {
  FINISHED_SUBSCRIPTIONS_TIMER,
  LOADED_SUBSCRIPTIONS,
  LOADING_SUBSCRIPTIONS,
  STARTED_SUBSCRIPTIONS_TIMER,
  UPDATE_SUBSCRIPTION_RESULTS
} from '../../constants/actionTypes'

const initialState = {
  byId: {},
  isLoading: false,
  isLoaded: false,
  error: null,
  timerStart: null,
  loadTime: 0
}

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { type: 'dummy_action' }

    expect(subscriptionsReducer(undefined, action)).toEqual(initialState)
  })
})

describe('STARTED_SUBSCRIPTIONS_TIMER', () => {
  test('returns the correct state', () => {
    const action = {
      type: STARTED_SUBSCRIPTIONS_TIMER
    }

    // Mock current time to equal 5
    jest.spyOn(Date, 'now').mockImplementation(() => 5)

    const expectedState = {
      ...initialState,
      timerStart: 5
    }

    expect(subscriptionsReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('FINISHED_SUBSCRIPTIONS_TIMER', () => {
  test('returns the correct state', () => {
    const action = {
      type: FINISHED_SUBSCRIPTIONS_TIMER
    }

    // Set current time to 10, and future time to 15
    // Load time will equal 5
    jest.spyOn(Date, 'now').mockImplementation(() => 15)

    const start = 10

    const expectedState = {
      ...initialState,
      timerStart: null,
      loadTime: 5
    }

    expect(subscriptionsReducer({ ...initialState, timerStart: start }, action))
      .toEqual(expectedState)
  })
})

describe('UPDATE_SUBSCRIPTION_RESULTS', () => {
  test('returns the correct state', () => {
    const action = {
      type: UPDATE_SUBSCRIPTION_RESULTS,
      payload: [{
        collection: {
          conceptId: 'C100000-EDSC',
          title: 'Mattis Justo Vulputate Ullamcorper Amet.'
        },
        collectionConceptId: 'C100000-EDSC',
        conceptId: 'SUB100000-EDSC',
        name: 'Test Subscription',
        query: 'polygon=-18,-78,-13,-74,-16,-73,-22,-77,-18,-78'
      }]
    }

    const expectedState = {
      ...initialState,
      byId: {
        'SUB100000-EDSC': {
          collection: {
            conceptId: 'C100000-EDSC',
            title: 'Mattis Justo Vulputate Ullamcorper Amet.'
          },
          collectionConceptId: 'C100000-EDSC',
          conceptId: 'SUB100000-EDSC',
          name: 'Test Subscription',
          query: 'polygon=-18,-78,-13,-74,-16,-73,-22,-77,-18,-78'
        }
      }
    }

    expect(subscriptionsReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('LOADING_SUBSCRIPTIONS', () => {
  test('returns the correct state', () => {
    const action = {
      type: LOADING_SUBSCRIPTIONS
    }

    const expectedState = {
      ...initialState,
      isLoading: true,
      isLoaded: false
    }

    expect(subscriptionsReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('LOADED_SUBSCRIPTIONS', () => {
  test('returns the correct state', () => {
    const action = {
      type: LOADED_SUBSCRIPTIONS,
      payload: {
        loaded: true
      }
    }

    const expectedState = {
      ...initialState,
      isLoading: false,
      isLoaded: true
    }

    expect(subscriptionsReducer(undefined, action)).toEqual(expectedState)
  })
})
