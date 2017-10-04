<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

use MuscleTalk\MuscleTalk;

unset($_SESSION[MuscleTalk::SAVE_SESSION_NAME]);

header('Location: index.php');

