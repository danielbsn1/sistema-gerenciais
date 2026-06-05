import { useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post("/login");
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={submit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />

                <button disabled={processing}>Entrar</button>

                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
            </form>
        </div>
    );
}
