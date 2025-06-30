'use client'

import React from 'react'

type Props = {
  onZoomIn: () => void
  onZoomOut: () => void
  zoom: number
}

export function MapControls({ onZoomIn, onZoomOut, zoom }: Props) {
  return (
    <div className="relative hidden h-[391px] w-[391px] overflow-x-hidden rounded-full bg-[#416340] shadow-lg sm:block">
      {/* Controls Container */}
      <div className="absolute left-[100px] top-8 flex w-[94px] flex-col gap-6">
        {/* Zoom In */}
        <div className="flex w-16 flex-col items-center gap-[14px]">
          <span className="w-[55px] text-center font-['Raleway'] text-lg font-semibold leading-[1.67em] text-white">
            Zoom In
          </span>
          <button
            onClick={onZoomIn}
            disabled={zoom >= 20}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/50 p-[10px] transition-all hover:bg-white/75 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-6 w-6 stroke-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Dashed Divider */}
        <div className="w-full border-t border-dashed border-white"></div>

        {/* Zoom Out */}
        <div className="flex w-16 flex-col items-center gap-[14px]">
          <button
            onClick={onZoomOut}
            disabled={zoom <= 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white bg-opacity-50 transition-all hover:bg-opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-6 w-6 stroke-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span className="w-[55px] text-center font-['Raleway'] text-lg font-semibold leading-[1.67em] text-white">
            Zoom Out
          </span>
        </div>
      </div>

      {/* Indicator Bar */}
      <div className="absolute left-[59px] top-[103px] h-[179px] w-[5px] bg-[#D9D9D9]"></div>
    </div>
  )
}
