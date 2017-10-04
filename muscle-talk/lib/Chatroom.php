<?php

namespace MuscleTalk;

use \MuscleTalk\Message;
use \MuscleTalk\Member;
use \MuscleTalk\MessageHolder;

/**
 * チャット部屋
 */
class Chatroom
{
  /**
   * @var array(Member) 参加者一覧
   */
  private $members = array();

  /**
   * @var MessageHolder 会話一覧
   */
  private $mh;

  public function __construct()
  {
    $this->mh = new MessageHolder();
  }
  
  /* public function __sleep() */
  /* { */
    
  /* } */
  
  /**
   * 新規にチャットルームを初期化するメソッド
   * @return null
   */
  public function initialize()
  {
    
  }

  /**
   * メンバー一覧を返す
   */
  public function getMembers()
  {
    return $this->members;;
  }
  
  /**
   * 会話一覧を取得
   */
  public function getMessages()
  {
    return $this->mh;
  }
  
  /**
   * 会話を削除
   */
  public function truncateMessages()
  {
    return $this->mh = new MessageHolder;
  }
  
  /**
   * 新規の発言
   */
  public function send(Message $mess)
  {
    $this->mh->append($mess);
  }

  /**
   * 参加者の追加
   */
  public function addMember(Member $m)
  {
    $this->members[] = $m;
  }

}
