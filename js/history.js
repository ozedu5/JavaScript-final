// ============================================================
//  history.js — 계산 기록 관리 (localStorage)
//  📝 과제: 💡 표시된 빈칸을 채워 기능을 완성하세요.
// ============================================================

const STORAGE_KEY = "calc_history";
const MAX_COUNT = 20;


// ── 과제 5: 기록 불러오기 ────────────────────────────────────

export const loadHistory = () => {
  // localStorage에서 저장된 기록 가져오기
  const savedHistory = localStorage.getItem(STORAGE_KEY);

  // 저장된 기록이 없으면 빈 배열 반환
  if (savedHistory === null) {
    return [];
  }

  // 문자열을 배열로 변환해서 반환
  return JSON.parse(savedHistory);
};


// ── 과제 6: 기록 저장 ────────────────────────────────────────

export const saveHistory = (history) => {
  // 최대 20개까지만 저장
  const limitedHistory = history.slice(0, MAX_COUNT);

  // 배열을 문자열로 변환해서 localStorage에 저장
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(limitedHistory)
  );
};


// ── 과제 7: 기록 항목 추가 ───────────────────────────────────

export const addHistory = (expression, result) => {
  // 1. 기존 기록 가져오기
  const history = loadHistory();

  // 새로 저장할 기록
  const newItem = {
    expression: expression,
    result: result,
    date: new Date().toLocaleString("ko-KR"),
  };

  // 2. 새 기록을 배열 맨 앞에 추가
  const updatedHistory = [newItem, ...history];

  // 3. localStorage에 저장
  saveHistory(updatedHistory);

  // 4. 업데이트된 배열 반환
  return updatedHistory.slice(0, MAX_COUNT);
};


// ── 도전 2: 기록 개별 삭제 (선택 과제) ──────────────────────

export const deleteHistoryItem = (index) => {
  // 기존 기록 가져오기
  const history = loadHistory();

  // 선택한 index를 제외한 새로운 배열 만들기
  const updatedHistory = history.filter(
    (item, i) => i !== index
  );

  // 변경된 기록 저장
  saveHistory(updatedHistory);

  // 변경된 배열 반환
  return updatedHistory;
};


// ── 기록 전체 삭제 (완성 코드 — 수정 금지) ──────────────────

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};