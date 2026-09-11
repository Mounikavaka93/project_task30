const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(amount) {
  return rupeeFormatter.format(Number(amount) || 0)
}

export const GST_RATE = 0.05

export function calculateOrderTotals(items, taxRate = GST_RATE) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * taxRate)
  const total = subtotal + tax
  return { subtotal, tax, total }
}

export function paymentSummary(payment) {
  if (!payment) return ''
  if (payment.method === 'upi') return `UPI${payment.upiId ? ` · ${payment.upiId}` : ''}`
  if (payment.method === 'cod') return 'Cash on delivery'
  if (payment.method === 'card') {
    return payment.last4 ? `Card ending ${payment.last4}` : 'Card'
  }
  return 'Pay at café'
}
