import { authSliceReducer, setAuthInfo } from '../auth.slice'
import type { authIntialState } from '../auth.slice'

describe('authSlice', () => {
  const initialState: authIntialState = {
    isAuthinticated: false,
    userInfo: null,
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      const result = authSliceReducer(undefined, { type: 'unknown' })
      expect(result).toEqual(initialState)
    })
  })

  describe('setAuthInfo', () => {
    it('should set authentication to true with user info', () => {
      const userInfo = { name: 'John', email: 'john@example.com', role: 'user', id: '123' }
      const payload: authIntialState = { isAuthinticated: true, userInfo }

      const result = authSliceReducer(initialState, setAuthInfo(payload))

      expect(result.isAuthinticated).toBe(true)
      expect(result.userInfo).toEqual(userInfo)
    })

    it('should set authentication to false with null user info', () => {
      const payload: authIntialState = { isAuthinticated: false, userInfo: null }

      const result = authSliceReducer(initialState, setAuthInfo(payload))

      expect(result.isAuthinticated).toBe(false)
      expect(result.userInfo).toBe(null)
    })

    it('should update user info when already authenticated', () => {
      const authenticatedState: authIntialState = {
        isAuthinticated: true,
        userInfo: { name: 'Jane', role: 'admin' },
      }
      const newUserInfo = { name: 'Jane Updated', role: 'superadmin', id: '456' }
      const payload: authIntialState = { isAuthinticated: true, userInfo: newUserInfo }

      const result = authSliceReducer(authenticatedState, setAuthInfo(payload))

      expect(result.isAuthinticated).toBe(true)
      expect(result.userInfo).toEqual(newUserInfo)
    })
  })
})
