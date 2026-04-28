// ============================================================
//  📊 GOOGLE SHEET CONFIG
//  ════════════════════════════════════════════════════════════
//  📌 Sheet ID จาก URL (ส่วนกลางที่ยาวๆ)
//  Format: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
// ============================================================
const SHEET_ID = '1Mf9v5-91ceX-r2CjW3S3abH-Ic0WdxiUojXhJbCyFTA';
const SHEET_NAME = 'Dashboard_Data';

// URL สำหรับดึงข้อมูลแบบ CSV (ฟรี ไม่ต้อง API key)
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
const INSURANCE_DETAIL_SHEET_NAME = '3. ประกัน รายละเอียด ';
const INSURANCE_DETAIL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(INSURANCE_DETAIL_SHEET_NAME)}`;

// Storage object สำหรับ key-value ที่ดึงจาก Sheet
let SHEET_DATA = {};
let INSURANCE_DETAIL_ROWS = [];

// Helper: ดึงค่าจาก SHEET_DATA โดยใช้ key (ถ้าไม่เจอใช้ค่า fallback)
function getVal(key, fallback = 0) {
  const v = SHEET_DATA[key];
  if (v === undefined || v === null || v === '') return fallback;

  const cleaned = String(v)
    .replace(/,/g, '')
    .replace(/฿/g, '')
    .replace(/บาท/g, '')
    .replace(/s/g, '')
    .trim();

  const num = Number(cleaned);
  return Number.isFinite(num) ? num : fallback;
}

// Helper: ดึงค่าเป็น string
function getStr(key, fallback = '—') {
  const v = SHEET_DATA[key];
  return (v === undefined || v === null || v === '') ? fallback : String(v);
}

// Async function: โหลดข้อมูลจาก Google Sheet
async function loadSheetData() {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    // Force UTF-8 decoding for Thai characters
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const csvText = decoder.decode(buffer);

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false  // เก็บเป็น string ก่อน แล้วแปลงตอน getVal
    });

    // Debug: log จำนวนแถว
    console.log('📊 Parsed rows:', parsed.data.length);
    if (parsed.data.length > 0) console.log('First row:', parsed.data[0]);

    // แปลง array เป็น object { key: value, ... }
    parsed.data.forEach(row => {
      // Handle both 'key' and possible BOM-prefixed key
      const keyName = row.key || row['\ufeffkey'] || row[Object.keys(row)[0]];
      const valueField = row.value !== undefined ? row.value : row[Object.keys(row)[1]];
      if (keyName) SHEET_DATA[keyName] = valueField;
    });

    console.log('✅ Loaded', Object.keys(SHEET_DATA).length, 'values from Sheet');
    console.log('Sample - salary_base:', SHEET_DATA.salary_base);
    return Object.keys(SHEET_DATA).length > 0;
  } catch (err) {
    console.warn('⚠️ Could not load from Sheet — using fallback values:', err.message);
    return false;
  }
}

function toNum(v) {
  if (v === undefined || v === null || v === '') return 0;
  const cleaned = String(v).replace(/,/g, '').replace(/฿/g, '').trim();
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}
function getCell(row, index) { return row && row[index] !== undefined ? row[index] : ''; }

async function loadInsuranceDetailRows() {
  try {
    const response = await fetch(INSURANCE_DETAIL_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const buffer = await response.arrayBuffer();
    const csvText = new TextDecoder('utf-8').decode(buffer);
    const parsed = Papa.parse(csvText, { header: false, skipEmptyLines: false, dynamicTyping: false });
    const rows = parsed.data || [];
    const dataRows = rows.slice(4).filter(row => toNum(getCell(row, 4)) > 0);
    const p1Max = Math.max(0, ...dataRows.map(r => toNum(getCell(r, 8))));
    const p2Max = Math.max(0, ...dataRows.map(r => toNum(getCell(r, 11))));
    const p3Max = Math.max(0, ...dataRows.map(r => toNum(getCell(r, 14))));

    INSURANCE_DETAIL_ROWS = dataRows.map((row, idx, arr) => {
      const year = toNum(getCell(row, 1));
      const age = toNum(getCell(row, 4));
      const p1 = toNum(getCell(row, 9));
      const p2 = toNum(getCell(row, 12));
      const p3 = toNum(getCell(row, 15));
      const p4 = toNum(getCell(row, 21));
      const p5 = toNum(getCell(row, 27));
      const p6 = toNum(getCell(row, 30));
      const total = p1 + p2 + p3 + p4 + p5 + p6;
      const notes = [];
      if (p1 && toNum(getCell(row, 8)) === p1Max) notes.push('#1 ครบสัญญา');
      if (p2 && toNum(getCell(row, 11)) === p2Max) notes.push('#2 ครบสัญญา');
      if (p3 && toNum(getCell(row, 14)) === p3Max) notes.push('#3 ครบสัญญา');
      if (p6 && (!arr[idx - 1] || !toNum(getCell(arr[idx - 1], 30)))) notes.push('เริ่มบำนาญ');
      if (age === getVal('insurance_retirement_start_age', 60)) notes.push('เริ่มช่วงเกษียณ');
      return { year, age, p1, p2, p3, p4, p5, p6, total, note: notes.join(' · ') };
    }).filter(r => r.total > 0 || r.note);
    console.log('✅ Loaded insurance timeline rows:', INSURANCE_DETAIL_ROWS.length);
    return true;
  } catch (err) {
    console.warn('⚠️ Could not load insurance detail sheet:', err.message);
    INSURANCE_DETAIL_ROWS = [];
    return false;
  }
}
