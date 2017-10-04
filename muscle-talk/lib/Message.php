<?php

namespace MuscleTalk;

use MuscleTalk\Participant;

/**
 * メッセージクラス
 * 一つ一つの発言を表す
 */
class Message
{
  // /var MessageId
  private $id;
  
  // @var Member 発言者
  private $member;
  
  // @var string 発言内容
  private $text;
  
  /**
   * @param string 発言の内容
   */
  public function __construct(Member $member, $text)
  {
    $this->id = sha1(mt_rand());
    $this->member = $member;
    $this->text = $text;
  }

  public function getId()
  {
    return $this->id;
  }
  
  public function __toString()
  {
    return $this->text;
  }

  public function getMember()
  {
    return $this->member;
  }

  public function toArray()
  {
    return array(
      'id' => $this->id,
      'member' => $this->member->toArray(),
      'text' => $this->text
    );
  }
}
  
