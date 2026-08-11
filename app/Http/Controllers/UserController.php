<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = User::when($request->search, fn ($q) => $q
            ->where('name', 'like', "%{$request->search}%")
            ->orWhere('email', 'like', "%{$request->search}%"))
            ->orderBy('name')
            ->get();

        return Inertia::render('Usuarios/Index', ['usuarios' => $usuarios]);
    }

    public function create()
    {
        return Inertia::render('Usuarios/Create');
    }

    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());

        return redirect()->route('usuarios.index')->with('success', 'Usuário cadastrado!');
    }

    public function edit(User $user)
    {
        return Inertia::render('Usuarios/Edit', ['usuario' => $user]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return redirect()->route('usuarios.index')->with('success', 'Usuário atualizado!');
    }

    public function destroy(User $user)
    {
        /** @var User $authUser */
        $authUser = Auth::user();
        abort_if($user->id === $authUser->id, 403, 'Você não pode remover o próprio usuário.');

        $user->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuário removido!');
    }
}
