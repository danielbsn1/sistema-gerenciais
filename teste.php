<?php
require 'vendor/autoload.php';
$c = new App\Http\Controllers\Auth\EmailVerificationPromptController();
echo method_exists($c, '__invoke') ? 'OK' : 'FALHOU';