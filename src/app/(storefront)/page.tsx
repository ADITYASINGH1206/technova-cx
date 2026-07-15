"use client";

import Link from "next/link";

export default function StorefrontHomePage() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden">
      {/* Main Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="relative w-full h-[921px] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover opacity-90 object-center" 
              alt="Hero Background" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-6QQ7_qvdzBMwY-UZj0_tjTdZGMVAdl_PbcFS0dU7l8uabkkVkk-e1jOEe0ZU1vYO6RZvFfRicvwGfyBpQx5Pe23B3QnZAX-xQtn1-_ALvXC7dULUJD5mD9SKeBzX5Inx7sP1g1IjbVi03mWrSrEZh7K_XsFxFBOdrJnMgn-JjD2vYb_qfhB2qa6bsgF1IWMvc71mZiEyva03iChBFFk1iuyn_-E6B98cARbUksbFYGmh58pNXMUPwQ" 
            />
          </div>
          
          {/* Hero Content Overlay (Glassmorphism) */}
          <div className="relative z-10 text-center max-w-3xl mx-auto px-margin-mobile md:px-0">
            <div className="bg-white/70 backdrop-blur-[20px] p-unit-xl rounded-xl inline-block shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-unit-md">
                Engineer the Future.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-unit-lg max-w-xl mx-auto">
                Experience uncompromised performance wrapped in absolute precision. Discover the next generation of computing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-unit-md">
                <Link href="/shop" className="w-full sm:w-auto bg-primary text-on-primary px-unit-lg py-unit-sm rounded-full font-label-md text-label-md hover:scale-98 active:scale-95 transition-transform duration-200 inline-block">
                  Explore Collection
                </Link>
                <button className="w-full sm:w-auto bg-transparent border border-secondary text-secondary px-unit-lg py-unit-sm rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200">
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Tech Carousel */}
        <section className="py-unit-xxl bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-unit-lg flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Trending Tech</h2>
            <Link href="/shop" className="font-label-md text-label-md text-primary hover:underline">View All</Link>
          </div>
          <div className="w-full overflow-x-auto hide-scrollbar pl-margin-mobile md:pl-margin-desktop pr-margin-mobile md:pr-margin-desktop pb-unit-lg">
            <div className="flex space-x-gutter w-max">
              
              {/* Product Card 1 */}
              <Link href="/product/prod-1" className="w-72 sm:w-80 flex-shrink-0 group cursor-pointer block">
                <div className="bg-tertiary-fixed/30 rounded-lg h-80 mb-unit-sm overflow-hidden relative flex items-center justify-center p-unit-lg transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                  <img 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                    alt="Aura Pro Max" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0sjLmJYmAgZlOAaAf8h_XvTrB9QVCmQKxg1VxG4xr1IiTb7EQ4tu2G3TT3bcA-VDATIe8lpimvsk2QAbFozzZq3ZfyuX6oWmgtgYZGIF5X1pbLXCPSnvgae1UKhx87GSZPQ5raq1hzLCQppoG6LFBXODnpmqFm84UDAXQu1fVHB3-eMK6jmdYnC9-lkMDJeTz572nrE_Rt4idCV_pq5QTzcnh0SCxHrR1mYzcsCllYKl8_AdTcddtbQ" 
                  />
                  <div className="absolute top-unit-sm left-unit-sm bg-surface/80 backdrop-blur-sm px-unit-sm py-unit-xs rounded font-label-sm text-label-sm text-on-surface">
                    New
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-xs">Aura Pro Max</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-unit-xs">Spatial Audio Headphones</p>
                <p className="font-label-md text-label-md text-primary">$349</p>
              </Link>

              {/* Product Card 2 */}
              <Link href="/product/prod-2" className="w-72 sm:w-80 flex-shrink-0 group cursor-pointer block">
                <div className="bg-tertiary-fixed/30 rounded-lg h-80 mb-unit-sm overflow-hidden relative flex items-center justify-center p-unit-lg transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                  <img 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                    alt="Nova Phone 12" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS4EJvb8EhABEaN8E3HsLb6Y1wigIlsrk6zUA2Yz0-HpWV6E7hjlQ5UKNt5OmWHtUwIEnEupNUNAM0suOp4PHXG-AbW2ur4SPxyf_43wyd20rhih_aTiBNlxycfeJ7D5QALdvDa6-n_9qA7N0sLFzKDk8vXSPAP1KL8uhAt34qpwsrHNHcjf_fE4mMvOpixdKvJxJ3cZp_jyi6j1yhNxVCj2mwOq3TY8QSd_ZzU5C55fsqtwO6AhaNJQ" 
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-xs">Nova Phone 12</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-unit-xs">Edge-to-edge display</p>
                <p className="font-label-md text-label-md text-primary">$899</p>
              </Link>

              {/* Product Card 3 */}
              <Link href="/product/prod-3" className="w-72 sm:w-80 flex-shrink-0 group cursor-pointer block">
                <div className="bg-tertiary-fixed/30 rounded-lg h-80 mb-unit-sm overflow-hidden relative flex items-center justify-center p-unit-lg transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                  <img 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                    alt="Chrono Watch S" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe3T9kp3jWPcLqv7NhDE9zr2X1oaZXJmeomy47ZQd_Cyy8sBAzIUoBK3JLJ6qnk3ZHfQQAgSNyRyUImjqr7TzoSacPxecn2OoNrZA2G6f23E_mmenGEKWZYuBstj__CXVjboV-z-yRrQbPipAhzEURMenNZSvPEAqVRuXulkTtmuNejktCdNAVsHIbz1G9COFjF7f_vquDN9dtRNBjRfoIXQNBV-sDa5U8LDmGebrWwNIQ7EN15ixvfg" 
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-xs">Chrono Watch S</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-unit-xs">Titanium Edition</p>
                <p className="font-label-md text-label-md text-primary">$499</p>
              </Link>

              {/* Product Card 4 */}
              <Link href="/product/prod-4" className="w-72 sm:w-80 flex-shrink-0 group cursor-pointer block">
                <div className="bg-tertiary-fixed/30 rounded-lg h-80 mb-unit-sm overflow-hidden relative flex items-center justify-center p-unit-lg transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                  <img 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                    alt="ZenBook Air" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPG6P52VF2_QljRyFxU6-hMxWi5RhxCluAu069-yfx_wT2Tl8h_hnWfErOV_99IRyxatoYfuipy11DOLNl1VmfgQ3wXPQN58CzZsfZHOMDH3-Dzl1Tvo0VyYmAR4koaaJAdeaAJJqnpzCiouevfmvOGCP3VUtlBoCon__Vzmqv0JURQJSLFWfMlRMgnQQrWlUrlpkHy4oU8YkyCQzQc2rFeV7rC2kTqAqyvinhRF0rLLxqJMfBuKDr6g" 
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-xs">ZenBook Air</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-unit-xs">M3 Processing Power</p>
                <p className="font-label-md text-label-md text-primary">$1299</p>
              </Link>

            </div>
          </div>
        </section>

        {/* Category Bento Grid */}
        <section className="py-unit-xxl bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-unit-xl text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter h-[800px] md:h-[600px]">
              
              {/* Main Large Feature (Computing) */}
              <div className="md:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer h-full">
                <img 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Computing" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXMPMwV1pq4UiVe_zZhZmwNRACITHw7UJckXqaF7Zi8ZOSPLIChYsjkCy6hUB45pHnD6uk7OXxYqpj7LzHHXS72-1Z2si3YjvyucYALOk67dHx3kAQlD4geFEvWoecQLitZsG33pqw1CDcKP3LiZ1TCgAPAgLI_QEuC7X2owSJS5vmQi7XC9LTzHN4Dfwhxg7fPNBKqYEE6LQgxscUX8n4JLPZDD2rh0NQ1QQz20ZcdrPKLjm_Jz8OvA" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-unit-lg z-10">
                  <h3 className="font-headline-lg text-headline-lg text-on-primary mb-unit-xs">Computing</h3>
                  <p className="font-body-md text-body-md text-on-primary/80 mb-unit-sm">Power your potential.</p>
                  <span className="inline-flex items-center font-label-md text-label-md text-on-primary group-hover:underline">
                    Explore <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>

              {/* Side Stack */}
              <div className="grid grid-rows-2 gap-gutter h-full">
                {/* Audio */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer h-full">
                  <div className="absolute inset-0 bg-surface-container-low flex items-center justify-center p-unit-lg">
                    <img 
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      alt="Audio" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCytA1ROmNBIrDinZe1XizLxn09i_g1h_-U6rqokq0Mdz0uOBU60JdeHMGOVUTDMED05HWHuEgc29iyYXdfhCJiqZGaCN2rQ4F6WNSltWOUidKk0IxT3SdLqXUuGkKU0RyiKVzRXKU5zDkfQEAfwHm13AJpcbTNOEsmmL3qvndJMMJM0ol-TwZ2nwljV0XAe2X70zrlYWvsi2332mHse4ctQ_8lv7yeFMaWcoAEtqLFA5Rx9cV5sEdihw" 
                    />
                  </div>
                  <div className="absolute top-0 left-0 p-unit-lg z-10 w-full bg-gradient-to-b from-surface-container-low/80 to-transparent backdrop-blur-[2px]">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-xs">Audio</h3>
                    <span className="inline-flex items-center font-label-md text-label-md text-primary group-hover:underline">
                      Shop Now <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Smart Home */}
                <div className="relative rounded-xl overflow-hidden group cursor-pointer h-full">
                  <div className="absolute inset-0 bg-tertiary-fixed/20 flex items-center justify-center p-unit-lg">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt="Smart Home" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdOcvh7R22yifBGwFoQWfzx7UOcH2nMlQ4znjUff7vHh397fCM2vw67HIaLixdfn7kQQNX-dUUHYlkhdUj_PI4w4uwzBIQof_7-N4dMcxggib5ecgncR-eolDyG7SV1cLjMUIAvf0cOYDKFHfhzDfLWd9sPtfzvSDNdzOdYDjeFjH_m0AuG1SgT2mDglLFeeRqBSyZ3mgWMK9yiyhCLqfsit1up0n7xcq_YSSm78PcsN93_aWh8oHx2g" 
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-unit-lg z-10 w-full bg-gradient-to-t from-black/40 to-transparent">
                    <h3 className="font-headline-md text-headline-md text-on-primary mb-unit-xs">Smart Home</h3>
                    <span className="inline-flex items-center font-label-md text-label-md text-on-primary group-hover:underline">
                      Shop Now <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
