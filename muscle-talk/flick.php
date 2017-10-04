<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

$mt = get_muscletalk();
$members = $mt->getFriends();

output('flick');


