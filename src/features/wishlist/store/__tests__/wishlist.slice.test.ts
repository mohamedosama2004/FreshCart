import { wishlistReducer, wishlistSlice } from '../wishlist.slice'
import type { WishlistProduct, WishlistResponse } from '../../types/wishlist.types'

const mockProduct: WishlistProduct = {
  _id: '1',
  title: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  quantity: 10,
  price: 100,
  imageCover: 'image.jpg',
  images: ['img1.jpg'],
  category: { _id: 'cat1', name: 'Category', slug: 'category' },
  subcategory: [{ _id: 'sub1', name: 'Subcategory', slug: 'subcategory', category: 'cat1' }],
  brand: { _id: 'brand1', name: 'Brand', slug: 'brand' },
  ratingsAverage: 4.5,
  ratingsQuantity: 10,
  sold: 50,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  id: '1',
}

const mockProduct2: WishlistProduct = {
  ...mockProduct,
  _id: '2',
  title: 'Test Product 2',
  slug: 'test-product-2',
}

const initialState = {
  wishlistProducts: [] as WishlistProduct[],
  wishlistCount: 0,
  isLoading: false,
  error: null as string | null,
}

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('wishlistSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should return the initial state', () => {
      const result = wishlistReducer(undefined, { type: 'unknown' })
      expect(result.wishlistProducts).toEqual([])
      expect(result.wishlistCount).toBe(0)
      expect(result.isLoading).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('setWishlistInfo', () => {
    it('should set wishlist products and count', () => {
      const payload: WishlistResponse = {
        status: 'success',
        count: 2,
        data: [mockProduct, mockProduct2],
      }

      const result = wishlistReducer(initialState, wishlistSlice.actions.setWishlistInfo(payload))

      expect(result.wishlistProducts).toEqual([mockProduct, mockProduct2])
      expect(result.wishlistCount).toBe(2)
      expect(result.error).toBe(null)
    })
  })

  describe('addProductToWishlist', () => {
    it('should add product to wishlist', () => {
      const result = wishlistReducer(initialState, wishlistSlice.actions.addProductToWishlist(mockProduct))

      expect(result.wishlistProducts).toContainEqual(mockProduct)
      expect(result.wishlistCount).toBe(1)
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should not add duplicate product', () => {
      const stateWithProduct = {
        ...initialState,
        wishlistProducts: [mockProduct],
        wishlistCount: 1,
      }

      const result = wishlistReducer(stateWithProduct, wishlistSlice.actions.addProductToWishlist(mockProduct))

      expect(result.wishlistProducts).toHaveLength(1)
      expect(result.wishlistCount).toBe(1)
    })

    it('should add different product to existing wishlist', () => {
      const stateWithProduct = {
        ...initialState,
        wishlistProducts: [mockProduct],
        wishlistCount: 1,
      }

      const result = wishlistReducer(stateWithProduct, wishlistSlice.actions.addProductToWishlist(mockProduct2))

      expect(result.wishlistProducts).toHaveLength(2)
      expect(result.wishlistCount).toBe(2)
    })
  })

  describe('removeProductFromWishlist', () => {
    it('should remove product from wishlist', () => {
      const stateWithProducts = {
        ...initialState,
        wishlistProducts: [mockProduct, mockProduct2],
        wishlistCount: 2,
      }

      const result = wishlistReducer(stateWithProducts, wishlistSlice.actions.removeProductFromWishlist('1'))

      expect(result.wishlistProducts).toHaveLength(1)
      expect(result.wishlistProducts).not.toContainEqual(expect.objectContaining({ _id: '1' }))
      expect(result.wishlistCount).toBe(1)
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should handle removing non-existent product', () => {
      const stateWithProducts = {
        ...initialState,
        wishlistProducts: [mockProduct],
        wishlistCount: 1,
      }

      const result = wishlistReducer(stateWithProducts, wishlistSlice.actions.removeProductFromWishlist('999'))

      expect(result.wishlistProducts).toHaveLength(1)
      expect(result.wishlistCount).toBe(1)
    })
  })

  describe('clearWishlist', () => {
    it('should clear all products from wishlist', () => {
      const stateWithProducts = {
        ...initialState,
        wishlistProducts: [mockProduct, mockProduct2],
        wishlistCount: 2,
      }

      const result = wishlistReducer(stateWithProducts, wishlistSlice.actions.clearWishlist())

      expect(result.wishlistProducts).toEqual([])
      expect(result.wishlistCount).toBe(0)
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('wishlist-guest')
    })
  })

  describe('setWishlistLoading', () => {
    it('should set loading state to true', () => {
      const result = wishlistReducer(initialState, wishlistSlice.actions.setWishlistLoading(true))

      expect(result.isLoading).toBe(true)
    })

    it('should set loading state to false', () => {
      const loadingState = { ...initialState, isLoading: true }
      const result = wishlistReducer(loadingState, wishlistSlice.actions.setWishlistLoading(false))

      expect(result.isLoading).toBe(false)
    })
  })

  describe('setWishlistError', () => {
    it('should set error message', () => {
      const errorMessage = 'Failed to load wishlist'
      const result = wishlistReducer(initialState, wishlistSlice.actions.setWishlistError(errorMessage))

      expect(result.error).toBe(errorMessage)
    })

    it('should clear error when set to null', () => {
      const errorState = { ...initialState, error: 'Some error' }
      const result = wishlistReducer(errorState, wishlistSlice.actions.setWishlistError(null))

      expect(result.error).toBe(null)
    })
  })
})
