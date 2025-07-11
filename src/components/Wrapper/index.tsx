export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-20 lg:px-20 xl:px-[80px] 2xl:px-[80px]">
      {children}
    </div>
  )
}
