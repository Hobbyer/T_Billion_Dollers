import React, { useState } from 'react'
import { Form, Image } from 'react-bootstrap';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
          <div style={{ width: "38%", position: "relative" }}>
            <Form.Control
              type="text"
              size="md"
              style={{
                borderRadius: "20px",
                padding: "10px 20px",
                height: "40px",
                boxShadow:"1px 1px 3px",
                border: isFocused ? "1px solid #ccc" : "none" ,  // border 없애기
              }}
              onFocus={() => setIsFocused(true)}  // 클릭 시 border 없애기
              onBlur={() => setIsFocused(false)}   // 클릭을 떼면 원래대로
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
              onClick={() => {}}
            />
          </div>
    </>
  )
}

export default SearchBar