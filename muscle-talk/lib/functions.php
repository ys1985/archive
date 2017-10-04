<?php

function h($str)
{
  echo htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function h_icon($imgname, $type)
{
  $imgname = str_replace( '.png', '_' . $type . '.png', $imgname);
  echo $imgname;
}

function forward404()
{
  header('HTTP/1.1 404 NotFound');
  print "404";
  exit;
}

function output($tplname, $params = null)
{
  if(is_array($params)) {
    extract($params);
  }
  $content_template = TPLDIR . DS . $tplname . '.html';
  
  $layout = TPLDIR . DS . 'layout.html';
  include $layout;
}


