<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notificacoes = $request->user()->notifications()->latest()->paginate(20);

        return Inertia::render('Notificacoes/Index', [
            'notificacoes' => $notificacoes,
        ]);
    }

    public function markAsRead(Request $request, DatabaseNotification $notification)
    {
        abort_if($notification->notifiable_id !== $request->user()->id, 403);

        $notification->markAsRead();

        return back();
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return back();
    }

    public function downloadErros(Request $request, DatabaseNotification $notification)
    {
        abort_if($notification->notifiable_id !== $request->user()->id, 403);

        $caminho = $notification->data['caminho_erros'] ?? null;

        if (! $caminho || ! Storage::exists($caminho)) {
            abort(404, 'Arquivo de erros não encontrado.');
        }

        return Storage::download($caminho);
    }
}
