// ============================================================
//  calculator.js — 계산기 핵심 로직
//  📝 과제: 💡 표시된 빈칸을 채워 기능을 완성하세요.
// ============================================================

const mainDisplay = document.getElementById("mainDisplay");
const subDisplay = document.getElementById("subDisplay");

let expression = ""; // 현재 입력 중인 수식 문자열
let justCalculated = false; // 방금 = 을 눌렀는지 여부

// 디스플레이 갱신 — main.js에서도 호출합니다 (수정 금지)
export const updateDisplay = () => {
  mainDisplay.textContent = expression || "0";
  mainDisplay.style.fontSize = expression.length > 10 ? "1.8rem" : "2.6rem";
};

// ── 과제 1: 숫자 / 소수점 입력 ──────────────────────────────

export const appendNumber = (num) => {
  // 규칙 1.
  // justCalculated가 true이면 새로운 계산 시작
  if (justCalculated) {
    expression = "";
  }

  // 규칙 2.
  // expression이 "0"일 때 숫자를 누르면 "0"을 대체
  if (expression === "0") {
    if (num === ".") {
      expression = "0.";
    } else {
      expression = num;
    }

    justCalculated = false;
    updateDisplay();
    return;
  }

  // 규칙 3.
  // 현재 숫자 구간에 소수점이 이미 있으면 "." 추가하지 않음
  if (num === ".") {
    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (currentNumber.includes(".")) {
      return;
    }
  }

  expression += num;

  justCalculated = false;
  updateDisplay();
};

// ── 과제 2: 연산자 입력 ─────────────────────────────────────

export const appendOperator = (op) => {
  // 규칙 1.
  // expression이 비어 있으면 연산자 입력 무시
  if (expression === "") {
    return;
  }

  const lastChar = expression[expression.length - 1];

  // 규칙 2.
  // 마지막 문자가 연산자라면 새로운 연산자로 교체
  if (["+", "-", "*", "/"].includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }

  // 규칙 3.
  // 계산 결과 뒤에 이어서 연산 가능
  justCalculated = false;

  updateDisplay();
};

// ── 과제 3: 계산 실행 ───────────────────────────────────────

export const calculate = () => {
  const lastChar = expression[expression.length - 1];

  // 규칙 1.
  // expression이 비어 있거나 연산자로 끝나면 계산하지 않음
  if (expression === "" || ["+", "-", "*", "/"].includes(lastChar)) {
    return null;
  }

  // 규칙 2.
  // 0으로 나누기 감지
  if (/\/0/.test(expression)) {
    subDisplay.textContent = "0으로 나눌 수 없습니다.";
    return null;
  }

  // 계산 전 원래 수식을 저장
  const originalExpression = expression;

  // 실제 계산
  const result = Function('"use strict"; return (' + expression + ")")();

  // 부동소수점 오류 처리
  const resultString = parseFloat(result.toFixed(10)).toString();

  // 규칙 3.
  // 계산 결과 화면에 출력
  mainDisplay.textContent = resultString;

  mainDisplay.style.fontSize = resultString.length > 10 ? "1.8rem" : "2.6rem";

  subDisplay.textContent = originalExpression + " =";

  justCalculated = true;

  // 결과값을 expression에 저장
  // 예: 3 + 5 = 8 이후 8 + 2 계산 가능
  expression = resultString;

  // 규칙 4.
  // 기록 저장을 위해 객체 반환
  return {
    expression: originalExpression,
    result: resultString,
  };
};

// ── 과제 4: 마지막 문자 삭제 ────────────────────────────────

export const deleteLast = () => {
  // 규칙 1.
  // 계산 직후라면 전체 초기화
  if (justCalculated) {
    clearAll();
    return;
  }

  // 규칙 2.
  // 마지막 문자 하나 제거
  expression = expression.slice(0, -1);

  updateDisplay();
};

// ── 도전 1: % 연산 (선택 과제) ──────────────────────────────

export const appendPercent = () => {
  // 💡 [도전 1] 여기에 코드를 작성하세요.
};

// ── 도전 3: 기록 클릭 시 결과 불러오기 (선택 과제) ──────────

export const setExpression = (value) => {
  // 💡 [도전 3] 여기에 코드를 작성하세요.
};

// ── 전체 초기화 (완성 코드 — 수정 금지) ─────────────────────

export const clearAll = () => {
  expression = "";
  justCalculated = false;

  mainDisplay.textContent = "0";
  mainDisplay.style.fontSize = "2.6rem";
  subDisplay.textContent = "";

  document
    .querySelectorAll(".btn-op")
    .forEach((b) => b.classList.remove("active"));
};
