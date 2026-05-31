'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Script from 'next/script';
import { SITE } from '@/lib/site';

const FAQ_COUNT = 6;

export function FAQ() {
	const t = useTranslations('faq');
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqItems = Array.from({ length: FAQ_COUNT }, (_, index) => ({
		question: t(`items.${index}.question`),
		answer: t(`items.${index}.answer`),
	}));

	const toggleQuestion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};

	return (
		<>
			<Script
				id='faq-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<section
				id='faq'
				className='relative py-24 overflow-hidden'
				style={{ background: 'radial-gradient(100% 80% at 80% 10%, rgba(167,139,250,.12), transparent 55%), radial-gradient(90% 70% at 10% 90%, rgba(34,211,238,.10), transparent 55%), #05060b' }}
			>
				{/* Subtle ambient glows */}
				<div className='absolute top-24 right-24 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none' />
				<div className='absolute bottom-24 left-24 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none' />

				<div className='container mx-auto px-6 relative z-10'>
					{/* Heading */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.55 }}
						className='text-center mb-16'
					>
						<div className='inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-1.5 rounded-full mb-6'>
							<HelpCircle className='w-3.5 h-3.5 text-cyan-400' />
							<span className='mono-label text-cyan-400'>FAQ</span>
						</div>

						<h2 className='text-5xl md:text-6xl font-display font-bold mb-5'>
							<span className='aurora-text'>{t('title')}</span>
						</h2>
						<p className='text-lg text-slate-400 max-w-xl mx-auto'>
							{t('subtitle')}
						</p>
					</motion.div>

					{/* Accordion */}
					<div className='max-w-3xl mx-auto space-y-3'>
						{faqItems.map((item, index) => {
							const isOpen = openIndex === index;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.04 }}
								>
									<div
										className={`rounded-xl border transition-colors duration-200 ${
											isOpen
												? 'bg-white/5 border-white/15'
												: 'bg-white/[0.02] border-white/5 hover:border-white/10'
										}`}
									>
										<button
											onClick={() => toggleQuestion(index)}
											aria-expanded={isOpen}
											className='w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-xl'
										>
											<span className='text-base font-semibold text-white/90 leading-snug'>
												{item.question}
											</span>
											<span className='flex-shrink-0 mt-0.5 text-slate-400'>
												{isOpen ? (
													<Minus className='w-4 h-4 text-cyan-400' />
												) : (
													<Plus className='w-4 h-4' />
												)}
											</span>
										</button>

										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													key='content'
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.28, ease: 'easeInOut' }}
													className='overflow-hidden'
												>
													<p className='px-6 pb-5 text-sm text-slate-400 leading-relaxed'>
														{item.answer}
													</p>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* CTA */}
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.25 }}
						className='text-center mt-14'
					>
						<p className='text-slate-500 text-sm mb-5'>{t('stillHaveQuestions')}</p>
						<a
							href={SITE.twitter}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200'
						>
							{t('askOnX')} →
						</a>
					</motion.div>
				</div>
			</section>
		</>
	);
}
