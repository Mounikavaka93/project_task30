import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/money'
import {
  formatCardExpiry,
  formatCardNumber,
  isValidAddress,
  isValidCardCvc,
  isValidCardExpiry,
  isValidCardNumber,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidPincode,
  isValidUpiId,
} from '../../utils/validation'
import Button from '../ui/Button'
import FormField from '../ui/FormField'

const INITIAL_CHECKOUT = {
  name: '',
  email: '',
  phone: '',
  address: '',
  landmark: '',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '',
  fulfillment: 'delivery',
  tableNumber: '',
  paymentMethod: 'upi',
  upiId: '',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

const FULFILLMENT_OPTIONS = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'pickup', label: 'Pickup' },
  { id: 'dine-in', label: 'Dine in' },
]

const PAYMENT_OPTIONS = [
  { id: 'upi', label: 'UPI' },
  { id: 'cod', label: 'COD' },
  { id: 'card', label: 'Card' },
  { id: 'cafe', label: 'Pay at café' },
]

function validateCheckout(values) {
  const errors = {}
  if (!isValidName(values.name)) errors.name = 'Please enter your name.'
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email.'
  if (!isValidPhone(values.phone)) errors.phone = 'Enter a 10-digit Indian mobile number.'
  if (!isValidAddress(values.address)) errors.address = 'Enter your full delivery / billing address.'
  if (!values.city.trim()) errors.city = 'Enter your city.'
  if (!values.state.trim()) errors.state = 'Enter your state.'
  if (!isValidPincode(values.pincode)) errors.pincode = 'Enter a 6-digit PIN code.'
  if (values.fulfillment === 'dine-in' && !values.tableNumber.trim()) {
    errors.tableNumber = 'Add your table number.'
  }
  if (values.paymentMethod === 'upi' && !isValidUpiId(values.upiId)) {
    errors.upiId = 'Enter a valid UPI ID (for example name@oksbi).'
  }
  if (values.paymentMethod === 'card') {
    if (!isValidName(values.cardName)) errors.cardName = 'Enter the name on the card.'
    if (!isValidCardNumber(values.cardNumber)) errors.cardNumber = 'Enter a 16-digit card number.'
    if (!isValidCardExpiry(values.cardExpiry)) errors.cardExpiry = 'Enter a valid expiry (MM/YY).'
    if (!isValidCardCvc(values.cardCvc)) errors.cardCvc = 'Enter a 3 or 4 digit CVV.'
  }
  if (values.paymentMethod === 'cafe' && values.fulfillment === 'delivery') {
    errors.paymentMethod = 'Pay at café is only for pickup or dine-in. Choose UPI, card, or COD.'
  }
  return errors
}

