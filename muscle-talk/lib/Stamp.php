<?php

namespace MuscleTalk;

/**
 * スタンプクラス
 */
class Stamp
{
  // ID
  private $id;

  // プレースフォルダ
  private $place;
  
  // 名前
  private $name;

  // 説明
  private $description;
  
  // 画像ファイル名
  private $image;

  // 有料スタンプ
  private $payed;

  public function __construct($id, $place, $image, $name, $description, $payed)
  {
    $this->id = $id;
    $this->setName($name);
    $this->setPlace($place);
    $this->setDescription($description);
    $this->setImage($image);
    $this->setPayed((bool)$payed);
  }

  public function getId()
  {
    return $this->id;
  }
  
  public function setPlace($place)
  {
    $this->place = $place;
  }

  public function getPlace()
  {
    return $this->place;
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

  public function setImage($image)
  {
    $this->image = $image;
  }

  public function getImage()
  {
    return $this->image;
  }

  public function getThumb()
  {
    //return str_replace('.png', '_thumb.png', $this->image);
    return $this->image;
  }

  public function setPayed($payed)
  {
    $this->payed = $payed;
  }

  public function getPayed()
  {
    return $this->payed;
  }

  public function toArray()
  {
    return array(
      'id' => $this->id,
      'place' => $this->place,
      'name' => $this->name,
      'description' => $this->description,
      'image' => $this->image,
    );
  }    
}
