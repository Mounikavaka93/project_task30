const FIELD_CLASS =
  'w-full rounded-xl border border-espresso/10 bg-latte px-4 py-3 text-sm text-espresso outline-none transition duration-300 placeholder:text-mocha/50 focus:border-caramel focus:ring-2 focus:ring-caramel/30'

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
  as = 'input',
  rows = 5,
  className = '',
  idPrefix = 'field',
  maxLength,
  inputMode,
  tone = 'light',
}) {
  const fieldId = `${idPrefix}-${name}`
  const Control = as === 'textarea' ? 'textarea' : 'input'
  const labelClass = tone === 'dark' ? 'text-caramel' : 'text-mocha'
  const errorClass = tone === 'dark' ? 'text-red-300' : 'text-red-700'

  return (
    <label htmlFor={fieldId} className={`block ${className}`}>
      <span className={`mb-1.5 block text-xs font-medium uppercase tracking-wider ${labelClass}`}>
        {label}
      </span>
      <span className="field-liquid block">
        <Control
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          inputMode={inputMode}
          className={as === 'textarea' ? `${FIELD_CLASS} resize-y` : FIELD_CLASS}
          {...(as === 'textarea' ? { rows } : { type })}
        />
      </span>
      {error ? <p className={`mt-1 text-xs ${errorClass}`}>{error}</p> : null}
    </label>
  )
}
