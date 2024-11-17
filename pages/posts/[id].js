import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Editor from '../../components/Editor';

const EditPost = () => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setTitle(data.title);
                    setContent(data.content);
                })
                .catch((error) => console.error('Error fetching post:', error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            // Handle success
            console.log('Post updated successfully');
        } else {
            // Handle error
            console.error('Failed to update post');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <Editor value={content} onChange={setContent} />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPost;
