'use client';

import Image from 'next/image';
import { Github, Send } from 'lucide-react';
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
						<span className='text-xl font-display font-bold aurora-text'>{SITE.name}</span>
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
						<a
							href={SITE.discord}
							target='_blank'
							rel='noopener noreferrer'
							className='text-slate-500 hover:text-slate-300 transition-colors duration-150'
							aria-label='Discord'
						>
							<svg className='w-5 h-5 fill-current' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
								<path d='M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' />
							</svg>
						</a>
						<a
							href={SITE.telegram}
							target='_blank'
							rel='noopener noreferrer'
							className='text-slate-500 hover:text-slate-300 transition-colors duration-150'
							aria-label='Telegram'
						>
							<Send className='w-5 h-5' />
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
