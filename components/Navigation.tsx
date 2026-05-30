'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_LOCALES, COOKIE_KEY_LOCALE } from '@/lib/const';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SITE } from '@/lib/site';

interface NavLink {
	href: string;
	label: string;
	external?: boolean;
	highlight?: boolean;
	icon?: React.ReactNode;
}

export function Navigation() {
	const t = useTranslations('nav');
	const locale = useLocale();
	const router = useRouter();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 16);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLocaleChange = (newLocale: string) => {
		Cookies.set(COOKIE_KEY_LOCALE, newLocale, { expires: 365 });
		router.refresh();
	};

	const currentLocale = SUPPORTED_LOCALES.find((l) => l.code === locale);

	const navLinks: NavLink[] = [
		{ href: '#how', label: t('product') },
		{ href: '#capabilities', label: t('capabilities') },
		{ href: '#pricing', label: t('pricing') },
		{ href: SITE.docs, label: t('docs'), external: true },
		{ href: SITE.github, label: t('github'), external: true, icon: <Github className='w-4 h-4' /> },
	];

	const ctaLink: NavLink = {
		href: SITE.appUrl,
		label: t('launchApp'),
		external: true,
		highlight: true,
	};

	return (
		<nav
			className={[
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				scrolled
					? 'bg-[#05060b]/70 backdrop-blur-md border-b border-white/5'
					: 'bg-transparent border-b border-transparent',
			].join(' ')}
		>
			<div className='container mx-auto px-6 py-4'>
				<div className='flex items-center justify-between'>
					{/* Wordmark */}
					<a href='/' className='flex items-center gap-2.5 group'>
						<Image
							src={SITE.logo}
							alt={`${SITE.name} logo`}
							width={36}
							height={36}
							className='rounded-lg'
						/>
						<span className='font-space-grotesk text-lg font-semibold text-white tracking-tight'>
							{SITE.name}
						</span>
					</a>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-6'>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								target={link.external ? '_blank' : undefined}
								rel={link.external ? 'noopener noreferrer' : undefined}
								className='flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors duration-200'
							>
								{link.icon}
								{link.label}
							</a>
						))}

						{/* Language Selector */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									className='bg-white/5 text-white/70 border border-white/10 rounded-lg px-3 py-1.5 text-sm hover:border-white/20 hover:text-white hover:bg-white/10 transition-all duration-200'
								>
									{currentLocale?.name || '🇺🇸 English'}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='bg-[#0b0f17] border-white/10'>
								{SUPPORTED_LOCALES.map((loc) => (
									<DropdownMenuItem
										key={loc.code}
										onClick={() => handleLocaleChange(loc.code)}
										className='text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-colors'
									>
										{loc.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* CTA */}
						<a
							href={ctaLink.href}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:opacity-90 transition-opacity duration-200'
						>
							{ctaLink.label}
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						className='md:hidden text-white/70 hover:text-white transition-colors'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label='Toggle mobile menu'
					>
						{mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className='md:hidden mt-4 pb-4 border-t border-white/5 pt-4'>
						<div className='flex flex-col gap-4'>
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
									className='flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors'
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.icon}
									{link.label}
								</a>
							))}

							{/* Mobile CTA */}
							<a
								href={ctaLink.href}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:opacity-90 transition-opacity duration-200'
								onClick={() => setMobileMenuOpen(false)}
							>
								{ctaLink.label}
							</a>

							{/* Mobile Language Selector */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='outline'
										className='bg-white/5 text-white/70 border border-white/10 rounded-lg px-3 py-2 text-sm hover:border-white/20 transition-colors w-full'
									>
										{currentLocale?.name || '🇺🇸 English'}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='bg-[#0b0f17] border-white/10 w-full'>
									{SUPPORTED_LOCALES.map((loc) => (
										<DropdownMenuItem
											key={loc.code}
											onClick={() => {
												handleLocaleChange(loc.code);
												setMobileMenuOpen(false);
											}}
											className='text-white/70 hover:text-white hover:bg-white/5 cursor-pointer'
										>
											{loc.name}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
