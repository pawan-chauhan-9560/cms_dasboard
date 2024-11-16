import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const posts = await prisma.post.findMany();
                return res.status(200).json(posts);

            case 'POST':
                // Ensure req.body is not null and contains valid data
                if (!req.body || typeof req.body !== 'object') {
                    return res.status(400).json({ error: 'Invalid request body' });
                }

                const { title, content } = req.body;

                // Basic validation
                if (!title || !content) {
                    return res.status(400).json({ error: 'Title and content are required' });
                }

                const slug = title.toLowerCase().replace(/ /g, '-');

                // Check for unique slug
                const existingPost = await prisma.post.findUnique({ where: { slug } });
                if (existingPost) {
                    return res.status(400).json({ error: 'Slug must be unique' });
                }

                const newPost = await prisma.post.create({
                    data: { title, slug, content },
                });
                return res.status(201).json(newPost);

            case 'PUT':
                // Ensure req.body is valid and contains required fields
                if (!req.body || typeof req.body !== 'object') {
                    return res.status(400).json({ error: 'Invalid request body' });
                }

                const { id, updatedTitle, updatedContent } = req.body;

                // Basic validation
                if (!id || !updatedTitle || !updatedContent) {
                    return res.status(400).json({ error: 'ID, title, and content are required' });
                }

                const updatedSlug = updatedTitle.toLowerCase().replace(/ /g, '-');

                // Check for unique slug, excluding the current post
                const existingSlugPost = await prisma.post.findFirst({
                    where: {
                        slug: updatedSlug,
                        id: { not: id },
                    },
                });
                if (existingSlugPost) {
                    return res.status(400).json({ error: 'Slug must be unique' });
                }

                const updatedPost = await prisma.post.update({
                    where: { id },
                    data: { title: updatedTitle, slug: updatedSlug, content: updatedContent },
                });
                return res.status(200).json(updatedPost);

            case 'DELETE':
                // Ensure req.body is valid and contains postId
                if (!req.body || typeof req.body !== 'object' || !req.body.postId) {
                    return res.status(400).json({ error: 'Post ID is required' });
                }

                const { postId } = req.body;
                await prisma.post.delete({ where: { id: postId } });
                return res.status(204).end();

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error in handler:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}
