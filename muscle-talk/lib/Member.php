<?php

namespace MuscleTalk;

/**
 * チャットの参加者を表す基底クラス
 */
class Member
{
  // ID
  private $id;

  // 表示名
  private $name;

  // 説明
  private $description;

  // アイコン画像ファイル名
  private $icon;

  // ブロック済み
  private $blocked = false;

  public function __construct($id, $name, $description, $icon)
  {
    $this->id = $id;
    $this->setName($name);
    $this->setDescription($description);
    $this->setIcon($icon);
  }

  public function getId()
  {
    return $this->id;
  }
  
  public function setName($name)
  {
    $this->name = $name;
  }

  public function getName()
  {
    return $this->name;
  }

  public function setDescription($description)
  {
    $this->description = $description;
  }

  public function getDescription()
  {
    return $this->description;
  }

  public function setIcon($icon)
  {
    $this->icon = $icon;
  }

  public function getIcon()
  {
    return $this->icon;
  }
  
  public function setBlocked($block)
  {
    $this->blocked = (bool)$block;
  }
  
  public function isBlocked()
  {
    return $this->blocked;
  }

  public function toArray()
  {
    return array(
      'id' => $this->id,
      'name' => $this->name,
      'icon' => $this->icon,
      'blocked' => $this->blocked
    );
  }    
}
