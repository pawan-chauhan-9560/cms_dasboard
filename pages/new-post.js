import { useState } from 'react';
import Editor from '../components/Editor';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            console.log('Post created successfully');
        } else {
            console.error('Failed to create post');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <Editor value={content} onChange={setContent} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                Create Post
            </button>
        </form>
    );
};

export default NewPost;
