"use client";

import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen pt-20">
      {/* Main Content Canvas */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-unit-xxl">
        {/* Breadcrumbs */}
        <nav className="py-unit-lg text-secondary font-label-md text-label-md flex items-center gap-unit-xs">
          <Link className="hover:text-primary transition-colors" href="/">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="hover:text-primary transition-colors" href="/shop">Laptops</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface">NovaBook Pro X15</span>
        </nav>

        {/* Product Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-unit-xl lg:gap-gutter mb-unit-xxl">
          
          {/* Image Gallery (Left, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-unit-md relative">
            {/* Main Image */}
            <div className="w-full bg-surface-container-low rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] aspect-[4/3] flex items-center justify-center relative group">
              <img 
                alt="NovaBook Pro X15 Main View" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1cZ7UOxyml0gArO49VTO7FNcY0h_I39iAosCOaWtUvd4P1LzvIeYRKMCRpIIntVgM6VVfKBIttW5Z3nJij4WkQR4B1nKd-pXYAAs5T9o8mUYvAWzj9m_pEwqMxky7Nk6WF1GsZ1X8sNE58Mm3t_t0CuzJuCfKdws1PjtBQ2ORerOJPG8OsrzRHaIYpz8nxFi7Ddj5aEmieAnjMbmBmXShzLjsKCAGa2b3oQlZm5c91nXZk-otjJ4SBQ" 
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-unit-md">
              <button className="bg-surface-container-low rounded-lg overflow-hidden aspect-square border-2 border-primary focus:outline-none">
                <img alt="Keyboard View" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMnuxcnbSDP7L9f2KLYRjyqslfp7lKKv_Q-krLjH3zgGcamSRI8On6MKctpG3IfkNIhg7vp3K9XQPp0BQlc0-c999vdDWMohFOGiTt6ElGfwLihpXmHwM6MopNslnD0_3Iq9NG8Ant7O2A9aSw-JhpJhR60imvfZhZ0NEGUOKbEW8dWwLBlU8SqgqzfcTfQ9RxJtaqZn4-H9Nt8c4VXoXHJNbJIxYP3aLZpV0Vw5jP6wgN7Dfg-I3gGQ" />
              </button>
              <button className="bg-surface-container-low rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-surface-variant focus:outline-none transition-colors">
                <img alt="Side Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3uJvv5txhORR3eLieHCdfGAT_SsBzGnbr-MOHpB6UX7kvKUH8obrHLSuQKJMJdw8iH7NVuppDZ6V-c24eSIOJMXwtNcXNPvYGoTqvrDZYO4btN_I3wT2mmLtREmbIBibwgd_mDiffsnY3w8BXv7kAyCpTQmrN3KsFukIzJmzsVqqL7JroBi7_T8wzm58KbhAfQU_YwfAWD-wf9ASFsUBh-EdF-vRRSVorag6OWRbx9QLKFaewFG0Etw" />
              </button>
              <button className="bg-surface-container-low rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-surface-variant focus:outline-none transition-colors">
                <img alt="Top View" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_R8VG__XqAS-rZL9bKZzLMPY-2k6jlNlztUWhCS784FO9wGyGDwTt_SL8Z1fqKt6gAZz7X54l6QJXR55BEP7G8bHLLFzbJPJ0dFs79txYMK59W-NJM8_qQ5Ofn_rBK74FvtPjVpecSEqLUK_AJYHdlUDHtZkaO04hojOY0Bfu8L9n9KHA1E4YqScBhNGXgZVzFqlBZx9SEjGyJugrWs46cdcvL3fzQVJ7lzsJySntXT-HyOF-Z27zLQ" />
              </button>
              <button className="bg-surface-container-low rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-surface-variant focus:outline-none transition-colors">
                <img alt="Screen Detail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFMDmeRNq3NCpGU7zMj_ZpprMpbrE4yJ9Q36Yvx9aENIjqPsyOm2RdQKmwGBR3ON4v7nNBqGTXMha44N04Xb16hUvJv6eiid-p97QUZOHgCwhKr5Qan9Lf35DW0D2shvuCviCskHxZVBhpWVLDvyTRGlHHXU2Iyq2qHo40D09sIwXnoRZ4ZKQgwz5CxXb5PplL42iFiz_pubTLb3dXMqpVXqxiK5hDxqKYMQAyzZnw5VLNzallHiWOyg" />
              </button>
            </div>
          </div>

          {/* Product Details & Sticky Actions (Right, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col relative">
            <div className="sticky top-28 flex flex-col gap-unit-lg">
              {/* Header */}
              <div>
                <div className="flex items-center gap-unit-sm mb-unit-sm">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">New Release</span>
                </div>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-unit-xs">NovaBook Pro X15</h1>
                <p className="font-body-lg text-body-lg text-secondary">The ultimate machine for visionary creators and demanding professionals. Engineered for unprecedented performance.</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-unit-md">
                <span className="font-headline-lg text-headline-lg text-on-surface">$2,499.00</span>
              </div>

              <hr className="border-surface-variant" />

              {/* Configuration Options */}
              <div className="flex flex-col gap-unit-md">
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Processor</h3>
                <div className="grid grid-cols-2 gap-unit-sm">
                  <button className="px-unit-md py-unit-sm rounded-lg border border-primary bg-primary/5 text-primary font-body-md text-body-md text-left transition-colors">
                    M3 Pro (12-core)
                  </button>
                  <button className="px-unit-md py-unit-sm rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:bg-primary/5 transition-colors font-body-md text-body-md text-left">
                    M3 Max (16-core) <span className="block text-label-sm text-secondary mt-1">+$400</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-unit-sm mt-unit-md">
                <button className="w-full bg-primary text-on-primary py-unit-md rounded-full font-label-md text-label-md uppercase tracking-wider hover:bg-primary/90 transition-all duration-200 active:scale-98 flex items-center justify-center gap-unit-sm">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Add to Cart
                </button>
                <p className="text-center font-label-sm text-label-sm text-secondary">Free shipping and 14-day returns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Table */}
        <section className="mt-unit-xxl border-t border-surface-variant pt-unit-xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-unit-lg text-center">Technical Specifications</h2>
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden">
              <table className="w-full text-left font-body-md text-body-md border-collapse">
                <tbody>
                  <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                    <th className="py-unit-md px-unit-lg font-label-md text-label-md text-secondary w-1/3 align-top">Processor</th>
                    <td className="py-unit-md px-unit-lg text-on-surface">12-core CPU with 6 performance cores and 6 efficiency cores, 18-core GPU, 16-core Neural Engine.</td>
                  </tr>
                  <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                    <th className="py-unit-md px-unit-lg font-label-md text-label-md text-secondary w-1/3 align-top">Memory</th>
                    <td className="py-unit-md px-unit-lg text-on-surface">18GB unified memory (Configurable to 36GB).</td>
                  </tr>
                  <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                    <th className="py-unit-md px-unit-lg font-label-md text-label-md text-secondary w-1/3 align-top">Storage</th>
                    <td className="py-unit-md px-unit-lg text-on-surface">512GB SSD (Configurable up to 4TB).</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <th className="py-unit-md px-unit-lg font-label-md text-label-md text-secondary w-1/3 align-top">Display</th>
                    <td className="py-unit-md px-unit-lg text-on-surface">15.3-inch Liquid Retina XDR display, 2880x1864 native resolution at 254 pixels per inch.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button (NexaBot Chat) */}
      <Link href="/support" className="fixed bottom-margin-mobile md:bottom-margin-desktop right-margin-mobile md:right-margin-desktop z-50 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 group">
        <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform duration-300">chat_bubble</span>
      </Link>
    </div>
  );
}
