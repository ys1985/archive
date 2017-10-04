<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

if(!isset($_GET['id'])) {
  forward404();
}

$stamp_id = $_GET['id'];

/*

$mt = get_muscletalk();
$stamps = $mt->getStamps();
if(!isset($stamps[$stamp_id])) {
  forward404();
}
*/

output('stamp', array(
    //'stamps' => $stamps,
    //'st' => $stamps[$stamp_id]
    'id' => $stamp_id
    ));

