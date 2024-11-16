import { useState } from 'react';
import { Button, TextField, Typography, Paper, CircularProgress, Snackbar } from '@mui/material';
import Editor from '../components/Editor';
import { Alert } from '@mui/material';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        setLoading(false);

        if (response.ok) {
            setSnackbarMessage('Post created successfully');
            setSnackbarSeverity('success');
        } else {
            setSnackbarMessage('Failed to create post');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };

    return (
        <Paper elevation={3} className="p-6 mx-auto max-w-4xl mt-12 rounded-lg shadow-lg">
            <Typography variant="h4" component="h1" className="font-bold mb-4 text-center text-gray-900">
                Create New Post
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-6">
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-white"
                />
                <Editor value={content} onChange={setContent} />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    className="mt-4 transition duration-300 transform hover:scale-105 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Create Post'
                    )}
                </Button>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default NewPost;
