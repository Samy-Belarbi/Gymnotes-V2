<?php

use Library\Auth\Authentifier;

function url(string $path): string
{
    return $_SERVER['SCRIPT_NAME'] . $path;
}

function auth(): Authentifier
{
    return new Authentifier();
}