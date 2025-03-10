package db

import (
	"fmt"
	"log"

	"github.com/sakata/sakata-api/internal/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	// MySQLの接続情報
	dsn := "root@tcp(127.0.0.1:3306)/sakata?charset=utf8mb4&parseTime=True&loc=Local"

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("MySQLに接続できませんでした:", err)
	}

	// テーブル作成
	if err := DB.AutoMigrate(&model.Article{}); err != nil {
		log.Fatal("テーブル作成に失敗しました:", err)
	}

	fmt.Println("MySQLに接続しました！")
}
