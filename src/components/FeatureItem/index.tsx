export function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-start gap-3 py-2 md:gap-4 md:py-[6px] lg:py-2">
      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#416340] md:h-2 md:w-2 xl:h-2.5 xl:w-2.5" />
      <p className="flex-1 text-start font-raleway text-[16px] font-normal leading-[1.5] text-[#1D1D1D] md:leading-[1.75]">
        {text}
      </p>
    </div>
  )
}
