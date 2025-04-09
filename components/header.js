'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        {href: '/collection', label: 'Albums Collection'},
        {href: '/admin', label: 'Admin'},
    ];

    return (
        <header className="w-full bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-600">
                    🎵 NextPod
                </Link>

                <nav className="flex space-x-6">
                    {navItems.map(({href, label}) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                'text-sm font-medium hover:text-orange-400 transition-colors',
                                pathname.startsWith(href) ? 'text-orange-600' : 'text-gray-600'
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}