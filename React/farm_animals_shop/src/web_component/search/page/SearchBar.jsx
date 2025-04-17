import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Image, ListGroup } from "react-bootstrap";
import { SEARCH_GET } from "../apis/searchAPI";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const nav = useNavigate();
  // 검색바를 클릭시
  const [isFocused, setIsFocused] = useState(false);
  // 검색바 input내용
  const [searchText, setSearchText] = useState("");
  // 인기 검색어 가져오기(get)
  const [popularKeywords, setPopularKeywords] = useState([]);
  // 추천 카테고리 받아오는 변수(get)
  const [recommendedCategories, setRecommendedCategories] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  // 추천 카테고리 받아오기
  const fetchRecommendedCategories = async () => {
    try {
      const res = await SEARCH_GET("/items/categories/recommended");
      setRecommendedCategories(res.data); // 카테고리 상태 업데이트
    } catch (err) {
      console.error("추천 카테고리 API 호출 실패", err);
    }
  };

  // 인기 검색어 받아오기
  const fetchPopularKeywords = async () => {
    try {
      const res = await SEARCH_GET("/search/popular");
      setPopularKeywords(res.data); // 인기 검색어 상태 업데이트
    } catch (err) {
      console.error("인기 검색어 API 호출 실패", err);
    }
  };

  // 컴포넌트가 처음 렌더링 될 때 추천 카테고리와 인기 검색어 데이터 가져오기
  useEffect(() => {
    fetchRecommendedCategories();
    fetchPopularKeywords();
  }, []);

  // 검색어가 있을 경우 추천 카테고리는 숨기고, 검색 결과만 표시
  const renderSearchResults = () => {

    if (searchText) {
      // 검색어가 있으면 검색 결과만 보여줌
      return (
        <div>
          <div>"{searchText}"</div>
          {/* 여기에 검색한 상품 제목들 보여줄 부분 추가 */}
        </div>
      );
    } else {
      // 검색어가 없으면 추천 카테고리와 인기 검색어를 보여줌
      return (
        <>
          <div>
            <p className="border">추천 카테고리</p>
            <ListGroup variant="flush" style={{overflow:"hidden"}}>
              {recommendedCategories.map((category, i) => {
                console.log("렌더링", category);

                return (
                  <ListGroup.Item

                    action
                    key={i}
                    onMouseDown={(e) => {
                      e.preventDefault(); // 혹시 모를 기본 이벤트 방지
                      e.stopPropagation(); // 부모 이벤트 전파 방지

                      const reverseCategoryMap = {
                        1: "beef",
                        2: "pork",
                        3: "set",
                      };

                      const categoryPath =
                        reverseCategoryMap[category.cateCode];
                      nav(`/farmdas/cate/${categoryPath}`);
                    }}
                  >
                    {category.cateName}
                  </ListGroup.Item>
                );

              })}
            </ListGroup>
          </div>
          <div>
            <p>인기 검색어</p>
            <ListGroup variant="flush" className="rounded">
              {popularKeywords.map((keyword, i) => (
                <ListGroup.Item
                  key={i}
                  action
                  onMouseDown={() => {
                    nav(`/farmdas/search/${keyword}`);
                  }}
                >
                  {keyword}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      );
    }
  };

  const Enter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchText.trim()) {
        nav(`/farmdas/search/${searchText.trim()}`);
      }
    }
  };

  return (
    <>
      <div style={{ width: "38%", position: "relative" }}>
        <Form.Control
          name="searchText"
          type="text"
          size="md"
          defaultValue={""}
          style={{
            borderRadius: "20px",
            padding: "10px 20px",
            height: "40px",
            boxShadow: "1px 1px 3px",
            border: isFocused ? "1px solid #ccc" : "none", // border 없애기
          }}
          onFocus={() => {
            console.log("검색창 ");
            setIsFocused(true);
          }} // 클릭 시 border 없애기
          onBlur={() => setIsFocused(false)} // 클릭을 떼면 원래대로
          onChange={handleSearchTextChange}
          onKeyDown={Enter}
        />
        <Image
          src="/imgs/search_icon.jpg"
          style={{
            position: "absolute",
            top: "8px",
            right: "16px",
            width: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            nav(`/farmdas/search/${searchText}`);
          }}
        />
        {isFocused && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "0",
              width: "100%",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {renderSearchResults()}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
