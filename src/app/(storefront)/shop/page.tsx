"use client";

import Link from "next/link";

export default function StorefrontShopPage() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-[104px] pb-unit-xxl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Sidebar / Filters (md: 3 cols) */}
          <aside className="md:col-span-3 hidden md:block space-y-unit-xl pr-unit-lg">
            {/* Category Filter */}
            <div className="space-y-unit-md">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Category</h3>
              <ul className="space-y-unit-sm">
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input defaultChecked className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Laptops</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Headphones</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Tablets</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Accessories</span>
                  </label>
                </li>
              </ul>
            </div>
            
            {/* Brand Filter */}
            <div className="space-y-unit-md">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Brand</h3>
              <ul className="space-y-unit-sm">
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Apple</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">Sony</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-unit-sm cursor-pointer group">
                    <input defaultChecked className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Samsung</span>
                  </label>
                </li>
              </ul>
            </div>
            
            {/* Price Filter */}
            <div className="space-y-unit-md">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Price Range</h3>
              <div className="space-y-4">
                <input className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary" max="5000" min="0" type="range" defaultValue="1500" />
                <div className="flex justify-between items-center text-label-sm text-on-surface-variant">
                  <span>$0</span>
                  <span className="font-medium text-primary">$1,500</span>
                  <span>$5,000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Canvas (md: 9 cols) */}
          <section className="md:col-span-9 space-y-unit-lg">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-unit-lg">
              <p className="text-on-surface-variant font-label-md text-label-md">Showing <span className="text-on-surface font-medium">12</span> of 48 products</p>
              <div className="flex items-center gap-unit-sm">
                <span className="text-on-surface-variant font-label-md text-label-md">Sort by:</span>
                <select className="bg-transparent border-none text-on-surface font-label-md text-label-md focus:ring-0 cursor-pointer pr-8 py-0">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Product Card 1 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Laptop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC76wmZurYspTEFAJHXPY5iulTc2qh_88tallFN8fj7IqNVyKiXyHQXrUVcCp02b8uToP4Qsx_bSSUSRcSYExSIPT4ga02IleYOkl7Hqztfr8IWzZDa7cpVTudsE9w4x5QvVYwrBGqvx7YRGI0C8sIQvmlRHw6ZZS3wmcsRo26iHlhTf8qt56UXgB1XPnCVg1U7gYLQsOXQW-gxFs8tsmZ9SvmYXVHKgC-Nmw3_0BKxzetBsZjMpb5jxg" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-1" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                  <div className="absolute top-unit-sm left-unit-sm">
                    <span className="bg-surface-variant text-on-surface px-2 py-1 rounded-full font-label-sm text-label-sm">New</span>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">X1 Pro Book</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">TechNova</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$1,299</span>
                  </div>
                </div>
              </article>

              {/* Product Card 2 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_cWdnzOYG4aRhbIp8Urwwt-6ktK6h7otfHu9r0LI_VPfnA0_kZYREjoGEIN6GBnf9_YRXoyJ00zouzTCxZ47_j6RQr1Jdebke-nGAYlS4ZS0VRjr5P2e-mT-J8q7jOMAJV21dmcy9Ww3hGohVMPmIbBuYGM386axQagpBwA0IBJPREMj-T0RBhJxYVv-cyCnQCpeVRrvfZyGdODx43SabCMOn907AkqjhrCo5ZKZMN6fi7KEl-YXwZg" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-2" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">Aura Sound ANC</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Sony</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$349</span>
                  </div>
                </div>
              </article>

              {/* Product Card 3 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Tablet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDey1Hvo6IeDvEINr-HB9mIqdsjAXrR9xuCdEwVKzhVBf7cSuDgQ24qEBCulAq7K6bKuUVcewNhhfluYOB4Z45dP2wivacNRCI4FLUh7WJYVOnuKkZz682CDKyJpcTGGSEnMs4Kf6foRlaf5l7rllV8sU2JrUSb5NJyICOXP_zyOt5OsImNEwO17zD70ybjXXu1s_KR9PbVgJOc4TUkZYRG3xpYJjW4n--CJ2_XQxNYQ26YMpaL2GFe3A" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-3" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">Slate Tab Ultra</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Samsung</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$799</span>
                  </div>
                </div>
              </article>

              {/* Product Card 4 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Earbuds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqaaws0JcOQj_s7yp1i53A46Dfs8ezyo6trnW7eTYyEmD7aozZFa-obv0Ws225svPqjLBv3G92ZyUE8AX-vdrd40S0VaGeH7YkHmaN6r2700JlDmHUQreyNb7IPL9CPwH2-VUCOraK2OOg6Cinubaq3CZrXxtvkqz8BNqlqP_z2RTzwvGeyUHtZrUufiaPub5DHA12QqiKuegl8ps7FwNGLZT1-MZvQ5KlzupF4SBSgFv29Y3kidWUSg" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-4" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">Pods Air</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Apple</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$199</span>
                  </div>
                </div>
              </article>

              {/* Product Card 5 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq6NZDcGt5aQbrbTph3-MeD6xixYkP8wthaqxB5i7SRtcOppO2LsyF-7o9nRJ0_aJUACyXuBwAv0EDa25Z1zB_UeBjQR50QN9OMmv8qek-emFTeXrPnz5DFikPZINt9ZLpwtvuR3BJtX_3Rt5SVFNRSD4IES3C6HgTGHRTu5ICVks4OZ1PMjtuCrxp2H_DmvcKc9jjNquRFTCHlEDo8s0PzXU0zpgWpGASCGhiHKQKgSaRVqrm-k_JPA" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-5" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                  <div className="absolute top-unit-sm left-unit-sm">
                    <span className="bg-error-container text-on-error-container px-2 py-1 rounded-full font-label-sm text-label-sm">Sale</span>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">Nova Watch SE</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">TechNova</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$249 <span className="text-on-surface-variant text-body-md line-through ml-2">$299</span></span>
                  </div>
                </div>
              </article>

              {/* Product Card 6 */}
              <article className="group relative flex flex-col bg-transparent rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-low hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] pb-unit-md">
                <div className="aspect-square relative overflow-hidden bg-surface-bright rounded-xl mb-unit-md">
                  <img className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" alt="Keyboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYCn6_O5Y_f2FNhTv6pGiN7BTK9civpKISQnttxn781u-g2mOAFkjpa2bUqz2BwitVfuerQTjuPK0HiDZ_JRsV78u4WuMsdYLtZB1esrn35CfN6mwgbKkItgS9KCfLUYwljMsk2yOcZtNbvmwa2ahBTli5ZjqrLJh8FiKy1okaS4W9GO9f5O554qkI6gdNkgwjflyYNH5GytIUaVAfymR7JVwGEDSlg5n9myRb-fn_LeijlNq1i6F7Hw" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/product/prod-6" className="bg-primary text-white font-label-md text-label-md px-6 py-2 rounded-full scale-98 hover:scale-100 active:scale-95 transition-all duration-200">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="px-unit-sm flex flex-col flex-grow">
                  <h4 className="font-body-lg text-body-lg text-on-surface truncate">Type Pro Wireless</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">TechNova</p>
                  <div className="mt-auto pt-unit-md flex justify-between items-end">
                    <span className="font-headline-md text-headline-md text-primary">$149</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Load More */}
            <div className="mt-unit-xl flex justify-center">
              <button className="border border-secondary text-on-surface font-label-md text-label-md px-8 py-3 rounded-full hover:bg-surface-container-low transition-colors duration-200">
                Load More Products
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
