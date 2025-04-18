import { useEffect, useState } from "react";

import React from 'react'
import StatusCard from "../card/StatusCard";
import { GET } from "../../../apis/CRUD";

const baseURL = import.meta.env.VITE_API_URL;

// 온도 카드 컴포넌트
const TemperatureCard = () => {
  const [status, setStatus] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [temp, setTemp] = useState([]); // 온도 데이터 받아오기

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await GET(`${baseURL}/admin/temp`);
        setTemp(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTemperature();
    const interval = setInterval(fetchTemperature, 60000); // 1분마다 데이터 갱신

    return () => clearInterval(interval);
  }, []);

  // 온도 상태 계산
  useEffect(() => {
    if (temp.length > 0) {
      const latestTemp = temp[temp.length - 1].temp;
  
      if (latestTemp <= 25) {
        setStatus('✔️ 축사 적정 "온도" 범위 입니다');
        setBorderColor('success'); // 초록색
        setTooltipMessage(
          '추운 날씨: 소는 추위에 강한 편이지만, 0도 이하로 내려가면 기후에 따라 소가 저체온증을 겪을 수 있습니다.'
        );
      } else {
        setStatus('❗ 축사 적정 "온도" 범위를 벗어났습니다');
        setBorderColor('danger'); // 빨간색
        setTooltipMessage(
          '더운 날씨: 25도 이상에서는 소가 더위에 스트레스를 받을 수 있습니다.'
        );
      }
    }
  }, [temp]);

  return (
    <StatusCard
      title="실시간 온도"
      value={temp.length > 0 ? `${temp[temp.length - 1].temp}°C` : '불러오는 중...'}
      statusMessage={status}
      tooltipMessage={tooltipMessage}
      borderColor={borderColor}
      borderThickness={
        temp.length > 0 && temp[temp.length - 1].temp <= 25
          ? 'border-3'
          : 'border-5'
      }
    />
  );
};

export default TemperatureCard