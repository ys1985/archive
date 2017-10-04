<?php

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

if(!isset($_GET['mid'])) {
  forward404();
}

$mt = get_muscletalk();

$member = null;
foreach($mt->getFriends() as $m) {
  if($m->getId() == $_GET['mid']) {
    $member = $m;
    break;
  }
}

if(!$member) {
  print "404";
  exit;
}
 
$mt->selectChatroom($member);

$stamps = $mt->getStamps();
output('talk', array('member' => $member, 'stamps' => $stamps));
