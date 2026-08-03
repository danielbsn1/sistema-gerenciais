import { Link, useForm } from "@inertiajs/react";
import "../../styles/auth.css";
import "../../styles/form.css";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post("/register");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-logo">Sistema Gerenciais</h1>
                    <p className="auth-subtitle">
                        Crie sua conta para solicitar equipamentos
                    </p>
                </div>

                <form onSubmit={submit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Nome completo</label>
                        <input
                            type="text"
                            className={`form-input ${errors.name ? "is-error" : ""}`}
                            placeholder="Seu nome"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <span className="form-error">{errors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
                            className={`form-input ${errors.email ? "is-error" : ""}`}
                            placeholder="seu@email.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <span className="form-error">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className={`form-input ${errors.password ? "is-error" : ""}`}
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <span className="form-error">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirmar senha</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="btn btn--primary"
                        style={{ marginTop: 8 }}
                    >
                        {processing ? "Criando conta..." : "Criar conta"}
                    </button>
                </form>

                <p className="auth-footer">
                    Já tem conta? <Link href="/login">Fazer login</Link>
                </p>
            </div>
        </div>
    );
}
