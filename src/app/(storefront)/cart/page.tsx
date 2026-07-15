"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  return (
    <div className="font-body-md text-on-background bg-surface min-h-screen relative overflow-hidden pt-[104px]">
      {/* Mock Background Content to show overlay */}
      <div className="absolute inset-0 z-0 p-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter opacity-30 pointer-events-none">
        <div className="bg-surface-container-high rounded-xl h-96"></div>
        <div className="bg-surface-container-high rounded-xl h-96"></div>
        <div className="bg-surface-container-high rounded-xl h-96"></div>
        <div className="bg-surface-container-high rounded-xl h-96"></div>
      </div>

      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-on-background/20 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer"
        onClick={() => router.back()}
      ></div>

      {/* Slide-out Cart Drawer */}
      <aside className="fixed inset-y-0 right-0 w-full max-w-md z-[60] bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border-l border-surface-container-highest transition-transform duration-500 ease-in-out flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-unit-lg border-b border-surface-container-highest/50">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Shopping Cart</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your premium selection</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface group"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>
        </header>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto cart-scroll p-unit-lg space-y-unit-lg">
          {/* Item 1 */}
          <div className="flex gap-unit-md items-start group">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container-low relative shrink-0">
              <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="AeroPhone Pro" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwyCOm1DF8QBSgEqcXNZ8LrhzhOLwVJ7o6Fj4aKj_EykvgDyW4w1xY20EtwE5XlkVAFKQ8Pr_GPSFweKvdkTjHdaRi1jB6SvNkiO32vVyx_83wJ3jD_CKeFQ5ZEmQvFIclAq7Z1JCEHo9zBUxnO4hJ21exe1xuAWH77o4yui90xEiL-l2YDzXjp8zcyJ5YIn24K57tV4Mvt6bzV4vXdoW8tJDJjLy1M_Lu8XND8kbgiEbC4mVpRjwGcw" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">AeroPhone Pro</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Matte Silver</p>
                </div>
                <span className="font-label-md text-label-md text-on-surface">$299.00</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-outline-variant rounded-full h-8 px-2 bg-surface">
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="font-label-md text-label-md w-8 text-center text-on-surface">1</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <button className="text-on-surface-variant hover:text-error transition-colors p-1">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-unit-md items-start group">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container-low relative shrink-0">
              <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="Nova Watch Series 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD20fXY4-ATj-ejmm_dQ7mF-mVNQ3VVBi1itGuFtd3_dDWmRtVK_o7CmSsdJEyWei63UR0-QoBn0711Ei6f2QsdTM_69IQu_nbA7OU8Z6swqZP1u20GHGm8MeHkWaQeZW8PLI6p9Wj3uVDt0BqC1Ok26vvn_NNDqIX4Gof5MwNOTeaHsS6Zxh3oZIIbxHHgGVfo_HWMJNqPIzGo4UJiAh5CLZeChTIpD-q5HJqJ5tWC0ljqscNrOOly9w" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">Nova Watch Series 4</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Graphite</p>
                </div>
                <span className="font-label-md text-label-md text-on-surface">$450.00</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-outline-variant rounded-full h-8 px-2 bg-surface">
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="font-label-md text-label-md w-8 text-center text-on-surface">2</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <button className="text-on-surface-variant hover:text-error transition-colors p-1">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-unit-md items-start group">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container-low relative shrink-0">
              <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="OmniCharge Pad" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALoniVEDrhee95FAezYg9EAGb9oTy2KNmo9OVdBs45GWtZaBt1QogJynCH1EbxAGY1vw8Vpx1oJ0peOa862Bxabl4Dec1nCAgsEE8nd6R8RqRkmmf98_edqYpZyOW4OzPv3BIT9PFR-yknR8q1vzaTaM1zo2D_pQlQ54_m94EggnFbQjS6n5BZWaBnsARwziPi-7cEWprFK3ZjNSej_xD3jCGEQN64FlzOvQ0RObWxReY3KCkJ26xOmw" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface">OmniCharge Pad</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Ceramic White</p>
                </div>
                <span className="font-label-md text-label-md text-on-surface">$89.00</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-outline-variant rounded-full h-8 px-2 bg-surface">
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="font-label-md text-label-md w-8 text-center text-on-surface">1</span>
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-6 h-6">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <button className="text-on-surface-variant hover:text-error transition-colors p-1">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Checkout Section */}
        <div className="p-unit-lg bg-surface-container-low/50 backdrop-blur-md border-t border-surface-container-highest/50 mt-auto">
          <div className="space-y-unit-sm mb-unit-lg">
            <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
              <span>Subtotal</span>
              <span>$1,288.00</span>
            </div>
            <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="h-px w-full bg-outline-variant/30 my-unit-sm"></div>
            <div className="flex justify-between items-center font-headline-md text-headline-md text-on-surface">
              <span>Total</span>
              <span>$1,288.00</span>
            </div>
          </div>
          <Link href="/checkout" className="w-full bg-primary hover:bg-primary-container text-on-primary rounded-full py-4 font-label-md text-label-md tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group">
            Proceed to Checkout
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <p className="font-label-sm text-label-sm text-center text-on-surface-variant mt-unit-md opacity-70">
            Secure checkout powered by TechNova
          </p>
        </div>
      </aside>
    </div>
  );
}
