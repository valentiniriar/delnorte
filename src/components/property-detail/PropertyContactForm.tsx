'use client'

import { useEffect, useState } from 'react'
import { X, Loader2, CheckCircle2, MessageCircle, CalendarDays } from 'lucide-react'
import { submitLead } from '@/lib/track'

interface Props {
  propertyId: string
  propertyTitle: string
  intent: 'inquiry' | 'visit'
  open: boolean
  onClose: () => void
}

export default function PropertyContactForm({
  propertyId,
  propertyTitle,
  intent,
  open,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', company: '' })

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
      // reset para la próxima apertura
      setDone(false)
      setError(null)
      setForm({ name: '', phone: '', email: '', message: '', company: '' })
    }, 250)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.name.trim().length < 2) return setError('Ingresá tu nombre')
    if (!form.phone.trim() && !form.email.trim())
      return setError('Dejá un teléfono o email')

    setSending(true)
    const res = await submitLead({
      property_id: propertyId,
      name: form.name,
      phone: form.phone || undefined,
      email: form.email || undefined,
      message: form.message || undefined,
      intent,
      company: form.company || undefined,
    })
    setSending(false)
    if (res.ok) setDone(true)
    else setError(res.error ?? 'No se pudo enviar')
  }

  const title = intent === 'visit' ? 'Agendar una visita' : 'Consultar por esta propiedad'
  const Icon = intent === 'visit' ? CalendarDays : MessageCircle

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/50 transition-opacity duration-250"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-md bg-surface rounded-t-3xl sm:rounded-2xl shadow-2xl transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center">
              <Icon size={17} className="text-primary" />
            </span>
            <div>
              <h3 className="font-headline font-bold text-primary text-lg tracking-tight leading-tight">
                {title}
              </h3>
              <p className="font-body text-xs text-on-surface-variant line-clamp-1">
                {propertyTitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-on-surface-variant/60 hover:text-primary p-1"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div className="px-6 pb-8 pt-4 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-primary" />
            </div>
            <p className="font-headline font-bold text-primary text-lg">¡Consulta enviada!</p>
            <p className="font-body text-sm text-on-surface-variant mt-1">
              La inmobiliaria te va a contactar a la brevedad.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-primary text-white font-body font-bold text-sm py-3 px-8 rounded-xl"
            >
              Listo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-3">
            {error && (
              <p className="bg-red-50 text-red-700 text-sm font-medium rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Honeypot oculto anti-spam */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="hidden"
              aria-hidden="true"
            />

            <Field
              label="Nombre *"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Tu nombre"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Teléfono"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+54 9 388..."
                type="tel"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="email@ejemplo.com"
                type="email"
              />
            </div>
            <div>
              <label className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">
                Mensaje
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder={
                  intent === 'visit'
                    ? '¿Qué día y horario te queda cómodo?'
                    : 'Contanos qué te interesa saber...'
                }
                className="w-full rounded-lg border border-outline-variant/60 bg-white px-3 py-2 font-body text-sm text-primary resize-none focus:outline-none focus:border-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 text-white font-body font-bold text-sm py-3.5 rounded-xl tracking-tight transition-colors disabled:opacity-70"
            >
              {sending ? <Loader2 size={17} className="animate-spin" /> : <Icon size={17} />}
              {intent === 'visit' ? 'Solicitar visita' : 'Enviar consulta'}
            </button>
            <p className="font-body text-[11px] text-on-surface-variant/70 text-center">
              Tus datos van directo a la inmobiliaria. No los compartimos con terceros.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-outline-variant/60 bg-white px-3 py-2 font-body text-sm text-primary focus:outline-none focus:border-secondary"
      />
    </div>
  )
}
