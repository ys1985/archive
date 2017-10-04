<?php

/**
 * muscle talk バックエンド
 *
 * Post パラメータの説明
 * c => 処理内容の選択(talk, messages)
 * 
 */

use MuscleTalk\Backend;

$base = dirname(__FILE__);
require_once $base . '/lib/bootstrap.php';

$mt = get_muscletalk();
$backend = new Backend($mt);

// ----

$params = $_POST;
if(!$params) {
  $params = $_GET;
}
if(!isset($params)) {
  print "404";
  header('HTTP/1.1 404 Not Found');
  exit;
}

switch($params['c']) {
  case 'talk':

    if(!isset($params['m'])) {
      forward404();
    }
    
    $backend->talk($params['m']);
    $retval = null;
    break;
    
  case 'new_messages':
    $retval = $backend->getNewMessages();
    break;
    
  case 'myinfo':
    $retval = $backend->getMyInfo();
    break;
    
  case 'messages':
    $retval = $backend->getMessages();
    break;
    
  case 'truncate':
    $backend->truncate();
    break;
    
  default:
    forward404();
}


header('Content-type: application/json');
echo $backend->convertJson($retval);
exit;
