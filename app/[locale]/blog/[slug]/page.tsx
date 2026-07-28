import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getPost, posts, formatDate } from '@/lib/blog/posts';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
	return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};
	const url = `/blog/${post.slug}`;
	return {
		title: `${post.title} — FrostyFi`,
		description: post.description,
		alternates: { canonical: url },
		openGraph: {
			type: 'article',
			url,
			title: post.title,
			description: post.description,
			publishedTime: post.date,
			images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: [post.image],
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	const Body = post.Body;

	return (
		<main className='min-h-screen bg-[#05060b] text-[#f2f0ff]'>
			<Navigation />

			<article className='container mx-auto px-6 pt-28 pb-24'>
				<div className='mx-auto max-w-3xl'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white'
					>
						<ArrowLeft className='h-4 w-4' />
						All posts
					</Link>

					<header className='mt-8'>
						<div className='flex flex-wrap gap-2'>
							{post.tags.map((tag) => (
								<span
									key={tag}
									className='rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/[0.06] px-2.5 py-1 text-xs text-[#67e8f9]'
								>
									{tag}
								</span>
							))}
						</div>
						<h1 className='mt-5 font-display text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold tracking-tight'>
							{post.title}
						</h1>
						<div className='mt-5 flex items-center gap-2 text-sm text-white/50'>
							<span className='text-white/70'>{post.authorHandle}</span>
							<span>·</span>
							<time dateTime={post.date}>{formatDate(post.date)}</time>
							<span>·</span>
							<span>{post.readingTime}</span>
						</div>
					</header>

					<Image
						src={post.image}
						alt={post.title}
						width={1200}
						height={630}
						priority
						className='mt-8 w-full h-auto rounded-2xl border border-white/10'
					/>

					<div className='mt-10'>
						<Body />
					</div>

					{/* CTA */}
					<div className='mt-12 rounded-2xl border border-white/10 bg-[#0b0f17] p-8 text-center'>
						<h3 className='font-display text-2xl font-bold'>Build an agent that earns</h3>
						<p className='mx-auto mt-2 max-w-md text-white/60'>
							Free tier to start. Pro when you&apos;re ready to deploy and earn.
						</p>
						<div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
							<a
								href={SITE.appUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-6 py-2.5 text-sm font-semibold text-[#05060b] transition-opacity hover:opacity-90'
							>
								Launch the app
							</a>
							<a
								href={SITE.docs}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white'
							>
								Read the docs
							</a>
						</div>
					</div>
				</div>
			</article>

			<Footer />
		</main>
	);
}
