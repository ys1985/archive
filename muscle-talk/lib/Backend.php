<?php

namespace MuscleTalk;

class Backend
{
  /**
   * MuscleTalk object
   */
  private $mt;
  
  public function __construct($mt)
  {
    $this->mt = $mt;
  }
  
  public function convertJson($data)
  {
    return json_encode($data);
  }

  public function truncate()
  {
    $this->mt->truncateMessages();
  
  }

  public function getMyInfo()
  {
    return $this->mt->getMyInfo()->toArray();
  }
  
  public function getNewMessages()
  {
    $retval = array();
    foreach($this->mt->getNewMessages() as $m) {
      $retval[] = $m->toArray();
    }
    return $retval;
  }

  public function getMessages()
  {
    $retval = array();
    foreach($this->mt->getMessages() as $m) {
      /* $retval[] = array( */
      /*   'id' => $m->getId(), */
      /*   'message' => (string)$m, */
      /*   'member' => $m->getMember()->getName(), */
      /* ); */
      $retval[] = $m->toArray();
    }
    return $retval;
  }

  public function talk($message)
  {
    $this->mt->say($message);
  }
  
  public function block($message, $b)
  {
    $this->mt->setBlock($message, $b);
    return true;
  }
}

