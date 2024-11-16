import { signIn } from 'next-auth/client';

const SignIn = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        await signIn('credentials', { username, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
