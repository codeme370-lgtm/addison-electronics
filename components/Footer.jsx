import Link from "next/link";
import { Award, CreditCard, Truck, RefreshCw, Headphones } from "lucide-react";


const Footer = () => {

    const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const MapPinIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const FacebookIcon = ({color='currentColor'}) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const InstagramIcon = ({color='currentColor'}) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    // Official TikTok multicolor logo (cyan, pink, black)
    const TikTokIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <g fill="none" fillRule="evenodd">
                <path d="M17.5 3v7.25c-1.1-.2-2.2-.25-3.25.05-1.73.43-3.06 1.76-3.49 3.49-.36 1.44.03 2.9 1.03 3.9.99 1 2.46 1.4 3.9 1.03 2.65-.66 4.6-3.04 4.6-5.82V6h-2.79z" fill="#69C9D0" />
                <path d="M14.5 3v6.4c-.9-.15-1.8-.08-2.6.22-1.5.6-2.6 2.08-2.6 3.8 0 2.36 1.92 4.27 4.28 4.27 1.15 0 2.23-.45 3.03-1.25V8.2c-.78.08-1.56-.02-2.28-.3V3h-2.83z" fill="#EE1D52" />
                <path d="M11.5 7.5V3h-2v6.9c0 1.66 1.34 3 3 3 .28 0 .55-.04.8-.12V9.5c-.4.1-.8.15-1.24.15-1.1 0-2-.9-2-2V7.5h1.44z" fill="#010101" />
            </g>
        </svg>
    )
    const WhatsappIcon = ({color='currentColor'}) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.05C21 6.48 16.52 2 11 2C5.48 2 1 6.48 1 12.05C1 14.67 2 17 3.78 18.87L3 22L6.26 20.97C8.06 21.63 9.99 22 11.99 22C17.52 22 21 17.52 21 12.05Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 11.25C8.5 11.25 9.25 10.5 10.5 10.5C11.75 10.5 12 11.25 12.75 11.75C13.5 12.25 14.5 11.75 14.5 11.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)

    const TwitterIcon = ({color='currentColor'}) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.00098C22.0424 3.675 20.9821 4.1924 19.86 4.53198C19.2577 3.83711 18.4573 3.34649 17.567 3.12383C16.6767 2.90117 15.7395 2.95724 14.8821 3.28415C14.0247 3.61106 13.2884 4.19225 12.773 4.95398C12.2575 5.71571 11.9877 6.615 12 7.53598V8.53198C10.2426 8.57554 8.50127 8.1854 6.93101 7.3956C5.36075 6.6058 4.01032 5.43887 3 3.99998C3 3.99998 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.49998C20.9991 7.2215 20.9723 6.94372 20.92 6.67198C21.9406 5.66356 22.6608 4.39276 23 3.00098Z" fill={color}/></svg>)

    const linkSections = [
        {
            title: "Shop",
            links: [
                { text: "All Products", path: '/shop' },
                { text: "Smartphones", path: '/category/smartphones' },
                { text: "Laptops", path: '/category/laptops' },
                { text: "Accessories", path: '/category/accessories' },
                { text: "Gaming", path: '/category/gaming' },
                { text: "Top Deals", path: '/deals' },
            ]
        },
        {
            title: "Company",
            links: [
                { text: "About Us", path: '/about' },
                { text: "Careers", path: '/company/careers' },
                { text: "Sustainability", path: '/company/sustainability' },
                { text: "Blog", path: '/blog' },
            ]
        },
        {
            title: "Customer Service",
            links: [
                { text: "Contact Us", path: '/contact' },
                { text: "Track Your Order", path: '/orders' },
                { text: "Returns & Refunds", path: '/returns' },
                { text: "FAQs", path: '/faq' },
            ]
        }
    ];

    const socialIcons = [
        { icon: WhatsappIcon, link: "https://wa.me/233248608602", color: '#7C3AED' },
        { icon: TikTokIcon, link: "https://www.tiktok.com/@best_shop_teknova", color: '#69C9D0' },
        { icon: InstagramIcon, link: "https://www.instagram.com/jc_shopping_mall", color: '#E1306C' },
        { icon: FacebookIcon, link: "https://www.facebook.com/100021363870050", color: '#1877F2' },
        { icon: TwitterIcon, link: "https://twitter.com/teknova", color: '#1DA1F2' },
    ]

    const features = [
        { icon: CreditCard, title: 'Secure Payments', desc: '100% protected transactions' },
        { icon: Truck, title: 'Free Shipping', desc: 'On orders over $99' },
        { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
        { icon: Award, title: 'Quality Guarantee', desc: '100% original products' },
    ];

    return (
        <footer className="bg-gradient-to-b from-[#050712] via-[#06071a] to-[#02030a] text-slate-300">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="rounded-2xl border border-white/6 p-8 bg-[linear-gradient(180deg,rgba(6,6,12,0.6),rgba(2,3,10,0.6))]">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 text-white font-bold">TN</div>
                                <div>
                                    <div className="text-xl font-semibold text-white">TechNova</div>
                                    <div className="text-xs text-slate-400">Tech for the future</div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300">Your trusted destination for premium electronics. Discover the latest tech products with unbeatable prices and exceptional service.</p>

                            <div className="space-y-3 mt-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-[#0b0f18] flex items-center justify-center">
                                        <MapPinIcon />
                                    </div>
                                    <div>
                                        <div>123 Tech Street, Silicon Valley</div>
                                        <div className="text-slate-400 text-xs">California, USA - 94025</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-[#0b0f18] flex items-center justify-center">
                                        <MailIcon />
                                    </div>
                                    <div>
                                        <a href="mailto:support@technova.com" className="text-sky-400">support@technova.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-9 h-9 rounded-full bg-[#0b0f18] flex items-center justify-center">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <div className="text-sm">+1 (555) 123-4567</div>
                                        <div className="text-xs text-slate-400">Mon - Fri: 9:00 AM - 6:00 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columns */}
                        {linkSections.map((section, sIdx) => (
                            <div key={sIdx} className="pt-2">
                                <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    {section.links.map((ln, i) => (
                                        <li key={i}><Link href={ln.path} className="hover:text-white">{ln.text}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Subscribe */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
                            <p className="text-sm text-slate-300 mb-4">Subscribe to get the latest updates on new arrivals, exclusive offers and more.</p>
                            <div className="flex gap-3">
                                <input aria-label="email" placeholder="Enter your email address" className="flex-1 rounded-lg bg-[#0b0f18] px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none" />
                                <button className="rounded-lg bg-violet-600 px-4 py-3 text-white">↗</button>
                            </div>
                            <label className="mt-3 flex items-start gap-3 text-sm text-slate-400">
                                <input type="checkbox" className="mt-1" />
                                I agree to receive marketing emails and updates from TechNova.
                            </label>

                            <div className="mt-6 flex gap-3">
                                {socialIcons.map((s, i) => (
                                    <a key={i} href={s.link} className="w-10 h-10 bg-[#0b0f18] rounded-md flex items-center justify-center" aria-label={`social-${i}`}>
                                        <s.icon color={s.color} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features Row */}
                    <div className="mt-8 rounded-lg border border-white/6 bg-[linear-gradient(180deg,rgba(10,10,20,0.3),rgba(4,6,10,0.3))] p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            {features.map((f, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="p-3 rounded-md bg-[#060814]">
                                        <f.icon size={18} className="text-violet-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{f.title}</div>
                                        <div className="text-xs text-slate-400">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-400">© {new Date().getFullYear()} TechNova. All rights reserved.</div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3">
                                <Link href="/policy" className="text-sm text-slate-400 hover:text-white">Privacy Policy</Link>
                                <Link href="/terms" className="text-sm text-slate-400 hover:text-white">Terms of Use</Link>
                                <Link href="/refund" className="text-sm text-slate-400 hover:text-white">Refund Policy</Link>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Payment badges (simple placeholders) */}
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-xs">VISA</div>
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-xs">MC</div>
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-xs">AMEX</div>
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-xs">PayPal</div>
                                    <div className="px-2 py-1 rounded-md bg-white/5 text-xs">Apple Pay</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;