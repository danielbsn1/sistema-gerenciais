import AppLayout from "../../layout/AppLayout";

export default function Show({ emprestimo }: any) {
    return (
        <AppLayout title="Detalhes do Empréstimo">
            <div className="card">
                <h2>Empréstimo #{emprestimo.id}</h2>

                <p>
                    <strong>Funcionário:</strong> {emprestimo.funcionario?.nome}
                </p>

                <p>
                    <strong>Equipamento:</strong>{" "}
                    {emprestimo.equipamento?.marca}{" "}
                    {emprestimo.equipamento?.modelo}
                </p>

                <p>
                    <strong>Status:</strong> {emprestimo.status}
                </p>
            </div>
        </AppLayout>
    );
}
