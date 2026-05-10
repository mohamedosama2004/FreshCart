import { contactSchema, subjectOptions, type ContactFormValues } from '../contact.schema'

describe('contactSchema', () => {
  const validData: ContactFormValues = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '01234567891',
    subject: 'order',
    message: 'This is a valid test message with more than 10 characters.',
  }

  describe('name validation', () => {
    it('should accept valid name', () => {
      const result = contactSchema.safeParse({ ...validData, name: 'John' })
      expect(result.success).toBe(true)
    })

    it('should reject empty name', () => {
      const result = contactSchema.safeParse({ ...validData, name: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Full name is required')
      }
    })

    it('should reject name with only 1 character', () => {
      const result = contactSchema.safeParse({ ...validData, name: 'J' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be at least 2 characters')
      }
    })

    it('should reject name longer than 50 characters', () => {
      const result = contactSchema.safeParse({ ...validData, name: 'A'.repeat(51) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be less than 50 characters')
      }
    })
  })

  describe('email validation', () => {
    it('should accept valid email', () => {
      const result = contactSchema.safeParse({ ...validData, email: 'test@example.com' })
      expect(result.success).toBe(true)
    })

    it('should reject empty email', () => {
      const result = contactSchema.safeParse({ ...validData, email: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required')
      }
    })

    it('should reject invalid email format', () => {
      const result = contactSchema.safeParse({ ...validData, email: 'notanemail' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address')
      }
    })
  })

  describe('phone validation', () => {
    it('should accept valid phone number', () => {
      const result = contactSchema.safeParse({ ...validData, phone: '01234567891' })
      expect(result.success).toBe(true)
    })

    it('should accept empty phone (optional)', () => {
      const result = contactSchema.safeParse({ ...validData, phone: undefined })
      expect(result.success).toBe(true)
    })

    it('should reject invalid phone format', () => {
      const result = contactSchema.safeParse({ ...validData, phone: '123' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid phone number')
      }
    })
  })

  describe('subject validation', () => {
    it('should accept valid subject', () => {
      const result = contactSchema.safeParse({ ...validData, subject: 'order' })
      expect(result.success).toBe(true)
    })

    it('should reject empty subject', () => {
      const result = contactSchema.safeParse({ ...validData, subject: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a subject')
      }
    })
  })

  describe('message validation', () => {
    it('should accept valid message', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'This is a valid message.' })
      expect(result.success).toBe(true)
    })

    it('should reject empty message', () => {
      const result = contactSchema.safeParse({ ...validData, message: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message is required')
      }
    })

    it('should reject message shorter than 10 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'Short' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message must be at least 10 characters')
      }
    })

    it('should reject message longer than 1000 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'A'.repeat(1001) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message must be less than 1000 characters')
      }
    })
  })

  describe('subjectOptions', () => {
    it('should have correct number of options', () => {
      expect(subjectOptions).toHaveLength(6)
    })

    it('should have correct option values', () => {
      expect(subjectOptions.map(o => o.value)).toEqual(['order', 'shipping', 'return', 'product', 'feedback', 'other'])
    })
  })
})
