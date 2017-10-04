<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

$mt = get_muscletalk();
$params = $_GET;

if(!isset($params['m']) || !isset($params['b'])) {
  forward404();
}
if($params['b'] != "1" && $params['b'] != "0") {
  forward404();
}

$mt->setBlock($params['m'], $params['b']);

header('Location: index.php');


