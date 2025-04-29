// app/stock/TemperatureCard.jsx

import React, { useEffect, useState } from 'react';
import { GET } from '@/apis/CRUD';
import StatusCard from '../common/StatusCard';
import { baseURL } from '../../apis/CRUD';
import { GET_API } from '../../apis/testcrud';

// const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function TemperatureCard() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    let m = true;
    const fn = async () => {
      try {
        const r = await GET_API(`/admin/temp`);
        if (m && r.length) {
          setTemp(r[r.length - 1].temp);
        }
      } catch (e) { console.error(e); }
    };
    fn();
    const iv = setInterval(fn, 60000);
    return () => { m = false; clearInterval(iv); };
  }, []);

  const ok = temp !== null && temp <= 25;
  return (
    <StatusCard
      title="실시간 온도"
      value={temp !== null ? `${temp}°C` : '불러오는 중...'}
      statusMessage={ok ? '✔️ 적정 범위' : '❗ 범위 벗어남'}
      tooltipMessage={
        ok
          ? '축사 적정 온도 범위입니다.'
          : '25°C 초과 시 소가 열 스트레스를 받을 수 있습니다.'
      }
      borderColor={ok ? 'green' : 'red'}
      borderThickness={ok ? 2 : 4}
    />
  );
}
