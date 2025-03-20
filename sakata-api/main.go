package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/sakata/sakata-api/internal/db"
	"github.com/sakata/sakata-api/internal/model"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// MySQL 初期化
	db.InitDB()

	// CORS設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	// ユーザー
	e.POST("/auth/signin", createUser)
	e.POST("/auth/login", postLogin)

	// 記事API
	e.GET("/articles", getArticles)
	e.GET("/articles/:id", getArticleByID)
	e.POST("/articles", createArticle) // 新規作成用APIを追加

	// サーバー起動
	e.Logger.Fatal(e.Start(":8080"))
}

func createUser(c echo.Context) error {
	user := new(model.User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}
	fmt.Println(user)
	if err := db.DB.Create(user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "データ保存に失敗しました"})
	}
	return c.JSON(http.StatusCreated, user)
}

func postLogin(c echo.Context) error {
	// リクエストのパース
	req := new(model.User)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// DBからユーザーを検索
	var user model.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "ユーザーが見つかりません"})
	}

	// パスワードを照合
	if user.Password != req.Password {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "パスワードが間違っています"})
	}

	// Cookieに user_id を保存
	cookie := new(http.Cookie)
	cookie.Name = "user_id"
	cookie.Value = strconv.Itoa(int(user.ID))
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, map[string]string{"message": "ログイン成功"})
}

func getArticles(c echo.Context) error {
	var articles []model.Article
	if err := db.DB.Find(&articles).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "データ取得に失敗しました"})
	}
	return c.JSON(http.StatusOK, articles)
}

func getArticleByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	var article model.Article
	if err := db.DB.First(&article, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "記事が見つかりません"})
	}

	return c.JSON(http.StatusOK, article)
}

func createArticle(c echo.Context) error {
	article := new(model.Article)
	if err := c.Bind(article); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	if err := db.DB.Create(article).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "データ保存に失敗しました"})
	}

	return c.JSON(http.StatusCreated, article)
}