function ChoiceGroup({ legend, name, value, options, columns = 2, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-caramel">{legend}</legend>
      <div className={`grid gap-2 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {options.map((option) => (
          <label
            key={option.id}
            className={`cursor-pointer rounded-xl border px-2 py-2 text-center text-sm transition ${
              value === option.id
                ? 'border-caramel bg-caramel/15 text-caramel'
                : 'border-cream/15 text-cream/75 hover:border-caramel/40'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={onChange}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function CheckoutForm() {
  const { totals, placeOrder, setPanelView } = useCart()
  const [values, setValues] = useState(INITIAL_CHECKOUT)
  const [errors, setErrors] = useState({})
  const [isPaying, setIsPaying] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    let nextValue = value
    if (name === 'cardNumber') nextValue = formatCardNumber(value)
    if (name === 'cardExpiry') nextValue = formatCardExpiry(value)
    if (name === 'cardCvc') nextValue = value.replace(/\D/g, '').slice(0, 4)
    if (name === 'pincode') nextValue = value.replace(/\D/g, '').slice(0, 6)
    if (name === 'upiId') nextValue = value.trim().toLowerCase()
    setValues((previous) => ({ ...previous, [name]: nextValue }))
    setErrors((previous) => ({ ...previous, [name]: undefined, paymentMethod: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateCheckout(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsPaying(true)
    window.setTimeout(() => {
      placeOrder({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        landmark: values.landmark,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        fulfillment: values.fulfillment,
        tableNumber: values.tableNumber,
        paymentMethod: values.paymentMethod,
        upiId: values.upiId,
        cardLast4: values.cardNumber.replace(/\D/g, '').slice(-4),
      })
      setIsPaying(false)
    }, 900)
  }

  const payLabel =
    values.paymentMethod === 'cod'
      ? `Place COD order · ${formatPrice(totals.total)}`
      : `Pay ${formatPrice(totals.total)}`

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-xs text-cream/55">
        Demo checkout for Aroma Haven, Bengaluru — UPI, card, and COD are simulated. No real money is charged.
      </p>

      <FormField
        idPrefix="checkout"
        tone="dark"
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Your name"
        autoComplete="name"
      />
      <FormField
        idPrefix="checkout"
        tone="dark"
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@email.com"
        autoComplete="email"
      />
      <FormField
        idPrefix="checkout"
        tone="dark"
        label="Mobile"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+91 98765 43210"
        autoComplete="tel"
      />

      <FormField
        idPrefix="checkout"
        tone="dark"
        label="Address"
        name="address"
        as="textarea"
        rows={3}
        value={values.address}
        onChange={handleChange}
        error={errors.address}
        placeholder="House / flat, street, area"
        autoComplete="street-address"
      />
      <FormField
        idPrefix="checkout"
        tone="dark"
        label="Landmark (optional)"
        name="landmark"
        value={values.landmark}
        onChange={handleChange}
        placeholder="Near metro / café landmark"
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          idPrefix="checkout"
          tone="dark"
          label="City"
          name="city"
          value={values.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="Bengaluru"
          autoComplete="address-level2"
        />
        <FormField
          idPrefix="checkout"
          tone="dark"
          label="State"
          name="state"
          value={values.state}
          onChange={handleChange}
          error={errors.state}
          placeholder="Karnataka"
          autoComplete="address-level1"
        />
      </div>
      <FormField
        idPrefix="checkout"
        tone="dark"
        label="PIN code"
        name="pincode"
        value={values.pincode}
        onChange={handleChange}
        error={errors.pincode}
        placeholder="560038"
        inputMode="numeric"
        maxLength={6}
        autoComplete="postal-code"
      />

      <ChoiceGroup
        legend="Order type"
        name="fulfillment"
        value={values.fulfillment}
        options={FULFILLMENT_OPTIONS}
        columns={3}
        onChange={handleChange}
      />

      {values.fulfillment === 'dine-in' ? (
        <FormField
          idPrefix="checkout"
          tone="dark"
          label="Table number"
          name="tableNumber"
          value={values.tableNumber}
          onChange={handleChange}
          error={errors.tableNumber}
          placeholder="e.g. 4"
        />
      ) : null}

      <ChoiceGroup
        legend="Payment"
        name="paymentMethod"
        value={values.paymentMethod}
        options={PAYMENT_OPTIONS}
        onChange={handleChange}
      />
      {errors.paymentMethod ? <p className="text-xs text-red-300">{errors.paymentMethod}</p> : null}

      {values.paymentMethod === 'upi' ? (
        <FormField
          idPrefix="checkout"
          tone="dark"
          label="UPI ID"
          name="upiId"
          value={values.upiId}
          onChange={handleChange}
          error={errors.upiId}
          placeholder="yourname@oksbi"
          autoComplete="off"
        />
      ) : null}

      {values.paymentMethod === 'cod' ? (
        <p className="rounded-xl bg-espresso/60 px-3 py-2 text-xs text-cream/65">
          Pay cash when your order is delivered or handed over. Keep the exact amount ready if you can.
        </p>
      ) : null}

      {values.paymentMethod === 'cafe' ? (
        <p className="rounded-xl bg-espresso/60 px-3 py-2 text-xs text-cream/65">
          Pay at the Indiranagar counter when you pick up or when you are seated.
        </p>
      ) : null}

      {values.paymentMethod === 'card' ? (
        <div className="grid gap-4">
          <FormField
            idPrefix="checkout"
            tone="dark"
            label="Name on card"
            name="cardName"
            value={values.cardName}
            onChange={handleChange}
            error={errors.cardName}
            placeholder="Name on card"
            autoComplete="cc-name"
          />
          <FormField
            idPrefix="checkout"
            tone="dark"
            label="Card number"
            name="cardNumber"
            value={values.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            placeholder="ACCT-000015"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={19}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              idPrefix="checkout"
              tone="dark"
              label="Expiry"
              name="cardExpiry"
              value={values.cardExpiry}
              onChange={handleChange}
              error={errors.cardExpiry}
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength={5}
            />
            <FormField
              idPrefix="checkout"
              tone="dark"
              label="CVV"
              name="cardCvc"
              value={values.cardCvc}
              onChange={handleChange}
              error={errors.cardCvc}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-2 flex flex-col gap-2">
        <Button type="submit" className="w-full" disabled={isPaying}>
          {isPaying ? 'Placing order…' : payLabel}
        </Button>
        <button
          type="button"
          onClick={() => setPanelView('cart')}
          className="cursor-pointer py-2 text-sm text-cream/60 transition hover:text-caramel"
        >
          Back to cart
        </button>
      </div>
    </form>
  )
}
