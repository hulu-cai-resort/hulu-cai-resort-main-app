import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-raleway font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-[38px] px-5 py-3 text-base leading-[1.75em]',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-lg px-8',
        sm: 'h-7 px-3 py-2 text-xs font-rethink leading-[1.33em]',
        tab: 'h-8 px-4 py-2.5 text-xs font-normal leading-[1.33em]',
      },
      variant: {
        // Default state - Primary green background
        default:
          'bg-[#06763F] text-white hover:bg-[#416340] disabled:bg-[#A8B4AE] disabled:text-white',

        // Outline state - Transparent background with green border
        outline:
          'border-[1.5px] border-[#06763F] bg-transparent text-[#06763F] hover:bg-[#416340] hover:text-white hover:border-[#416340] disabled:bg-[#A8B4AE] disabled:text-white disabled:border-[#A8B4AE]',

        // Fluid state - Glass effect with blur
        fluid:
          'bg-white border border-primary/60 text-primary backdrop-blur-[20px] hover:bg-white/80 disabled:bg-[#A8B4AE] disabled:text-white disabled:border-[#A8B4AE]',

        // Legacy variants for compatibility
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 ',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
