<?php

//define
define('DS', DIRECTORY_SEPARATOR);
define('APPROOT', dirname(dirname(__FILE__)));
define('LIBDIR', APPROOT . DS . 'lib');
define('DATADIR', APPROOT . DS . 'data');
define('TPLDIR', APPROOT . DS . 'template');

// session config
if($_SERVER['SERVER_NAME'] == 'talk.gmobb.jp') {
  define('TMPDIR', '/data/www/talk.gmobb.jp/tmp');
  //session_save_path(TMPDIR);
  $session_save_path = "tcp://157.7.138.161:11211?persistent=1";
  ini_set('session.save_handler', 'memcache');
  ini_set('session.save_path', $session_save_path);
} else {
  define('TMPDIR', APPROOT . DS . 'tmp');
}

// functions
require_once 'functions.php';

// session
session_name('muscletalk');
//session_regenerate_id(true);

session_start();

// class autoloading
spl_autoload_register(function($class) {
    $base = LIBDIR;
    
    $p = strrpos($class, '\\');
    if($p !== false) {
      $class = substr($class, $p + 1);
    }
    
    $class = $base . '/' . $class;
    
    include_once($class . '.php');
});

use \MuscleTalk\MuscleTalk;
function get_muscletalk()
{
  if(isset($_SESSION[MuscleTalk::SAVE_SESSION_NAME])) {
    $obj = unserialize($_SESSION[MuscleTalk::SAVE_SESSION_NAME]);
  } else {
    $obj = new MuscleTalk;
    $obj->initialize(true);
  }
  
  /* $obj = new MuscleTalk; */
  /* $obj->initialize(); */
  
  return $obj;
}
