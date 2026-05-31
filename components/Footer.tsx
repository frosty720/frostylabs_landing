'use client';

import Image from 'next/image';
import { Github } from 'lucide-react';
import { SITE } from '@/lib/site';

export function Footer() {
	return (
		<footer className='relative py-14 border-t border-white/5 overflow-hidden' style={{ background: '#05060b' }}>
			{/* Faint aurora tint */}
			<div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(80% 60% at 50% 100%, rgba(167,139,250,.06), transparent 70%)' }} />

			<div className='container mx-auto px-6 relative z-10'>
				{/* Top row: logo + links */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-8 mb-10'>
					{/* Logo + wordmark */}
					<div className='flex items-center gap-3'>
						<Image
							src={SITE.logo}
							alt={`${SITE.name} logo`}
							width={36}
							height={36}
							className='rounded-lg'
						/>
						<span className='text-xl font-orbitron font-bold aurora-text'>{SITE.name}</span>
					</div>

					{/* Nav links */}
					<nav className='flex items-center gap-6' aria-label='Footer navigation'>
						<a
							href={SITE.docs}
							target='_blank'
							rel='noopener noreferrer'
							className='mono-label text-slate-500 hover:text-slate-300 transition-colors duration-150'
						>
							Docs
						</a>
						<a
							href={SITE.appUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='mono-label text-slate-500 hover:text-slate-300 transition-colors duration-150'
						>
							App
						</a>
						<a
							href={SITE.github}
							target='_blank'
							rel='noopener noreferrer'
							className='text-slate-500 hover:text-slate-300 transition-colors duration-150'
							aria-label='GitHub'
						>
							<Github className='w-5 h-5' />
						</a>
						<a
							href={SITE.twitter}
							target='_blank'
							rel='noopener noreferrer'
							className='text-slate-500 hover:text-slate-300 transition-colors duration-150'
							aria-label='X / Twitter'
						>
							<svg className='w-5 h-5 fill-current' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
								<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
							</svg>
						</a>
					</nav>
				</div>

				{/* Divider */}
				<div className='border-t border-white/5 mb-7' />

				{/* Bottom row: studio attribution + copyright */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600'>
					<span>A {SITE.studio} studio product</span>
					<span>© 2026 {SITE.name}. All rights reserved.</span>
				</div>
			</div>
		</footer>
	);
}
