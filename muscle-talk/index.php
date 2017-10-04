<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

$mt = get_muscletalk();
$me = $mt->getMyInfo();
$members = $mt->getFriends();


output('index', array('me' => $me, 'members' => $members));

