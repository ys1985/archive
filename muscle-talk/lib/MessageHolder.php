<?php

namespace MuscleTalk;

use \MuscleTalk\Message;

/**
 * メッセージを集約するクラス
 */
class MessageHolder extends \ArrayIterator
{
  public function append($value)
  {
    if($value instanceof Message) {
      parent::append($value);
      
    } else {
      throw new \InvalidArgumentException('append() method only accept the Message instance');
    }
  }
}