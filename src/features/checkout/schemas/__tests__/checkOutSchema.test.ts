import { checkOutSchema, type shipingAdressValues } from '../checkOutSchema'

describe('checkOutSchema', () => {
  const validData: shipingAdressValues = {
    details: '123 Main Street, Apt 4B',
    city: 'Cairo',
    phone: '01234567891',
  }

  describe('details validation', () => {
    it('should accept valid details', () => {
      const result = checkOutSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject empty details', () => {
      const result = checkOutSchema.safeParse({ ...validData, details: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Details are required')
      }
    })

    it('should reject details shorter than 10 characters', () => {
      const result = checkOutSchema.safeParse({ ...validData, details: 'Short' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Details must be at least 10 characters')
      }
    })

    it('should reject details longer than 200 characters', () => {
      const result = checkOutSchema.safeParse({ ...validData, details: 'A'.repeat(201) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Details must be at most 200 characters')
      }
    })
  })

  describe('city validation', () => {
    it('should accept valid city', () => {
      const result = checkOutSchema.safeParse({ ...validData, city: 'Alexandria' })
      expect(result.success).toBe(true)
    })

    it('should reject empty city', () => {
      const result = checkOutSchema.safeParse({ ...validData, city: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('City is required')
      }
    })

    it('should reject city longer than 50 characters', () => {
      const result = checkOutSchema.safeParse({ ...validData, city: 'A'.repeat(51) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('City must be at most 50 characters')
      }
    })
  })

  describe('phone validation', () => {
    it('should accept valid Egyptian phone number starting with 010', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '01012345678' })
      expect(result.success).toBe(true)
    })

    it('should accept valid Egyptian phone number starting with 011', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '01112345678' })
      expect(result.success).toBe(true)
    })

    it('should accept valid Egyptian phone number starting with 012', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '01212345678' })
      expect(result.success).toBe(true)
    })

    it('should accept valid Egyptian phone number starting with 015', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '01512345678' })
      expect(result.success).toBe(true)
    })

    it('should reject empty phone', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Phone number is required')
      }
    })

    it('should reject phone without country code', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '1234567890' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid Egyptian phone number format')
      }
    })

    it('should reject phone with wrong format', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '0112345678' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid Egyptian phone number format')
      }
    })

    it('should reject phone with extra digits', () => {
      const result = checkOutSchema.safeParse({ ...validData, phone: '010123456789' })
      expect(result.success).toBe(false)
    })
  })
})
