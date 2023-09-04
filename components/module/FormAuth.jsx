const FormAuth = ({ email, password, setEmail, setPassword }) => {

    return (
        <>
            <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border-gray-500 py-3 w-full"
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl border-gray-500 py-3 w-full mt-5"
            />
        </>
    );
};

export default FormAuth;
