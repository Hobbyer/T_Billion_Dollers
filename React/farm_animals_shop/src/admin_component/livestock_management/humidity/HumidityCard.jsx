import React, { useEffect, useState } from 'react';
import StatusCard from '../card/StatusCard';
import { GET } from '../../../apis/CRUD';
 // API 호출을 위한 함수

const baseURL = import.meta.env.VITE_API_URL;

const HumidityCard = () => {
  const [humidity, setHumidity] = useState(null); // 습도 상태 저장
  const [status, setStatus] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');

  // 습도 데이터를 API로 불러오기
  useEffect(() => {
    const fetchHumidity = async () => {
      try {
        const res = await GET(`${baseURL}/admin/humidity`);
        const lastHumidity = res.data[0].humidity; // 가장 최근 습도 값
        setHumidity(lastHumidity); // 습도 상태 업데이트
      } catch (error) {
        console.error('Error fetching humidity:', error);
      }
    };

    fetchHumidity();
    const interval = setInterval(fetchHumidity, 60000); // 1분마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  // 습도 상태 계산
  useEffect(() => {
    if (humidity !== null) {
      if (humidity >= 40 && humidity <= 60) {
        setStatus('✔️ 축사 적정 "습도" 범위 입니다');
        setBorderColor('success'); // 초록색
        setTooltipMessage('');
      } else {
        setStatus('❗ 축사 적정 "습도" 범위를 벗어났습니다');
        setBorderColor('danger'); // 빨간색
        if (humidity > 60) {
          setTooltipMessage(
            '높은 습도 (60% 이상): 습도가 너무 높으면 소가 더위를 더 잘 느끼게 되어 스트레스와 질병에 취약해질 수 있습니다.'
          );
        } else {
          setTooltipMessage(
            '낮은 습도 (40% 이하): 습도가 너무 낮으면 소의 호흡기 건강에 영향을 미칠 수 있습니다.'
          );
        }
      }
    }
  }, [humidity]);

  return (
    <StatusCard
    title="실시간 습도"
    value={humidity !== null ? `${humidity.toFixed(1)}%` : '불러오는 중...'}
    statusMessage={status}
    tooltipMessage={tooltipMessage}
    borderColor={borderColor}
    borderThickness={humidity >= 40 && humidity <= 60 ? 'border-3' : 'border-5'} 
  />
  
  );
};

export default HumidityCard;
