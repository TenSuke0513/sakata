package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// 記事のデータ構造
type Article struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

// 仮データ
var articles = []Article{
	{ID: 1, Title: "毎日コツコツgo", Content: "goの基礎を学びたい"},
	{ID: 2, Title: "Echoってなんだ", Content: "Echoの使い方を学びたい"},
	{ID: 3, Title: "メモを取ることを忘れず", Content: "梵字徹底"},
}

func main() {
	e := echo.New()

	// CORS設定ってなんぞや
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	// 記事一覧API
	e.GET("/articles", getArticles)
	e.GET("/articles/:id", getArticleByID)

	// サーバー起動
	e.Logger.Fatal(e.Start(":8080"))
}

func getArticles(c echo.Context) error {
	return c.JSON(http.StatusOK, articles)
}

func getArticleByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	for _, article := range articles {
		if article.ID == id {
			return c.JSON(http.StatusOK, article)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "Article not found"})
}
