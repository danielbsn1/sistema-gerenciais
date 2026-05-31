import { useForm } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";

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
            <div className="card">
                <div className="card__header">
                    <h2>Cadastrar Equipamento</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ID Patrimônio</label>
                        <input
                            type="text"
                            value={data.patrimonio_id}
                            onChange={(e) =>
                                setData("patrimonio_id", e.target.value)
                            }
                        />
                        {errors.patrimonio_id && (
                            <div className="error">{errors.patrimonio_id}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Tipo</label>
                        <select
                            value={data.tipo}
                            onChange={(e) => setData("tipo", e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="notebook">Notebook</option>
                            <option value="desktop">Desktop</option>
                            <option value="monitor">Monitor</option>
                            <option value="tablet">Tablet</option>
                        </select>

                        {errors.tipo && (
                            <div className="error">{errors.tipo}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Marca</label>
                        <input
                            type="text"
                            value={data.marca}
                            onChange={(e) => setData("marca", e.target.value)}
                        />

                        {errors.marca && (
                            <div className="error">{errors.marca}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Modelo</label>
                        <input
                            type="text"
                            value={data.modelo}
                            onChange={(e) => setData("modelo", e.target.value)}
                        />

                        {errors.modelo && (
                            <div className="error">{errors.modelo}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Observações</label>
                        <textarea
                            value={data.observacoes}
                            onChange={(e) =>
                                setData("observacoes", e.target.value)
                            }
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Salvando..." : "Cadastrar"}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
