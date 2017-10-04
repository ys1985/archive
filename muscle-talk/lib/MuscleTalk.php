<?php

namespace MuscleTalk;

use \MuscleTalk\Chatroom;

/**
 * マッスルトーククラス
 */
class MuscleTalk
{
  /**
   * このオブジェクトをセッションに保存するときのキー
   */
  const SAVE_SESSION_NAME = 'mt';
  
  /**
   * 自分を表す Member オブジェクトのID
   */
  const MY_MEMBER_ID = 'MM000';
  
  /**
   * 自分を表す Member オブジェクト
   */
  private $me;
  
  /**
   * 友達リスト
   * @var array(Member)
   */
  private $friends = array();

  /**
   * 作成したチャットルーム一覧
   */
  private $chatrooms = array();


  /**
   * 会話を継続しているチャットルーム
   */
  private $selected_chatroom = null;
  

  /**
   * スタンプ一覧
   */
  private $stamps = array();

  /**
   * コンストラクタ
   */
  public function __construct()
  {
  }
  
  /**
   * パラメータを初期化する
   * 新規に new した場合に呼び出す
   */
  public function initialize($init_me = false)
  {
    // 自分の情報と友達リストを初期化
    $list = explode("\n", file_get_contents(DATADIR . DS . 'userlist.txt'));
    
    $cols = explode("\t", array_shift($list));
    if($init_me) {
      
      $imgs = array(
        'images/my/my001.png',
        'images/my/my002.png',
        'images/my/my003.png',
        'images/my/my004.png',
        /* 'images/my/my005.png', */
        /* 'images/my/my006.png', */
        /* 'images/my/my007.png', */
        /* 'images/my/my008.png', */
        /* 'images/my/my009.png', */
        /* 'images/my/my010.png', */
      );
      $img = $imgs[mt_rand(0, count($imgs) - 1)];
      $this->me = new Member(self::MY_MEMBER_ID, $cols[1], $cols[2], $img);
    }
    
    $this->friends = array();
    foreach($list as $line) {
      $line = trim($line);
      if(!$line) continue;

      if(count($cols) !=4) {
        var_dump($cols);
      }
      
      $cols = explode("\t", $line);
      $m = new Member($cols[0], $cols[1], $cols[2], $cols[3]);
      $this->friends[] = $m;
    }
  }

  /**
   * wakeup したときは友達リストとかを更新する
   */
  public function __wakeup()
  {
    //$this->initialize(false);
  }
  
  /**
   * 自分の情報を返す
   */
  public function getMyInfo()
  {
    return $this->me;
  }
  
  /**
   * 友達リストを取得する
   */
  public function getFriends()
  {
    return $this->friends;
  }
  
  /**
   * 相手メンバーを指定して発言先のチャットルームを設定する
   * チャットルームがまだ未作成の場合は作成する
   */
  public function selectChatroom(Member $member)
  {
    if(!isset($this->chatrooms[$member->getId()])) {
      $room = new Chatroom();
      $room->addMember($this->me);
      $room->addMember($member);

      $this->chatrooms[$member->getId()] = $room;
    }
    
    $this->selected_chatroom = $this->chatrooms[$member->getId()];
  }
  
  /**
   * 選択したチャットルームの全発言を返す
   */
  public function getMessages()
  {
    // ブックマークのセットだけする
    if(!$this->selected_chatroom) {
      header('Location: http://talk.gmobb.jp/');
      exit;
    }
    $ms = $this->selected_chatroom->getMessages();
    $this->bookmark = count($ms);

    if($this->bookmark == 0) {
      $this->say('こんにちは');
    }
    
    return $ms;
  }
  
  /**
   * 選択したチャットルームの新着発言を返す
   */
  private $bookmark = null;
  public function getNewMessages()
  {
    if(!$this->bookmark) {
      $ms = $this->getMessages();
      
    } else {
      $adding = false;
      $ms = array();
      foreach($this->selected_chatroom->getMessages() as $no => $m) {
        if($this->bookmark == $no) {
          $adding = true;
        } else if($adding) {
          $ms[] = $m;
        }
      }
      $this->bookmark = $no;
      
      $this->randmuscle($ms);
    }
    
    return $ms;
  }

  private function convert($str)
  {
    $str = mb_convert_kana($str, 'haV');
    $str = strtolower($str);
    return $str;
  }

