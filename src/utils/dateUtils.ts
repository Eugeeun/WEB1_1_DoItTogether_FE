/**
 * 주어진 날짜 문자열을 "YYYY-MM-DD" 형식의 문자열로 변환합니다.
 *
 * @param date - 변환할 날짜 문자열
 * @return "YYYY-MM-DD" 형식의 문자열
 */
export function formatDateToISO(date: string): string {
  return date.replace(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/, (_, year, month, day) => {
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
  });
}

/**
 * 주어진 Date 객체를 "YYYY-MM-DD" 형식의 문자열로 변환합니다.
 *
 * @param date - 변환할 Date 객체
 * @return "YYYY-MM-DD" 형식의 문자열
 */
export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0'); // 일자가 한 자리 수일 경우 앞에 0 추가
  return `${year}-${month}-${day}`;
}

/**
 * 특정 날짜가 속한 년도, 월, 주차를 문자열로 반환합니다.
 *
 * @param date - 확인할 날짜 (Date 객체)
 * @return 년도, 월, 주차 정보가 포함된 문자열
 */
export function getWeekText(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0부터 시작하므로 11월은 10
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // 한 주의 시작이 일요일부터 시작되도록 함
  const adjustedDay = date.getDate() + firstDayOfWeek; // 날짜 + 첫 주의 시작 위치 보정
  const weekNumber = Math.ceil(adjustedDay / 7);

  const weekLabels: { [key: number]: string } = {
    1: '첫째 주',
    2: '둘째 주',
    3: '셋째 주',
    4: '넷째 주',
    5: '다섯째 주',
  };

  if (weekNumber > 5 || !weekLabels[weekNumber]) {
    const nextMonth = new Date(date);
    nextMonth.setDate(1); // 현재 달의 1일로 설정
    nextMonth.setMonth(nextMonth.getMonth() + 1); // 다음 달로 이동

    return `${nextMonth.getFullYear()}년 ${new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(nextMonth)} 첫째 주`;
  }

  return `${year}년 ${new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(date)} ${weekLabels[weekNumber]}`;
}
