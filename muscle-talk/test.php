<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

use \MuscleTalk\Message;
use \MuscleTalk\Participant;
use \MuscleTalk\MessageHolder;

$p = new Participant(1, 'Hironobu', 'face.jpg');
$m = new Message($p, 'test message');

$h = new MessageHolder();
$h->append($m);

