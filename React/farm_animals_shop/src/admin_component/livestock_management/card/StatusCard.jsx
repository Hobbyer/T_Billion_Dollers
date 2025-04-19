import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const StatusCard = ({
  title,
  value,
  statusMessage,
  tooltipMessage,
  borderColor,
  borderThickness,
}) => {

  const [isExpanded, setIsExpanded] = useState(false); // 설명 토글 상태

  const handleCardClick = () => {
    setIsExpanded(prev => !prev); // 클릭 시 열고 닫기 현재 값의 반대
  };

  return (
    <Card
      border={borderColor}
      style={{ width: "100%", cursor: "pointer", borderRadius:"20px",transition:"0.3s" }}
      className={`mb-4 border-${borderColor} ${borderThickness} shadow`}
      onClick={handleCardClick}
    >
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>

        <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {value}
        </Card.Text>

        <Card.Text
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: borderColor === "success" ? "#198754" : "#dc3545",
          }}
        >
          {statusMessage}
        </Card.Text>

        {isExpanded && tooltipMessage && (
          <div
            style={{
              fontSize: "1rem",
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "8px",
              marginTop: "15px",
              lineHeight: "1.6",
              color: "#333",
              whiteSpace: "pre-wrap", // 줄바꿈 유지
            }}
          >
            {tooltipMessage}
          </div>
        )}
        {/* 앱으로 가는 버튼 이후 native와 연동*/}
        <div className="d-flex justify-content-end">
          <Button
            style={{
              marginTop: "20px",
              width: "35%",
              borderRadius: "8px",
              backgroundColor:"#A3D1C6",
              border:"none"
            }}
          >
            앱으로 가기
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatusCard;
