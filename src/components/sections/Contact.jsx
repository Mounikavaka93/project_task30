import { useState } from 'react'
import { CONTACT_INFO } from '../../data/content'
import { isValidEmail, isValidMessage, isValidName, isValidPhone, toTelHref } from '../../utils/validation'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' }

function validateContactForm(values) {
  const errors = {}
  if (!isValidName(values.name)) errors.name = 'Please enter your full name.'
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.'
  if (!isValidPhone(values.phone)) errors.phone = 'Enter a valid phone number.'
  if (!isValidMessage(values.message)) {
    errors.message = 'Tell us a little more (at least 10 characters).'
  }
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitted(true)
    setValues(INITIAL_FORM)
  }

  return (
    <section id="contact" className="bg-latte py-16 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Save a seat, share a story"
          description="Questions, reservations, or a note about your favorite roast — we read every message."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl bg-espresso p-5 text-cream sm:p-9">
              <h3 className="font-display text-2xl">Visit Aroma Haven</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                Walk in for a pour, or write ahead and we will have your table waiting by the window.
              </p>
              <ul className="mt-8 space-y-5 text-sm">
                <li>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-caramel">Address</p>
                  <p className="mt-1">{CONTACT_INFO.address}</p>
                </li>
                <li>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-caramel">Phone</p>
                  <a href={toTelHref(CONTACT_INFO.phone)} className="mt-1 inline-block hover:text-caramel">
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-caramel">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="mt-1 inline-block hover:text-caramel">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-caramel">Hours</p>
                  <div className="mt-2 space-y-1 text-cream/80">
                    {CONTACT_INFO.hours.map((row) => (
                      <p key={row.days}>
                        {row.days}: {row.time}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex h-full flex-col rounded-3xl border border-espresso/5 bg-foam p-4 shadow-[0_20px_60px_rgba(20,12,8,0.08)] sm:p-8"
            >
              {submitted ? (
                <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center text-center">
                  <p className="font-display text-3xl text-espresso">Thank you</p>
                  <p className="mt-3 max-w-sm text-sm text-coffee/75">
                    Your message is on its way. We will get back to you within one café day.
                  </p>
                  <Button className="mt-6" onClick={() => setSubmitted(false)}>
                    Send another note
                  </Button>
                </div>
              ) : (
                <div className="grid flex-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleFieldChange}
                    error={errors.name}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleFieldChange}
                    error={errors.email}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleFieldChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="sm:col-span-2"
                  />
                  <FormField
                    label="Message"
                    name="message"
                    as="textarea"
                    value={values.message}
                    onChange={handleFieldChange}
                    error={errors.message}
                    placeholder="A table for two, a favorite roast, or just hello..."
                    className="sm:col-span-2"
                  />
                  <div className="mt-auto sm:col-span-2">
                    <Button type="submit" variant="dark" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
