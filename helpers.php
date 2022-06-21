<?php

use Library\Auth\Authentifier;
use Library\Session\ErrorManager;

function url(string $path): string
{
    return $_SERVER['SCRIPT_NAME'] . $path;
}

function error(): ErrorManager
{
    return new ErrorManager();
}

function auth(): Authentifier
{
    return new Authentifier();
}