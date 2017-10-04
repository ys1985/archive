<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

$mt = get_muscletalk();

output('stamp_shop', array('stamps' => $mt->getStamps()));

