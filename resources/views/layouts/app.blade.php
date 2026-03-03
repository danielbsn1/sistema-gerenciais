<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reurb Patrimônio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans">

<div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div class="p-6 border-b border-gray-700">
            <h1 class="text-xl font-bold text-blue-400">🏗️ Reurb</h1>
            <p class="text-xs text-gray-400 mt-1">Gestão de Patrimônio</p>
        </div>
        <nav class="flex-1 p-4 space-y-1">
            <a href="{{ route('dashboard') }}"
               class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition
                      {{ request()->routeIs('dashboard') ? 'bg-blue-600' : '' }}">
                <i class="fa fa-chart-bar w-5"></i> Dashboard
            </a>
            <a href="{{ route('equipamentos.index') }}"
               class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition
                      {{ request()->routeIs('equipamentos.*') ? 'bg-blue-600' : '' }}">
                <i class="fa fa-laptop w-5"></i> Equipamentos
            </a>
            <a href="{{ route('funcionarios.index') }}"
               class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition
                      {{ request()->routeIs('funcionarios.*') ? 'bg-blue-600' : '' }}">
                <i class="fa fa-users w-5"></i> Funcionários
            </a>
            <a href="{{ route('emprestimos.index') }}"
               class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition
                      {{ request()->routeIs('emprestimos.*') ? 'bg-blue-600' : '' }}">
                <i class="fa fa-exchange-alt w-5"></i> Empréstimos
            </a>
        </nav>
        <div class="p-4 border-t border-gray-700">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="w-full text-left flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition text-sm">
                    <i class="fa fa-sign-out-alt"></i> Sair
                </button>
            </form>
        </div>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-700">@yield('titulo', 'Dashboard')</h2>
            <span class="text-sm text-gray-500">{{ auth()->user()->name ?? 'Admin' }}</span>
        </header>

        <div class="p-8">
            @if(session('success'))
                <div class="mb-6 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg">
                    ✅ {{ session('success') }}
                </div>
            @endif
            @if($errors->any())
                <div class="mb-6 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
                    <ul class="list-disc list-inside text-sm">
                        @foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach
                    </ul>
                </div>
            @endif

            @yield('content')
        </div>
    </main>

</div>

</body>
</html>
