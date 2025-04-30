// app/stock/HumidityCard.jsx

import React, { useEffect, useState } from 'react';
import { GET } from '@/apis/CRUD';
import StatusCard from '../common/StatusCard';
import { GET_API } from '../../apis/testcrud';

// const baseURL = 'http://192.168.204.19:8080'; // PC의 LAN IP (테스트용)

export default function HumidityCard() {
  const [hum, setHum] = useState(null);

  useEffect(() => {
    let m = true;
    const fn = async () => {
      try {
        const r = await GET_API(`/admin/humidity`);
        if (m && r.length) setHum(r[0].humidity);
      } catch (e) { console.error(e); }
    };
    fn();
    const iv = setInterval(fn, 60000);
    return () => { m = false; clearInterval(iv); };
  }, []);

  const ok = hum !== null && hum >= 40 && hum <= 60;
  return (
    <>
      <StatusCard
        title="실시간 습도"
        value={hum !== null ? `${hum}%` : '불러오는 중...'}
        statusMessage={ok ? '✔️ 적정 범위' : '❗ 범위 벗어남'}
        tooltipMessage={
          ok
            ? ''
            : hum > 60
            ? '높은 습도: 곰팡이·세균 번식 위험'
            : '낮은 습도: 호흡기 질환 위험'
        }
        borderColor={ok ? 'green' : 'red'}
        borderThickness={ok ? 2 : 4}
      />

    </>
  );
}
