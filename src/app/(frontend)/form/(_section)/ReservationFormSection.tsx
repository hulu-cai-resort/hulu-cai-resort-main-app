'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { createCustomerAction } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useMemo } from 'react'

// Form validation schema
const formSchema = z.object({
  // Step 1: Reservation Details
  paketActivity: z.string().min(1, 'Pilih paket activity'),
  paketMakan: z.string().min(1, 'Pilih paket makan'),
  projectType: z.string().min(1, 'Pilih tipe project/aktivitas'),
  maxTime: z.string().min(1, 'Pilih maksimal waktu aktivitas'),
  keterangan: z.string().optional(),

  // Step 2: Personal Information
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  nomorTelepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
})

type FormData = z.infer<typeof formSchema>

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2">
      {[1, 2, 3].map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              step <= currentStep ? 'bg-[#06763F] text-white' : 'bg-[#A8B4AE] text-white'
            }`}
          >
            <span className="text-lg font-semibold md:text-xl">{step}</span>
          </div>
          {index < 2 && <div className="mx-2 h-0.5 w-16 bg-[#A8B4AE] md:mx-4 md:w-52"></div>}
        </div>
      ))}
    </div>
  )
}

// Step 1: Reservation Details
function Step1({ form }: { form: any }) {
  const activityOptions = [
    { value: 'outdoor-adventure', label: 'Outdoor Adventure' },
    { value: 'water-sports', label: 'Water Sports' },
    { value: 'hiking', label: 'Hiking & Trekking' },
    { value: 'cultural-tour', label: 'Cultural Tour' },
  ]

  const mealOptions = [
    { value: 'breakfast', label: 'Sarapan' },
    { value: 'lunch', label: 'Makan Siang' },
    { value: 'dinner', label: 'Makan Malam' },
    { value: 'full-board', label: 'Full Board' },
  ]

  const projectOptions = [
    { value: 'team-building', label: 'Team Building' },
    { value: 'corporate-event', label: 'Corporate Event' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'family-gathering', label: 'Family Gathering' },
  ]

  const timeOptions = [
    { value: '2-hours', label: '2 Jam' },
    { value: '4-hours', label: '4 Jam' },
    { value: '6-hours', label: '6 Jam' },
    { value: '1-day', label: '1 Hari' },
  ]

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
        <FormField
          control={form.control}
          name="paketActivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black md:text-xl">
                Paket Activity
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#CACCCF] bg-[#F5F7FA] text-base">
                    <SelectValue placeholder="Pilih paket activity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {activityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paketMakan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black md:text-xl">
                Paket Makan
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#CACCCF] bg-[#F5F7FA] text-base">
                    <SelectValue placeholder="Pilih paket makan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mealOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black md:text-xl">
                Project / Activities Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#CACCCF] bg-[#F5F7FA] text-base">
                    <SelectValue placeholder="Pilih tipe project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black md:text-xl">
                Maximum time for the activity
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#CACCCF] bg-[#F5F7FA] text-base">
                    <SelectValue placeholder="Pilih maksimal waktu" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="keterangan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold text-black md:text-xl">
              Tambah Keterangan
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tambahkan keterangan tambahan..."
                className="min-h-[100px] border-[#CACCCF] bg-[#F5F7FA] text-base"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

// Step 2: Personal Information
function Step2({ form }: { form: any }) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black md:text-3xl">Informasi Pribadi</h3>
        <p className="mt-2 text-base text-gray-600">
          Lengkapi informasi pribadi Anda untuk melanjutkan reservasi
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black">Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nama lengkap"
                  className="border-[#CACCCF] bg-[#F5F7FA] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Masukkan email"
                  className="border-[#CACCCF] bg-[#F5F7FA] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nomorTelepon"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black">Nomor Telepon</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  className="border-[#CACCCF] bg-[#F5F7FA] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black">Alamat</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan alamat lengkap"
                  className="min-h-[80px] border-[#CACCCF] bg-[#F5F7FA] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

// Step 3: Review
function Step3({ data }: { data: FormData }) {
  const getOptionLabel = (value: string, type: string) => {
    const options = {
      activity: {
        'outdoor-adventure': 'Outdoor Adventure',
        'water-sports': 'Water Sports',
        hiking: 'Hiking & Trekking',
        'cultural-tour': 'Cultural Tour',
      },
      meal: {
        breakfast: 'Sarapan',
        lunch: 'Makan Siang',
        dinner: 'Makan Malam',
        'full-board': 'Full Board',
      },
      project: {
        'team-building': 'Team Building',
        'corporate-event': 'Corporate Event',
        wedding: 'Wedding',
        'family-gathering': 'Family Gathering',
      },
      time: {
        '2-hours': '2 Jam',
        '4-hours': '4 Jam',
        '6-hours': '6 Jam',
        '1-day': '1 Hari',
      },
    }
    return (
      options[type as keyof typeof options]?.[
        value as keyof (typeof options)[keyof typeof options]
      ] || value
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black md:text-3xl">Konfirmasi Reservasi</h3>
        <p className="mt-2 text-base text-gray-600">
          Periksa kembali detail reservasi Anda sebelum mengirim
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#D16E2B]">Detail Reservasi</h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Paket Activity:</span>
              <span className="font-medium">{getOptionLabel(data.paketActivity, 'activity')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paket Makan:</span>
              <span className="font-medium">{getOptionLabel(data.paketMakan, 'meal')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipe Project:</span>
              <span className="font-medium">{getOptionLabel(data.projectType, 'project')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Durasi:</span>
              <span className="font-medium">{getOptionLabel(data.maxTime, 'time')}</span>
            </div>
            {data.keterangan && (
              <div>
                <span className="text-gray-600">Keterangan:</span>
                <p className="mt-1 text-sm">{data.keterangan}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#D16E2B]">Informasi Pribadi</h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama:</span>
              <span className="font-medium">{data.nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Telepon:</span>
              <span className="font-medium">{data.nomorTelepon}</span>
            </div>
            <div>
              <span className="text-gray-600">Alamat:</span>
              <p className="mt-1 text-sm">{data.alamat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReservationFormSection({ phoneNumber }: { phoneNumber: string }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paketActivity: '',
      paketMakan: '',
      projectType: '',
      maxTime: '',
      keterangan: '',
      nama: '',
      email: '',
      nomorTelepon: '',
      alamat: '',
    },
  })

  const validateCurrentStep = async () => {
    if (currentStep === 1) {
      const stepFields = ['paketActivity', 'paketMakan', 'projectType', 'maxTime']
      const isValid = await form.trigger(stepFields as any)
      return isValid
    }
    if (currentStep === 2) {
      const stepFields = ['nama', 'email', 'nomorTelepon', 'alamat']
      const isValid = await form.trigger(stepFields as any)
      return isValid
    }
    return true
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const mapLabel = (value: string, type: string) => {
    const options = {
      activity: {
        'outdoor-adventure': 'Outdoor Adventure',
        'water-sports': 'Water Sports',
        hiking: 'Hiking & Trekking',
        'cultural-tour': 'Cultural Tour',
      },
      meal: {
        breakfast: 'Sarapan',
        lunch: 'Makan Siang',
        dinner: 'Makan Malam',
        'full-board': 'Full Board',
      },
      project: {
        'team-building': 'Team Building',
        'corporate-event': 'Corporate Event',
        wedding: 'Wedding',
        'family-gathering': 'Family Gathering',
      },
      time: {
        '2-hours': '2 Jam',
        '4-hours': '4 Jam',
        '6-hours': '6 Jam',
        '1-day': '1 Hari',
      },
    } as const

    // @ts-ignore
    return options[type]?.[value] || value
  }

  const handleSubmit = async (data: FormData) => {
    startTransition(async () => {
      const result = await createCustomerAction(data)
      if (result.success) {
        toast.success('Reservasi berhasil dikirim!')

        const messageLines = [
          `Halo Admin, saya ${data.nama} ingin melakukan reservasi.`,
          `Paket Activity: ${mapLabel(data.paketActivity, 'activity')}`,
          `Paket Makan: ${mapLabel(data.paketMakan, 'meal')}`,
          `Tipe Project: ${mapLabel(data.projectType, 'project')}`,
          `Durasi: ${mapLabel(data.maxTime, 'time')}`,
        ]

        if (data.keterangan) messageLines.push(`Keterangan: ${data.keterangan}`)

        messageLines.push('')
        messageLines.push('Informasi Kontak:')
        messageLines.push(`Email: ${data.email}`)
        messageLines.push(`Telepon: ${data.nomorTelepon}`)
        messageLines.push(`Alamat: ${data.alamat}`)

        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`
        window.open(waUrl, '_blank')

        form.reset()
        setCurrentStep(1)
      } else {
        toast.error('Terjadi kesalahan saat mengirim reservasi')
      }
    })
  }

  // Prevent form submission via Enter key before final step
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && currentStep < 3) {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-[#D16E2B] md:text-xl">Reservation</h2>
          <h1 className="mt-2 text-2xl font-semibold text-black md:text-4xl">Form Reservasi</h1>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Isi form dibawah ini untuk melakukan reservasi
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 md:mb-12">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onKeyDown={handleKeyDown}
            className="mx-auto max-w-4xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {currentStep === 1 && <Step1 form={form} />}
                {currentStep === 2 && <Step2 form={form} />}
                {currentStep === 3 && <Step3 data={form.getValues()} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 border-2 px-6 py-3 text-sm font-medium ${
                  currentStep === 1
                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                    : 'border-[#06763F] bg-white text-[#06763F] hover:bg-[#06763F] hover:text-white'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>

              {currentStep < 3 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[#06763F] px-6 py-3 text-sm font-medium text-white hover:bg-[#055a30]"
                >
                  Selanjutnya
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="submit"
                  disabled={isPending}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium text-white ${
                    isPending ? 'cursor-not-allowed bg-gray-400' : 'bg-[#06763F] hover:bg-[#055a30]'
                  }`}
                >
                  {isPending ? 'Mengirim...' : 'Kirim Reservasi'}
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
