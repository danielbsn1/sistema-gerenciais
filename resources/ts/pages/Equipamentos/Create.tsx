import { Link, useForm } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import "../../styles/form.css";
import "../../styles/equipamentos.css";

export default function EquipamentosCreate() {
    const { data, setData, post, processing, errors } = useForm({
        patrimonio_id: "",
        tipo: "",
        marca: "",
        modelo: "",
        observacoes: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/equipamentos");
    }

    return (
        <AppLayout title="Novo Equipamento">
            <div className="page-form">
                <div className="form-card">
                    <div className="form-card__header">
                        <h2 className="form-card__title">Cadastrar Equipamento</h2>
                        <p className="form-card__subtitle">Preencha os dados do novo ativo</p>
                    </div>

                    <form onSubmit={handleSubmit} id="create-eq-form">
                        <div className="form-card__body">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label form-label--required">
                                        ID Patrimônio
                                    </label>
                                    <input
                                        className={`form-input ${errors.patrimonio_id ? "is-error" : ""}`}
                                        type="text"
                                        placeholder="Ex: PAT-0001"
                                        value={data.patrimonio_id}
                                        onChange={(e) => setData("patrimonio_id", e.target.value)}
                                    />
                                    {errors.patrimonio_id && (
                                        <span className="form-error">{errors.patrimonio_id}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label form-label--required">Tipo</label>
                                    <select
                                        className={`form-select ${errors.tipo ? "is-error" : ""}`}
                                        value={data.tipo}
                                        onChange={(e) => setData("tipo", e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="notebook">Notebook</option>
                                        <option value="desktop">Desktop</option>
                                        <option value="monitor">Monitor</option>
                                        <option value="tablet">Tablet</option>
                                    </select>
                                    {errors.tipo && (
                                        <span className="form-error">{errors.tipo}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label form-label--required">Marca</label>
                                    <input
                                        className={`form-input ${errors.marca ? "is-error" : ""}`}
                                        type="text"
                                        placeholder="Ex: Dell, Lenovo..."
                                        value={data.marca}
                                        onChange={(e) => setData("marca", e.target.value)}
                                    />
                                    {errors.marca && (
                                        <span className="form-error">{errors.marca}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label form-label--required">Modelo</label>
                                    <input
                                        className={`form-input ${errors.modelo ? "is-error" : ""}`}
                                        type="text"
                                        placeholder="Ex: Inspiron 15"
                                        value={data.modelo}
                                        onChange={(e) => setData("modelo", e.target.value)}
                                    />
                                    {errors.modelo && (
                                        <span className="form-error">{errors.modelo}</span>
                                    )}
                                </div>

                                <div className="form-group form-group--full">
                                    <label className="form-label">Observações</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Informações adicionais..."
                                        value={data.observacoes}
                                        onChange={(e) => setData("observacoes", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-card__footer">
                            <Button render={<Link href="/equipamentos" />} variant="outline">
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Salvando..." : "Cadastrar"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