  // 適当にマッスル発言を混ぜる
  private function randmuscle(&$talks)
  {
    $responses = array();
    $timeouts  = array();
    $nomatches = array();
    foreach(explode("\n", file_get_contents(DATADIR . DS . 'talk.txt')) as $line) {
      $line = trim($line);
      if(!$line) continue;
      
      $cols = explode("\t", $line);
      if(count($cols) == 1) $cols[] = '';
      if(count($cols) == 2) $cols[] = '';
      list($id, $match, $text) = $cols;

      $match = $this->convert($match);
      
      if(!$text) continue;

      if($match == 'timeout') {
        $timeouts[] = array(
          'id' => $id,
          'match' => $match,
          'text' => $text
        );
        
      } else if($match == 'random') {
        $nomatches[] = array(
          'id' => $id,
          'match' => $match,
          'text' => $text
        );
        
      } else {
      
        $responses[] = array(
          'id' => $id,
          'match' => $match,
          'text' => $text
        );
      }
    }

    
    $response_text = '';
    if($this->last_my_message) {
      $current = $this->last_my_message;
      if($current->getMember()->getId() == self::MY_MEMBER_ID) {
        
        // マッチするレスポンスを探す
        $matches = array();
        foreach($responses as $res) {
          if(strpos(
              $this->convert($this->last_my_message),
              $res['match']
            ) !== false) {
            $matches[] = $res['text'];
          }
        }
        
        if(count($matches) > 0) {
          $p = mt_rand(0, count($matches) - 1);
          $response_text = $matches[$p];
        // なければ適当に
        } else {
          $p = mt_rand(0, count($nomatches) - 1);
          $response_text =  $nomatches[$p]['text'] ;
        }

        // クリア
        $this->last_my_message = null;
      }
      
    } else {
      if(mt_rand(0, 50) == 0) {
        $p = mt_rand(0, count($timeouts) - 1);
        $response_text = $timeouts[$p]['text'] ;
      }
    }

    if(!$response_text) {
      return;
    }
    
    $ms = array();
    foreach($this->selected_chatroom->getMembers() as $member) {
      if($member->getId() != self::MY_MEMBER_ID) {
        $ms[] = $member;
      }
    }

    if($ms[0]->getId() == 'usr098') {
      $response_text = 'シュコーシュコシュコシュコココ';
    }
    
    $m = new Message($ms[0], $response_text);;
    $this->selected_chatroom->send($m);
    $talks[] = $m;
    
    $this->bookmark++;
  }

  /**
   * メッセージをすべて消去する
   */
  public function truncateMessages()
  {
    $this->selected_chatroom->truncateMessages();
  }
  
  /**
   * 自分で発言する
   */
  public $last_my_message = null;
  public function say($message)
  {
    if(!$this->selected_chatroom) {
      new \LogicException('Chatroom was not selected. Must be calling selectChatroom() method before this method.');
    }
    
    $m = new Message($this->me, $message);
    if(!$this->selected_chatroom) {
      header('Location: http://talk.gmobb.jp/');
      exit;
    }
    $this->selected_chatroom->send($m);

    // logging
    file_put_contents(TMPDIR . '/chatlog.txt',
      
      date('Y-m-d H:i:s') . "\t" . $_SERVER['REMOTE_ADDR'] . "\t" . $message . "\n", FILE_APPEND);
    
    $this->last_my_message = $m;
    $this->bookmark++;
  }


  /**
   * スタンプの一覧を返す
   */
  public function getStamps()
  {
    if(true || count($this->stamps) == 0) {
      $this->stamps = array();
      foreach(explode("\n", file_get_contents(DATADIR . DS . 'stamp.txt')) as $line) {
        $line = trim($line);
        if(!$line) continue;
        
        $cols = explode("\t", $line);
      
        $s = new Stamp($cols[0], $cols[1], $cols[2], null, null, null);
        $this->stamps[$s->getId()] = $s;
      }
    }
    
    return $this->stamps;
  }

  /**
   * ブロックする
   */
  public function setBlock($member_id, $b)
  {
    foreach($this->friends as $f) {
      if($f->getId() == $member_id) {
        $b = $b == 1 ? true : false;
        $f->setBlocked($b);
      }
    }
  }

  /**
   * デストラクタ
   * オブジェクトをセッションに保存する
   */
  public function __destruct()
  {
    $_SESSION[self::SAVE_SESSION_NAME] = serialize($this);
  }
}



