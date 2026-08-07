<?php

namespace App\Http\Controllers;

use App\Models\Solicitacao;
use App\Notifications\SolicitacaoStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SolicitacaoController extends Controller
{
    public function index()
    {
        $solicitacoes = Solicitacao::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Solicitacoes/Index', [
            'solicitacoes' => $solicitacoes,
        ]);
    }

    public function adminIndex()
    {
        $solicitacoes = Solicitacao::with('user')
            ->latest()
            ->get();

        return Inertia::render('Solicitacoes/Admin', [
            'solicitacoes' => $solicitacoes,
        ]);
    }

    public function avaliar(Request $request, Solicitacao $solicitacao)
    {
        $request->validate([
            'status' => 'required|in:aprovada,recusada',
        ]);

        $solicitacao->update(['status' => $request->status]);

        $solicitacao->user->notify(new SolicitacaoStatusNotification($solicitacao));

        return back()->with('success', 'Solicitação '.$request->status.' com sucesso!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipo_equipamento' => 'required|string',
            'motivo' => 'required|string|max:255',
            'urgencia' => 'required|in:baixa,media,alta',
            'observacoes' => 'nullable|string',
        ]);

        Solicitacao::create([
            ...$request->only('tipo_equipamento', 'motivo', 'urgencia', 'observacoes'),
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', 'Solicitação enviada com sucesso!');
    }
}
