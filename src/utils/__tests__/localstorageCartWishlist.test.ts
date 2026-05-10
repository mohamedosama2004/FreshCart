import {
  getGuestCart,
  setGuestCart,
  clearGuestCart,
  getGuestWishlist,
  setGuestWishlist,
  clearGuestWishlist,
} from '../localstorageCartWishlist'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('localStorage Cart & Wishlist Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getGuestCart', () => {
    it('should return parsed cart from localStorage', () => {
      const mockCart = [{ _id: '1', name: 'Product 1' }]
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockCart))

      const result = getGuestCart()

      expect(localStorageMock.getItem).toHaveBeenCalledWith('cart-guest')
      expect(result).toEqual(mockCart)
    })

    it('should return empty array when localStorage is empty', () => {
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue(null)

      const result = getGuestCart()

      expect(result).toEqual([])
    })

    it('should return empty array on JSON parse error', () => {
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue('invalid json')

      const result = getGuestCart()

      expect(result).toEqual([])
    })
  })

  describe('setGuestCart', () => {
    it('should set cart in localStorage', () => {
      const products = [{ _id: '1', name: 'Product 1' }]

      setGuestCart(products)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cart-guest',
        JSON.stringify(products)
      )
    })
  })

  describe('clearGuestCart', () => {
    it('should remove cart from localStorage', () => {
      clearGuestCart()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('cart-guest')
    })
  })

  describe('getGuestWishlist', () => {
    it('should return parsed wishlist from localStorage', () => {
      const mockWishlist = [{ _id: '1', name: 'Wishlist Item' }]
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockWishlist))

      const result = getGuestWishlist()

      expect(localStorageMock.getItem).toHaveBeenCalledWith('wishlist-guest')
      expect(result).toEqual(mockWishlist)
    })

    it('should return empty array when localStorage is empty', () => {
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue(null)

      const result = getGuestWishlist()

      expect(result).toEqual([])
    })

    it('should return empty array on JSON parse error', () => {
      ;(localStorageMock.getItem as jest.Mock).mockReturnValue('broken json')

      const result = getGuestWishlist()

      expect(result).toEqual([])
    })
  })

  describe('setGuestWishlist', () => {
    it('should set wishlist in localStorage', () => {
      const products = [{ _id: '1', name: 'Wishlist Item' }]

      setGuestWishlist(products)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'wishlist-guest',
        JSON.stringify(products)
      )
    })
  })

  describe('clearGuestWishlist', () => {
    it('should remove wishlist from localStorage', () => {
      clearGuestWishlist()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('wishlist-guest')
    })
  })
})
