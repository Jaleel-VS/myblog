import { marked } from 'marked';

// Configure marked for safe rendering
marked.setOptions({
	gfm: true,
	breaks: true
});

export function parseMarkdown(content: string): string {
	return marked.parse(content, { async: false }) as string;
}

export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function generateExcerpt(content: string, maxLength = 160): string {
	// Strip markdown syntax for excerpt
	const plainText = content
		.replace(/#{1,6}\s/g, '')
		.replace(/\*\*|__/g, '')
		.replace(/\*|_/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/`{1,3}[^`]*`{1,3}/g, '')
		.replace(/\n+/g, ' ')
		.trim();

	if (plainText.length <= maxLength) {
		return plainText;
	}

	return plainText.slice(0, maxLength).trim() + '...';
}
