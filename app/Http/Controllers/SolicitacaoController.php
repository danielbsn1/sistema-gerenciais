<?php

namespace App\Http\Controllers;

use App\Actions\AvaliarSolicitacaoAction;
use App\Http\Requests\AvaliarSolicitacaoRequest;
use App\Http\Requests\StoreSolicitacaoRequest;
use App\Http\Resources\SolicitacaoResource;
use App\Models\Solicitacao;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SolicitacaoController extends Controller
{
    public function index()
    {
        if (Auth::user()?->role === 'admin') {
            return redirect()->route('solicitacoes.admin');
        }

        $solicitacoes = Solicitacao::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Solicitacoes/Index', [
            'solicitacoes' => SolicitacaoResource::collection($solicitacoes)->resolve(),
        ]);
    }

    public function adminIndex()
    {
        $solicitacoes = Solicitacao::with('user')
            ->latest()
            ->get();

        return Inertia::render('Solicitacoes/Admin', [
            'solicitacoes' => SolicitacaoResource::collection($solicitacoes)->resolve(),
        ]);
    }

    public function store(StoreSolicitacaoRequest $request)
    {
        Solicitacao::create([
            ...$request->validated(),
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', 'Solicitação enviada com sucesso!');
    }

    public function avaliar(AvaliarSolicitacaoRequest $request, Solicitacao $solicitacao)
    {
        app(AvaliarSolicitacaoAction::class)->execute($solicitacao, $request->status);

        return back()->with('success', 'Solicitação ' . $request->status . ' com sucesso!');
    }
}
