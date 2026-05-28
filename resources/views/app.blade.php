<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">

    @viteReactRefresh
    @vite('resources/ts/app.tsx')

    @inertiaHead
</head>

<body>
    @inertia
</body>
</html>