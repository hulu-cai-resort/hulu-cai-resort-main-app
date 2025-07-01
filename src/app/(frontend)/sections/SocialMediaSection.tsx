import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { MainPage } from '@/payload-types'

interface SocialMediaSectionProps {
  mainPage: MainPage
}

// TODO: Replace with actual data from CMS when database is populated
const dummySocialData = {
  socialLinks: [
    {
      id: '1',
      platform: 'Instagram',
      username: '@camphulucai.chc',
      url: 'https://instagram.com/camphulucai.chc',
      icon: '📷',
    },
    {
      id: '2',
      platform: 'YouTube',
      username: 'Hulucai.camp',
      url: 'https://youtube.com/hulucai.camp',
      icon: '📺',
    },
  ],
}

export function SocialMediaSection({ mainPage }: SocialMediaSectionProps) {
  // TODO: Use mainPage.socialLinks when database is populated
  const socialLinks = dummySocialData.socialLinks

  return (
    <section className="bg-[#F5F7FA] py-10 lg:py-[64px]">
      <div className="flex justify-center px-8 lg:px-0">
        <div className="w-full max-w-[326px] md:max-w-[900px] lg:max-w-7xl">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-10">
              {/* Background Image */}
              <div className="h-[336px] w-full overflow-hidden bg-gray-200">
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={325}
                      height={336}
                      className="h-full w-full object-cover"
                    />
                  )}
              </div>

              {/* Content Section */}
              <div className="w-full space-y-6">
                {/* Text Content */}
                <div className="space-y-3">
                  <p className="font-raleway text-lg font-semibold leading-[1.33] text-[#D16E2B]">
                    Social Media
                  </p>
                  <div className="space-y-2.5">
                    <h2 className="font-raleway text-[28px] font-semibold leading-[1.07] text-[#1D1D1D]">
                      Let&apos;s Check this out our Social Media
                    </h2>
                    <p className="font-raleway text-sm leading-[1.43] text-[#1D1D1D]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem
                      ipsum dolor
                    </p>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white"
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'Instagram' ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block xl:hidden">
            <div className="flex flex-col items-center justify-center gap-16 sm:px-10 xl:px-0">
              {/* Background Image */}
              <div className="h-[302px] w-[292px] flex-shrink-0 overflow-hidden bg-gray-200">
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={292}
                      height={302}
                      className="h-full w-full object-cover"
                    />
                  )}
              </div>

              {/* Content Section */}
              <div className="w-full space-y-6">
                {/* Text Content */}
                <div className="space-y-2.5">
                  <p className="font-raleway text-xl font-bold leading-[1.2] text-[#D16E2B]">
                    Social Media
                  </p>
                  <div className="space-y-2.5">
                    <h2 className="font-raleway w-[502px] text-[36px] font-semibold leading-[1.28] text-[#1D1D1D]">
                      Let&apos;s Check this out our Social Media
                    </h2>
                    <p className="font-raleway text-base leading-[1.75] text-[#1D1D1D]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem
                      ipsum dolor
                    </p>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div className="flex items-center gap-11">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white"
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'Instagram' ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="flex items-center justify-center gap-16">
              {/* Background Image */}
              <div className="h-[447px] w-[433px] flex-shrink-0 overflow-hidden bg-gray-200">
                {mainPage.socialBackgroundImage &&
                  typeof mainPage.socialBackgroundImage === 'object' && (
                    <Image
                      src={getMediaUrl(mainPage.socialBackgroundImage.url)}
                      alt="Social Media Background"
                      width={433}
                      height={447}
                      className="h-full w-full object-cover"
                    />
                  )}
              </div>

              {/* Content Section */}
              <div className="w-full space-y-[25px]">
                {/* Text Content */}
                <div className="space-y-[23px]">
                  <p className="font-raleway text-xl font-bold leading-[1.2] text-[#D16E2B]">
                    Social Media
                  </p>
                  <div className="space-y-2.5">
                    <h2 className="font-raleway w-full text-[36px] font-semibold leading-[1.28] text-[#1D1D1D]">
                      Let&apos;s Check this out our Social Media
                    </h2>
                    <p className="font-raleway text-base leading-[1.75] text-[#1D1D1D]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem
                      ipsum dolor
                    </p>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div className="flex items-center gap-11">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      className="flex h-[38px] w-[183px] items-center justify-center gap-[7px] rounded-[8px] bg-[#06763F] px-3 text-white transition-colors hover:bg-[#055a2f]"
                    >
                      <div className="flex h-[18px] w-[18px] items-center justify-center">
                        {social.platform === 'Instagram' ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-raleway text-base font-semibold leading-[1.75]">
                        {social.username}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
