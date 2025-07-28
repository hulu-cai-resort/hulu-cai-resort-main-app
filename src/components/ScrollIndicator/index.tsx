import { ChevronsDown } from 'lucide-react'
import Link from 'next/link'

export default function ScrollIndicator({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="relative z-20 -mt-16 flex cursor-pointer justify-center lg:-mt-[64px] lg:justify-center"
    >
      <div className="bg-camp-green-medium flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/50 backdrop-blur-sm lg:h-[48px] lg:w-[48px] lg:border-white lg:bg-white/50">
        <ChevronsDown className="h-6 w-6 text-white lg:h-[24px] lg:w-[24px]" />
      </div>
    </Link>
  )
}
