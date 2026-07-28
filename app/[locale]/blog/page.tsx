import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { posts, formatDate } from '@/lib/blog/posts';

export const metadata = {
	title: 'Blog — FrostyFi',
	description:
		'The FrostyFi build log: x402 payments, ERC-8004 identity, and building no-code AI agents that earn on-chain.',
	openGraph: {
		title: 'Blog — FrostyFi',
		description:
			'The FrostyFi build log: x402 payments, ERC-8004 identity, and building no-code AI agents that earn on-chain.',
		url: '/blog',
	},
	alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
	const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

	return (
		<main className='min-h-screen bg-[#05060b] text-[#f2f0ff]'>
			<Navigation />

			<header className='container mx-auto px-6 pt-32 pb-12'>
				<p className='font-mono-accent text-sm uppercase tracking-widest text-[#22d3ee]'>
					The build log
				</p>
				<h1 className='mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight'>Blog</h1>
				<p className='mt-4 max-w-2xl text-lg text-white/60'>
					Notes from building FrostyFi in public — x402 payments, ERC-8004 identity, and no-code
					agents that earn on-chain.
				</p>
			</header>

			<section className='container mx-auto px-6 pb-24'>
				<div className='grid gap-8 md:grid-cols-2'>
					{sorted.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className='group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f17] transition-all duration-200 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40'
						>
							<div className='relative aspect-[1200/630] overflow-hidden border-b border-white/10'>
								<Image
									src={post.image}
									alt={post.title}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-[1.02]'
									sizes='(max-width: 768px) 100vw, 50vw'
								/>
							</div>
							<div className='flex flex-1 flex-col p-6'>
								<div className='flex items-center gap-2 text-xs text-white/45'>
									<time dateTime={post.date}>{formatDate(post.date)}</time>
									<span>·</span>
									<span>{post.readingTime}</span>
								</div>
								<h2 className='mt-3 font-display text-xl font-semibold tracking-tight text-[#f2f0ff] group-hover:text-white'>
									{post.title}
								</h2>
								<p className='mt-2 flex-1 text-sm leading-6 text-white/60'>{post.description}</p>
								<div className='mt-4 flex flex-wrap gap-2'>
									{post.tags.map((tag) => (
										<span
											key={tag}
											className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55'
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			<Footer />
		</main>
	);
}
