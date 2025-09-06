'use client'

import React from 'react'

type Props = {
  onZoomIn: () => void
  onZoomOut: () => void
  zoom: number
}

export function MapControls({ onZoomIn, onZoomOut, zoom }: Props) {
  return (
    <div className="relative h-[250px] w-[250px] overflow-x-hidden rounded-full bg-[#416340] shadow-lg sm:block sm:h-[391px] sm:w-[391px]">
      {/* Controls Container */}
      <div className="absolute left-[64px] flex h-full w-[60px] flex-col items-center justify-center gap-4 sm:left-[100px] sm:w-[94px] sm:gap-6">
        {/* Zoom In */}
        <div className="flex w-16 flex-col items-center gap-[14px]">
          <span className="w-[50px] text-center font-['Raleway'] text-sm text-xs font-semibold leading-[1.67em] text-white sm:w-[55px] sm:text-lg">
            Zoom In
          </span>
          <button
            onClick={onZoomIn}
            disabled={zoom >= 20}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/50 p-2 transition-all hover:bg-white/75 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12 sm:p-[10px]"
          >
            <svg
              className="h-5 w-5 stroke-2 text-white sm:h-6 sm:w-6"
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white bg-opacity-50 transition-all hover:bg-opacity-75 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
          >
            <svg
              className="h-5 w-5 stroke-2 text-white sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span className="w-[50px] text-center font-['Raleway'] text-sm text-xs font-semibold leading-[1.67em] text-white sm:w-[55px] sm:text-lg">
            Zoom Out
          </span>
        </div>
      </div>

      {/* Indicator Bar */}
      <div className="absolute left-[38px] top-[66px] h-[114px] w-[3px] bg-[#D9D9D9] sm:left-[59px] sm:top-[103px] sm:h-[179px] sm:w-[5px]"></div>
    </div>
  )
}
