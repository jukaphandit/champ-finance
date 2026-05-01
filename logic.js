// ===========================================================
//  📊 DATA CONFIG
//  ════════════════════════════════════════════════════════════
//  📌 Source: Google Sheets "Summary_Life_Summary_Champ"
//      → Sheet "Dashboard_Data" (ดึง real-time จาก Sheet)
//
//  🔄 วิธีอัพเดท:
//     แค่อัพเดท Sheet "1.Saraly" ตามปกติ → Dashboard_Data
//     จะอัพเดทอัตโนมัติด้วย formula → Dashboard บนเว็บอัพเดทตาม
//
//  📅 อัพเดทล่าสุด: ดึงจาก Sheet
// ============================================================
const DATA = {
  // ── ข้อมูลส่วนตัว ─────────────────────
  profile: {
    name: "Jukaphan Paopasert (Champ)",
    age: 33,
    company: "Daikin Industries Ltd. / DIT (Daikin Technology Innovation Center)",
    position: "Product Management Lead — IoT Platform (MARUTTO)",
    title: "Assistant Manager",
    location: "Bangkok, Thailand",
    email: "jukaphan.dit@gmail.com",
    phone: "+66-84-767-3420",
    education: "Bachelor of Engineering (Electrical) · Kasetsart University",
    languages: "Thai (Native) · English (Professional) · Japanese (Professional)",
    updatedDate: "25 Apr 2026"
  },

  // ── Career Path / Promotion History ─────────────────────
  // ★ = Promotion milestone
  careerPath: [
    {
      year: "2015",
      role: "Engineer (EN)",
      department: "DIT R&D — PCB Hardware Development",
      desc: "เริ่มต้นที่ Daikin · พัฒนา PCB Hardware · Trained at Daikin Japan HQ · สร้างพื้นฐาน hardware design, EMC testing, system integration",
      promotion: false,
      icon: "🔧"
    },
    {
      year: "2018",
      role: "Senior Engineer (SE)",
      department: "DIT R&D — Remote Controller Development",
      desc: "★ ปรับเป็น SE · พัฒนา Remote Controller สำหรับเครื่องปรับอากาศ · Interface PCB Project (Australia)",
      promotion: true,
      icon: "📡"
    },
    {
      year: "2021",
      role: "Senior Engineer (SE) → SU",
      department: "DIT R&D — Central Controller Development",
      desc: "พัฒนา Central Controller · เริ่ม IoT Product & PoC · Acted as UI/UX lead for IoT web and mobile applications",
      promotion: false,
      icon: "🌐"
    },
    {
      year: "2023",
      role: "Supervisor (SU)",
      department: "DIT — R&D IoT Product Planning & Develop",
      desc: "★ ปรับเป็น SU · เริ่มงาน Product Management · MARUTTO IoT Platform · ทำงานกับ DHOS regional sales hub · AI Energy Control training",
      promotion: true,
      icon: "🚀"
    },
    {
      year: "2026",
      role: "Assistant Manager (AM)",
      department: "DIT — Product Management Lead | IoT Platform & Business Solutions",
      desc: "★★ ปรับเป็น AM · Product Strategy & Roadmap Ownership · Go-to-Market across Asia Oceania · Cross-functional leadership R&D-Sales-Customer",
      promotion: true,
      icon: "⭐",
      current: true
    }
  ],

  // ── Core Expertise ─────────────────────
  expertise: [
    "Product Strategy & Roadmap Ownership",
    "IoT Platform & Subscription Business Model",
    "Go-to-Market & Sales Enablement",
    "PoC & Market Validation (B2B / Enterprise)",
    "Cross-functional Leadership (R&D – Sales – Customer)",
    "Data-driven Product Decisions & Sales Dashboards"
  ],

  // ── Daikin Provident Fund + Group Insurance ─────────────────────
  // 📌 ตัวเลขมี 2 มุมมอง:
  //   1. Market Value (Cash Sum R) = ฿805,630 → ใช้ใน Net Worth
  //   2. Contribution Yearly (1.Saraly AZ) = ฿1,431,160/ปี → สำหรับวางแผนภาษี
  daikinBenefits: {
    totalBalance: 805630,                       // PVD TISCO Mark-to-market (Cash Sum R)
    yearlyContribution: 191310,                 // ออมทรัพย์รวมต่อปี (1.Saraly AZ)
    pvdSelf: {
      label: "ออมทรัพย์ (ส่วนที่เราฝากเอง)",
      monthlyContribution: 9942,                // 15% ของเงินเดือน
      yearlyContribution: 114129,               // จาก Sheet
      pctOfSalaryRange: "3% - 15%",
      currentPct: 15,
      note: "หักจากเงินเดือนทุกเดือน · % เพิ่มขึ้นตามตำแหน่ง · ลดหย่อนภาษีได้"
    },
    pvdCompany: {
      label: "ไดกิ้นสมทบ (Company Match)",
      monthlyContribution: 6628,
      yearlyContribution: 77182,                // จาก Sheet
      pctOfSalaryRange: "3% - 10%",
      currentPct: 10,
      note: "บริษัทสมทบให้ฟรี · ทำงาน 11 ปี = Vested 100% ✓"
    },
    groupInsurance: {
      opd: 35000,
      ipd: "ไม่ทราบวงเงิน",
      lifeInsurance: "ไม่ทราบวงเงิน",
      note: "ครอบคลุมพนักงาน · ออกจากงาน = สิ้นสุด · เช็ครายละเอียดที่ HR"
    }
  },

  // ── โบนัสจริงประจำปี (จาก Sheet) ─────────────────────
  // ⚠️ "Bonus ฿14,000" ในตาราง 1.Saraly แต่ละเดือน = เงินช่วยค่าบ้าน (ไม่ใช่โบนัส)
  // โบนัสจริงๆ ออกในเดือน ธ.ค. เท่านั้น
  // ── โบนัสจริงประจำปี (เฉพาะเดือน ธันวาคม) ─────────────────────
  // 📌 ปี 2025 และก่อนหน้า = Actual (ได้รับจริงแล้ว)
  // 📌 ปี 2026, 2027 = Forecast (คาดการณ์จากผลงาน + ตำแหน่ง)
  // 📌 จะอัพเดทเป็นค่าจริงเมื่อรับโบนัส ธ.ค. ของแต่ละปี (ผ่าน Sheet bonus_dec_2026)
  bonusHistory: [
    { year: 2022, dec: 220000, role: "SE — IoT Product", actual: true },
    { year: 2023, dec: 250000, role: "SE → SU", actual: true },
    { year: 2024, dec: 444627, role: "SU", actual: true },
    { year: 2025, dec: 553671, role: "SU / PM Lead", actual: true },
    { year: 2026, dec: 417680, role: "★ AM (คาดการณ์)", current: true, forecast: true },
    { year: 2027, dec: 480000, role: "AM (คาดการณ์)", forecast: true }
  ],

  // ── รายรับรายเดือน (THB) ─────────────────────
  // 📌 จาก Sheet "1.Saraly" Apr 2026 onwards (หลังเป็น AM):
  // - เงินเดือน Base: ฿65,580 + เบี้ยอายุงาน ฿700 + เบี้ยขยัน ฿1,500
  // - เงินช่วยค่าบ้าน ("Bonus" ในตาราง): ฿14,000 ⚠️ ไม่ใช่โบนัสจริง!
  // - ค่ารถเดินทาง (แทน OT เพราะ AM ไม่มี OT): ฿9,300
  // = Gross ฿91,080
  // - หัก: ประกันสังคม ฿875 + ออมทรัพย์ฝากเอง ฿9,942 + ภาษี ~฿4,385 = ฿15,202
  // = Net เข้าบัญชี ~฿75,878
  // ✨ Daikin PVD สมทบ ฿6,628 = บริษัทเพิ่มให้ฟรี (ไม่หักจากเงินเดือน)
  income: [
    { name: "เงินเดือน Daikin (Net หลังหัก)",  amount: 75878, note: "Salary + เงินช่วยค่าบ้าน + ค่ารถ - ประกันสังคม - ออมเอง 15% - ภาษี" },
    { name: "Keen Condo - ส่วนของ Champ",     amount: 10343, note: "Champ Get · จาก Net ฿35.3K/เดือน หลังหักทุกค่าใช้จ่าย" },
    { name: "รายได้แผงค้าร้านกาแฟ",            amount: 12600, note: "มรดก · ใช้จ่ายเบี้ยประกัน" },
    { name: "ค่าเช่าที่ดินนครชัยศรี",          amount: 2500,  note: "เข้าทุกวันที่ 5" },
    { name: "ผลตอบแทนพอร์ต (เฉลี่ย)",        amount: 2500,  note: "ปันผล + Capital gain (ประมาณ)" }
  ],

  // ── รายละเอียดเงินเดือน Daikin (Apr 2026) ─────────────────────
  // 📌 หักจาก Champ จริงๆ = ประกันสังคม + ออมทรัพย์ฝากเอง + ภาษี
  // ⚠️ Daikin PVD สมทบ = บริษัทใส่เพิ่มให้ฟรี (ไม่หักจากเงินเดือน Champ)
  salaryBreakdown: {
    base: 65580,
    seniority: 700,                    // เบี้ยอายุงาน
    diligence: 1500,                   // เบี้ยขยัน (ถ้าครบเดือน)
    housingAllowance: 14000,           // เงินช่วยค่าบ้าน (เรียกว่า Bonus ในตาราง)
    carAllowance: 9300,                // ค่ารถ (แทน OT หลังเป็น AM)
    deductions: {
      socialSecurity: 875,
      pvdSelf: 9942,                   // ออมทรัพย์ฝากเอง 15%
      tax: 4385                        // ประมาณ
    },
    companyAddOn: {
      pvdMatch: 6628                   // ✨ บริษัทสมทบเพิ่ม (ไม่หักจาก Champ)
    },
    grossSum: 91080,
    netReceived: 75878,                // หลังหักจริงๆ
    note: "หลังเป็น AM (Apr 2026) ไม่ได้ OT แล้ว · ได้ค่ารถ ฿9,300/เดือนแทน"
  },

  // ── เงินที่ผ่านมือแต่ไม่ใช่รายได้ของ Champ (Pass-through) ─────
  // จาก Keen Condo = ฿49,963 - ค่าใช้จ่าย ฿14,620 = Net ฿35,343
  // แบ่งเป็น: Yuko ฿12,000 + Keep Gold ยูโกะ ฿10,000 + New Home ฿3,000 + Champ ฿10,343
  keenBreakdown: {
    grossRent: 49963,
    expenses: 14620,
    netToShare: 35343,
    yukoShare: 12000,
    yukoGold: 10000,
    newHomeShared: 3000,
    champShare: 10343
  },

  // ── รายจ่ายรายเดือน (THB) ─────────────────────
  expenses: [
    { name: "ผ่อนบ้าน Nirvana KKP (ขั้นต่ำ)", amount: 26000, note: "ขั้นต่ำ · 28 ปีเหลือ" },
    { name: "โป๊ะเงินต้นบ้าน (Champ Get จาก Keen)", amount: 10343, note: "ลดภาระดอกเบี้ย · ใช้ทั้งก้อน" },
    { name: "ออม + ลงทุน (หุ้น)",       amount: 15000, note: "บัญชีกรุงเทพ → BLS" },
    { name: "เบี้ยประกัน (รวม 7 ฉบับ)",   amount: 15573, note: "จ่ายจากรายได้แผงค้า" },
    { name: "Daily Food + House",       amount: 8300,  note: "อาหาร + ของใช้ในบ้าน" },
    { name: "ส่วนกลาง Nirvana + น้ำ + ไฟ + เน็ต", amount: 6000,  note: "ส่วนกลาง ฿2.5K + น้ำ-ไฟ ฿3K + เน็ต ฿0.5K" },
    { name: "รถ + น้ำมัน + ทางด่วน",     amount: 4250,  note: "Mazda 2 บำรุงรักษา" },
    { name: "อื่นๆ (เรียน + บริจาค + ดูแลตัว)", amount: 9130,  note: "Education ฿2K + Donate ฿2K + อื่นๆ" }
  ],

  // ── สินทรัพย์ (THB) ─────────────────────
  // 📌 ทรัพย์สินอสังหาทั้งหมดเป็นชื่อ Champ ตามกฎหมาย (จะแบ่งตามพินัยกรรมในอนาคต)
  // 📌 มูลค่า liquid assets ดึงจาก Sheet "Cash Sum" (mark-to-market อัพเดททุกเดือน)
  // 📌 PVD TISCO แยกออกจาก "กองทุนรวม" — เป็น Retirement asset (ผูกกับการทำงาน)
  assets: [
    { name: "บ้าน Nirvana Element Bangna", amount: 11000000, type: "real_estate", note: "ในชื่อ Champ (กฎหมาย) · ยูโกะร่วมลงทุน · พินัยกรรมระบุยูโกะ" },
    { name: "Keen Condo Sriracha",       amount: 6700000, type: "real_estate", note: "ในชื่อ Champ (กฎหมาย) · ยูโกะร่วมลงทุน · พินัยกรรมระบุยูโกะ · 81.84 ตร.ม." },
    { name: "ทองคำ",                  amount: 1110672, type: "hard_asset", note: "แท่ง ฿93K + แอป ฿1.02M (ส่วนหนึ่งของยูโกะ) · จาก Cash Sum" },
    { name: "PVD TISCO (Daikin)",       amount: 805630,  type: "retirement", note: "Mark-to-market · ผูกกับการทำงาน · ออกก่อนกำหนดอาจได้คืนไม่เต็ม" },
    { name: "เงินสด (รวม)",             amount: 674008,  type: "cash", note: "หลายบัญชี SCB · จัดสรรตามวัตถุประสงค์ · จาก Cash Sum" },
    { name: "กองทุนรวม (LTF + ESG + B-INNOTECH)", amount: 336565, type: "investment", note: "Liquid investment · ไม่รวม PVD · สามารถขายได้" },
    { name: "รถ Mazda 2 Skyactiv",     amount: 350000,  type: "hard_asset", note: "ปี 2017" },
    { name: "มูลค่าประกันออมทรัพย์",      amount: 281321,  type: "insurance", note: "Surrender value 3 กรมธรรม์" },
    { name: "หุ้นไทย",                 amount: 227847,  type: "investment", note: "TISCO + CPN + อื่นๆ · จาก Cash Sum" },
    { name: "Bitcoin / Crypto",        amount: 54876,   type: "investment", note: "เริ่ม Dec 2025 · จาก Cash Sum" }
  ],

  // ── หนี้สิน (THB) ─────────────────────
  liabilities: [
    { name: "สินเชื่อบ้าน KKP",
      amount: 5593405,
      note: "ดอก 2.10% → 3.10% → ลอยตัว · ปลอดค่าปรับรีไฟแนนซ์" }
  ],

  // ── การเติบโตเงินเดือน (Daikin) + Career Milestones ─────────────────────
  salaryHistory: [
    { date: "Jun 2015", salary: 18860, net: 19010, milestone: "เริ่มงาน · Electrical Engineer (Intern)" },
    { date: "Oct 2015", salary: 20250, net: 23054, milestone: "เริ่มงานเต็มเวลา" },
    { date: "Oct 2016", salary: 21450, net: 29694, milestone: "Engineer Year 1" },
    { date: "Oct 2017", salary: 22400, net: 28177, milestone: "Engineer Year 2" },
    { date: "Apr 2018", salary: 23902, net: 30460, milestone: "★ ปรับ SE — Remote Controller Development" },
    { date: "2020", salary: 28000, net: 36000, milestone: "Senior Eng. — Interface PCB Project" },
    { date: "2021", salary: 32000, net: 42000, milestone: "SE — IoT Product & PoC" },
    { date: "2023", salary: 42000, net: 54000, milestone: "★ ปรับ SU (Supervisor) — IoT Product Planning" },
    { date: "Apr 2024", salary: 49510, net: 62000, milestone: "Year 9" },
    { date: "Apr 2025", salary: 54080, net: 75000, milestone: "Supervisor / PM Lead" },
    { date: "Apr 2026", salary: 65580, net: 75878, milestone: "★ ปรับ AM (Assistant Manager) — Product Management Lead" },
    { date: "Jun 2027", salary: 70826, net: 95000, milestone: "Year 12 (คาดการณ์)" }
  ],

  // ── Net Worth ตาม timeline ─────────────────────
  netWorthHistory: [
    { date: "Aug 2022", value: 1326328 },
    { date: "Jan 2023", value: 1826211 },
    { date: "Aug 2023", value: 2241290 },
    { date: "Jan 2024", value: 2429975 },
    { date: "Aug 2024", value: 2802394 },
    { date: "Jan 2025", value: 2384870 },
    { date: "Aug 2025", value: 2444273 },
    { date: "Jan 2026", value: 2962324 },
    { date: "Apr 2026", value: 3154722 }
  ],

  // ── ประกันชีวิต ─────────────────────
  insurance: [
    { name: "Unit Link (Investment)", premium: 0,     death: 0,       critical: 0,       med: 0,       status: "surrendered", priority: "เวนคืนแล้ว" },
    { name: "PA Package",             premium: 2500,  death: 500000,  critical: 0,       med: 0,       status: "active", priority: "เก็บ" },
    { name: "ออมทรัพย์ 15/25",         premium: 15200, death: 200000,  critical: 0,       med: 0,       status: "active", priority: "ทบทวน" },
    { name: "Plush Gold 20 Pay life",  premium: 10298, death: 400000,  critical: 0,       med: 730000,  status: "active", priority: "เก็บ" },
    { name: "★ Plush Gold 20 Pay life 2", premium: 22828, death: 100000, critical: 2000000, med: 5000000, status: "active", priority: "เก็บ ⭐" },
    { name: "สะสมทรัพย์ 21/42",        premium: 40064, death: 360000,  critical: 100000,  med: 0,       status: "active", priority: "ทบทวน" },
    { name: "สะสมทรัพย์ 30 ชำระ 25 ปี",  premium: 32365, death: 350000,  critical: 0,       med: 730000,  status: "active", priority: "ทบทวน" },
    { name: "ประกันบำนาญ (จาก Unit Link)", premium: 63625, death: 0,       critical: 0,       med: 0,       status: "new",    priority: "ใหม่" }
  ],

  // ── ประกันชีวิต - รายละเอียด (สำหรับ Retirement page) ─────────────────────
  // 📌 จากข้อมูล Sheet "3. ประกัน รายละเอียด" + screenshot ที่ Champ ส่ง
  // 📌 อายุ Champ ปัจจุบัน 33 (เกิด Nov 1992)
  insurancePolicies: [
    {
      no: 1,
      name: "สะสมทรัพย์ 25 ชำระ 15 ปี",
      code: "T177138876",
      sumInsured: 200000,
      premium: 15200,
      paid: 14,
      total: 15,
      yearsLeft: 1,
      maturityYear: 2036,
      maturityAge: 44,
      maturityAmount: 250000,    // ประมาณการ (เงินคืนครบสัญญา)
      type: "endowment",
      status: "ใกล้ครบ ✓"
    },
    {
      no: 2,
      name: "สะสมทรัพย์ 30 ชำระ 15 ปี",
      code: "T209042555",
      sumInsured: 350000,
      premium: 32365,
      paid: 9,
      total: 15,
      yearsLeft: 6,
      maturityYear: 2046,
      maturityAge: 54,
      maturityAmount: 450000,
      type: "endowment",
      status: "กำลังส่ง"
    },
    {
      no: 3,
      name: "สะสมทรัพย์ 42 ชำระ 21 ปี",
      code: "T206478834",
      sumInsured: 300000,
      premium: 40070,
      paid: 9,
      total: 21,
      yearsLeft: 12,
      maturityYear: 2058,
      maturityAge: 66,
      maturityAmount: 400000,
      type: "endowment",
      status: "กำลังส่ง"
    },
    {
      no: 4,
      name: "ตลอดชีพ ชำระเบี้ย 20 ปี",
      code: "T204409300",
      sumInsured: 400000,
      premium: 10298,
      paid: 10,
      total: 20,
      yearsLeft: 10,
      maturityYear: null,
      maturityAge: null,
      maturityAmount: 400000,    // เงินทุนชีวิต (ตลอดชีพ)
      type: "wholeLife",
      status: "กำลังส่ง"
    },
    {
      no: 5,
      name: "ตลอดชีพ ชำระเบี้ย 20 ปี (Vai)",
      code: "T223514632",
      sumInsured: 100000,
      premium: 23640,
      paid: 5,
      total: 20,
      yearsLeft: 15,
      maturityYear: null,
      maturityAge: null,
      maturityAmount: 100000,
      type: "wholeLife",
      status: "เพิ่งเริ่ม"
    },
    {
      no: 6,
      name: "ปานคญ (บำนาญ)",
      code: "T237355683",
      sumInsured: 0,
      premium: 51840,
      paid: 3,
      total: 20,
      yearsLeft: 17,
      maturityYear: 2042,
      maturityAge: 49,
      pensionStartAge: 55,
      pensionAmountYearly: 50000,  // คาดการณ์ ปีละ ประมาณ
      maturityAmount: 1000000,     // 105% ของเบี้ยที่ฝาก ~ 1M+
      type: "annuity",
      status: "เพิ่งเริ่ม"
    }
  ],

  // ── หนี้บ้าน Nirvana KKP ─────────────────────
  loan: {
    bank: "KKP (เกียรตินาคินภัทร)",
    originalAmount: 6000000,
    currentBalance: 5593405,
    startDate: "Sep 2024",
    termYears: 30,
    monthlyMin: 26000,
    monthlyExtra: 10000,         // โป๊ะจาก Keen
    monthlyTotal: 36000,
    interestRates: [
      { period: "ปี 1-3 (Sep 2024 - Sep 2027)", rate: "2.10% → 3.10%", note: "ดอกโปรโมชั่น" },
      { period: "ปี 4+ (หลัง Sep 2027)",         rate: "MRR-X (~5.5%)",   note: "ลอยตัว · ควรรีไฟแนนซ์" }
    ],
    refinancePlan: {
      date: "Sep 2027",
      noPenalty: true,
      targetRate: "2.5-3.0%",
      note: "ปลอดค่าปรับ · ควรเปรียบเทียบ 3-5 ธนาคาร"
    },
    // คำนวณตาม scenario
    scenarios: [
      { name: "ขั้นต่ำ ฿26K (ดอกเฉลี่ย 5.5%)",        monthly: 26000, years: 50,   totalInterest: 14400000 },
      { name: "+โป๊ะ ฿36K (ดอกเฉลี่ย 5.5%)",         monthly: 36000, years: 22.8, totalInterest: 4200000 },
      { name: "+โป๊ะ ฿36K + รีไฟแนนซ์ทุก 3 ปี (3.5%)", monthly: 36000, years: 17.3, totalInterest: 1870000 },
      { name: "Aggressive ฿50K + รีไฟแนนซ์",         monthly: 50000, years: 11.3, totalInterest: 1190000 }
    ]
  },

  // ── เป้าหมาย ─────────────────────
  goals: [
    { name: "Investment Portfolio (สร้าง Yield 6.46%)", current: 2590000,  target: 6500000, format: "money" },
    { name: "ปิดหนี้บ้าน Nirvana",                      current: 406595,   target: 6000000, format: "money_inverse" },
    { name: "Emergency Fund (6 เดือน)",                  current: 674000,   target: 580000,  format: "money" },
    { name: "Net Worth (อายุ 40)",                        current: 12900000, target: 20000000, format: "money" }
  ],

  // ── Action Items ─────────────────────
  actions: [
    {
      level: "danger",
      title: "Priority 1 — ทำ MRTA สำหรับบ้าน (เร่งด่วนหลังเวนคืน Unit Link)",
      body: "หนี้บ้าน ฿5.59M แต่คุ้มชีวิตเหลือเพียง ฿1.91M = ส่วนต่าง ฿3.68M ที่ยูโกะอาจต้องรับภาระ → โทร KKP ขอ quote MRTA วงเงิน ฿5M ระยะ 28 ปี + พิจารณา Term Life เสริมราคาถูก"
    },
    {
      level: "warning",
      title: "Priority 2 — ทบทวนประกันออมทรัพย์ 3 ฉบับ",
      body: "ใช้เบี้ย ฿87K/ปี (47% ของทั้งหมด) แต่ผลตอบแทนเฉลี่ย 1.5-2.5% → ขอ Surrender Value + IRR แล้วเทียบกับลงทุนเอง"
    },
    {
      level: "warning",
      title: "Priority 3 — กระจายความเสี่ยงพอร์ต",
      body: "ทอง 35% + กองทุนไทย 36% + Cash 21% · ขาด Global Equity → พิจารณาเพิ่ม VWRA/ACWI 15-20%"
    },
    {
      level: "success",
      title: "Priority 4 — เตรียมเอกสารแต่งงาน 2 ประเทศ",
      body: "แต่งปี 2027 + จดทะเบียน TH+JP → เริ่มเตรียมเอกสาร Q3 2026 (สถานทูตญี่ปุ่น + City Hall)"
    },
    {
      level: "success",
      title: "Priority 5 — Emergency Fund เพียงพอแล้ว",
      body: "เงินสด ฿674K ≈ 7 เดือนของรายจ่าย → ส่วนเกินทยอยย้ายไปลงทุนระยะยาวได้"
    }
  ]
};

// ============================================================
// 🔢 HELPER FUNCTIONS
// ============================================================
const fmt = {
  baht: n => {
    const num = Number(n);
    if (!Number.isFinite(num)) return '฿0';
    return '฿' + Math.round(num).toLocaleString();
  },
  bahtShort: n => {
    const num = Number(n);
    if (!Number.isFinite(num)) return '฿0';
    if (num >= 1000000) return '฿' + (num/1000000).toFixed(2) + 'M';
    if (num >= 1000) return '฿' + (num/1000).toFixed(0) + 'K';
    return '฿' + Math.round(num).toLocaleString();
  },
  pct: n => {
    const num = Number(n);
    if (!Number.isFinite(num)) return '0.0%';
    return num.toFixed(1) + '%';
  }
};

const sum = arr => arr.reduce((a,b) => {
  const n = Number(b);
  return a + (Number.isFinite(n) ? n : 0);
}, 0);

// ============================================================
// 🚀 RENDER + INIT
// ============================================================
// ============================================================
// 🚀 RENDER FUNCTIONS — Render dashboard sections from DATA
// ============================================================

// Async init: โหลด Sheet ก่อน แล้วค่อย render Dashboard
// เรียกจาก index.html bootstrap()
async function initDashboard() {
  // 1. โหลดข้อมูลจาก Google Sheet
  const loaded = await loadSheetData();

  // 2. ถ้าโหลดสำเร็จ → override ค่าใน DATA ด้วยข้อมูลสด
  if (loaded) {
    // Profile
    if (SHEET_DATA.profile_name)     DATA.profile.name = getStr('profile_name');
    if (SHEET_DATA.profile_age)      DATA.profile.age = getVal('profile_age');
    if (SHEET_DATA.profile_position) DATA.profile.position = getStr('profile_position');
    if (SHEET_DATA.profile_company)  DATA.profile.company = getStr('profile_company');
    if (SHEET_DATA.updated_date)     DATA.profile.updatedDate = getStr('updated_date');

    // Salary breakdown
    DATA.salaryBreakdown.base             = getVal('salary_base', DATA.salaryBreakdown.base);
    DATA.salaryBreakdown.seniority        = getVal('salary_seniority', DATA.salaryBreakdown.seniority);
    DATA.salaryBreakdown.diligence        = getVal('salary_diligence', DATA.salaryBreakdown.diligence);
    DATA.salaryBreakdown.housingAllowance = getVal('salary_housing', DATA.salaryBreakdown.housingAllowance);
    DATA.salaryBreakdown.carAllowance     = getVal('salary_car', DATA.salaryBreakdown.carAllowance);
    DATA.salaryBreakdown.grossSum         = getVal('salary_gross', DATA.salaryBreakdown.grossSum);
    DATA.salaryBreakdown.netReceived      = getVal('salary_net', DATA.salaryBreakdown.netReceived);
    DATA.salaryBreakdown.deductions.socialSecurity = getVal('salary_deduct_ssf', DATA.salaryBreakdown.deductions.socialSecurity);
    DATA.salaryBreakdown.deductions.pvdSelf        = getVal('salary_deduct_pvd', DATA.salaryBreakdown.deductions.pvdSelf);
    DATA.salaryBreakdown.deductions.tax            = getVal('salary_deduct_tax', DATA.salaryBreakdown.deductions.tax);
    DATA.salaryBreakdown.companyAddOn.pvdMatch     = getVal('pvd_company_match', DATA.salaryBreakdown.companyAddOn.pvdMatch);

    // อัพเดท salary history Apr 2026 (entry ที่ 11)
    const aprIdx = DATA.salaryHistory.findIndex(s => s.date === 'Apr 2026');
    if (aprIdx >= 0) {
      DATA.salaryHistory[aprIdx].salary = getVal('salary_base', DATA.salaryHistory[aprIdx].salary);
      DATA.salaryHistory[aprIdx].net = getVal('salary_net', DATA.salaryHistory[aprIdx].net);
    }

    // อัพเดท income (Net เงินเดือน)
    const salaryIncome = DATA.income.find(i => i.name.includes('Daikin'));
    if (salaryIncome) salaryIncome.amount = getVal('salary_net', salaryIncome.amount);

    // Income อื่นๆ
    const keenIncome = DATA.income.find(i => i.name.includes('Keen'));
    if (keenIncome) keenIncome.amount = getVal('income_keen_champ', keenIncome.amount);

    // Daikin Benefits — totalBalance ใช้ PVD TISCO (mark-to-market) จาก Cash Sum
    if (DATA.daikinBenefits) {
      DATA.daikinBenefits.totalBalance              = getVal('asset_pvd_tisco', DATA.daikinBenefits.totalBalance);
      DATA.daikinBenefits.pvdSelf.monthlyContribution    = getVal('salary_deduct_pvd', DATA.daikinBenefits.pvdSelf.monthlyContribution);
      DATA.daikinBenefits.pvdSelf.yearlyContribution     = getVal('pvd_self_yearly', DATA.daikinBenefits.pvdSelf.yearlyContribution);
      DATA.daikinBenefits.pvdCompany.monthlyContribution = getVal('pvd_company_match', DATA.daikinBenefits.pvdCompany.monthlyContribution);
      DATA.daikinBenefits.pvdCompany.yearlyContribution  = getVal('pvd_company_yearly', DATA.daikinBenefits.pvdCompany.yearlyContribution);
    }

    // Assets — ดึงจาก Cash Sum (mark-to-market)
    const assetMap = {
      'asset_nirvana': 'Nirvana',
      'asset_keen': 'Keen Condo',
      'asset_pvd_tisco': 'PVD TISCO',
      'asset_funds_only': 'กองทุนรวม',
      'asset_gold': 'ทองคำ',
      'asset_cash': 'เงินสด (รวม)',
      'asset_insurance': 'มูลค่าประกัน',
      'asset_car': 'Mazda',
      'asset_stocks': 'หุ้นไทย',
      'asset_crypto': 'Bitcoin'
    };
    for (const [key, search] of Object.entries(assetMap)) {
      const item = DATA.assets.find(a => a.name.includes(search));
      if (item) item.amount = getVal(key, item.amount);
    }

    // Liabilities
    DATA.liabilities[0].amount = getVal('liability_loan_kkp', DATA.liabilities[0].amount);
    if (DATA.loan) {
      DATA.loan.currentBalance = getVal('liability_loan_kkp', DATA.loan.currentBalance);
      DATA.loan.originalAmount = getVal('loan_original', DATA.loan.originalAmount);
      DATA.loan.monthlyTotal   = getVal('loan_monthly_total', DATA.loan.monthlyTotal);
    }

    // Bonus
    const bonus2026 = DATA.bonusHistory.find(b => b.year === 2026);
    if (bonus2026) bonus2026.dec = getVal('bonus_dec_2026', bonus2026.dec);

    // แสดง indicator ว่าโหลดจาก Sheet สำเร็จ
    showSyncStatus(true);
  } else {
    showSyncStatus(false);
  }

  // 3. โหลด timeline ประกันแบบรายปี แล้วค่อย render Dashboard ทั้งหมด
  await loadInsuranceDetailRows();
  renderDashboard();
  initLanguageSwitcher();
}

// แสดง status การ sync
function showSyncStatus(success) {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position: fixed; top: 12px; right: 12px; z-index: 9999;
    padding: 8px 14px; border-radius: 6px; font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    background: ${success ? '#16a34a' : '#d97706'}; color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: opacity 0.5s; opacity: 0.95;
  `;
  banner.textContent = success ? '✓ Synced from Sheet' : '⚠ Using offline data';
  document.body.appendChild(banner);
  setTimeout(() => { banner.style.opacity = '0'; setTimeout(() => banner.remove(), 500); }, 3000);
}

// ฟังก์ชัน render ทั้งหมด (เดิมที่อยู่ด้านล่าง ย้ายมาห่อใน function นี้)
function renderDashboard() {

// ── Init Header ──
document.getElementById('userName').textContent = DATA.profile.name;
document.getElementById('userAge').textContent = DATA.profile.age;
document.getElementById('updatedDate').textContent = DATA.profile.updatedDate;

// ── Calculations ──
const totalIncome      = sum(DATA.income.map(x => x.amount));
const totalExpense     = sum(DATA.expenses.map(x => x.amount));
const cashFlow         = totalIncome - totalExpense;
const totalAssets      = sum(DATA.assets.map(x => x.amount));
const totalLiabilities = sum(DATA.liabilities.map(x => x.amount));
const netWorth         = totalAssets - totalLiabilities;
const totalPremium     = sum(DATA.insurance.filter(x => x.status !== 'paidup').map(x => x.premium));
const totalDeath       = sum(DATA.insurance.map(x => x.death));
const totalCritical    = sum(DATA.insurance.map(x => x.critical));
const totalMed         = sum(DATA.insurance.map(x => x.med));

// ── KPI helper ──
function renderKpis(containerId, kpis) {
  document.getElementById(containerId).innerHTML = kpis.map(k => `
    <div class="kpi ${k.color || 'primary'}">
      <div class="label">${k.label}</div>
      <div class="value">${k.value}</div>
      <div class="sub">${k.sub || ''}</div>
    </div>
  `).join('');
}

// ── List helper ──
function renderList(containerId, items, type) {
  // Calculate total for percentage
  const total = items.reduce((s, item) => s + item.amount, 0);

  document.getElementById(containerId).innerHTML = items.map((item, idx) => {
    const pct = total > 0 ? (item.amount / total * 100) : 0;
    const barColor = type === 'expense' ? 'var(--red)' : 'var(--green)';
    const sign = type === 'expense' ? '−' : (type === 'income' ? '+' : '');

    return `
      <div class="item" style="position: relative;">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
          <div style="
            width: 28px; height: 28px; border-radius: 50%;
            background: ${type === 'expense' ? '#fef2f2' : '#f0fdf4'};
            color: ${barColor}; font-size: 12px; font-weight: 700;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          ">${idx + 1}</div>
          <div style="flex: 1;">
            <div class="name">${item.name}</div>
            <div class="note">${item.note || ''}</div>
            <div style="margin-top: 6px; height: 4px; background: var(--bg); border-radius: 2px; overflow: hidden;">
              <div style="height: 100%; width: ${pct.toFixed(1)}%; background: ${barColor}; border-radius: 2px;"></div>
            </div>
          </div>
        </div>
        <div style="text-align: right; min-width: 90px; margin-left: 12px;">
          <div class="amount ${type || ''}" style="margin-bottom: 2px;">${sign}${fmt.baht(item.amount)}</div>
          <div style="font-size: 11px; color: var(--text-mute); font-family: 'JetBrains Mono', monospace;">
            ${pct.toFixed(1)}%
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── TAB 1: Overview ──
// คำนวณ Wealth Building components (ไม่รวม Cash เหลือ - แยกออกเป็น KPI ต่างหาก)
const cashFlowOnly = cashFlow;  // เงินเหลือสดในกระเป๋า (ใช้ส่วนตัว/ปาร์ตี้/ตีกอล์ฟ)
const stockSaving = 15000;       // ออมหุ้น
const debtPaydown = 10343;       // โป๊ะหนี้
const pvdSelfMonth = 9942;       // ออมทรัพย์ฝากเอง
const pvdCompanyMonth = 6628;    // ไดกิ้นสมทบ
// ⚠️ Wealth Building = เงินสะสมระยะยาว (ไม่นับ cash เหลือ)
const totalWealthMonthly = stockSaving + debtPaydown + pvdSelfMonth + pvdCompanyMonth;

// โบนัสเฉลี่ยต่อเดือน
const annualBonus = DATA.bonusHistory.find(b => b.current).dec;
const bonusMonthlyAvg = annualBonus / 12;
const totalWealthWithBonus = totalWealthMonthly + bonusMonthlyAvg;
const cashFlowWithBonus = cashFlowOnly + bonusMonthlyAvg;

renderKpis('overviewKpis', [
  { label: 'NET WORTH', value: fmt.bahtShort(netWorth), color: 'primary', sub: 'Assets − Liabilities' },
  { label: 'WEALTH BUILDING / เดือน', value: fmt.bahtShort(totalWealthMonthly), color: 'green', sub: `รวมโบนัสเฉลี่ย: ${fmt.bahtShort(totalWealthWithBonus)}/เดือน` },
  { label: 'CASH เหลือใช้สด / เดือน', value: '+' + fmt.bahtShort(cashFlowOnly), color: 'amber', sub: `รวมโบนัสเฉลี่ย: ${fmt.bahtShort(cashFlowWithBonus)}/เดือน · ใช้ส่วนตัว/ฉุกเฉิน` },
  { label: 'หนี้สินคงเหลือ', value: fmt.bahtShort(totalLiabilities), color: 'red', sub: 'บ้าน Nirvana KKP' }
]);

// Wealth Building components rendering
document.getElementById('wbCashFlow').textContent = '+' + fmt.baht(cashFlowOnly) + ' / เดือน';
document.getElementById('wbStock').textContent = '+' + fmt.baht(stockSaving) + ' / เดือน';
document.getElementById('wbDebt').textContent = '+' + fmt.baht(debtPaydown) + ' / เดือน';
document.getElementById('wbPvdSelf').textContent = '+' + fmt.baht(pvdSelfMonth) + ' / เดือน';
document.getElementById('wbPvdCompany').textContent = '+' + fmt.baht(pvdCompanyMonth) + ' / เดือน';
document.getElementById('wbTotal').textContent = '+' + fmt.baht(totalWealthMonthly) + ' / เดือน';

document.getElementById('wbBonusMonthly').textContent = '+' + fmt.baht(Math.round(bonusMonthlyAvg)) + ' / เดือน';
document.getElementById('wbTotalWithBonus').textContent = '+' + fmt.baht(Math.round(totalWealthWithBonus)) + ' / เดือน';

document.getElementById('wealthAnnualSummary').innerHTML = `
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <div style="font-size: 12px; color: var(--text-mute); margin-bottom: 4px;">ไม่รวมโบนัส (Conservative)</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; color: var(--green);">
        ฿${(totalWealthMonthly * 12).toLocaleString()}/ปี
      </div>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--text-mute); margin-bottom: 4px;">รวมโบนัส (Realistic)</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; color: var(--green);">
        ฿${(totalWealthMonthly * 12 + annualBonus).toLocaleString()}/ปี
      </div>
    </div>
  </div>
  <div style="font-size: 12px; margin-top: 12px; color: var(--text-mute);">
    💡 นี่คือเงินที่กำลังสะสมเป็น Wealth ของคุณทุกเดือน — บางส่วนเป็นเงินสด · บางส่วนเป็นการลดหนี้ · บางส่วนเป็น Asset ระยะยาว
  </div>
`;

// Goals progress
document.getElementById('goalsList').innerHTML = DATA.goals.map(g => {
  let pct, displayPct, color;
  if (g.format === 'money_inverse') {
    pct = (g.current / g.target) * 100;
    displayPct = `จ่ายไป ${fmt.pct(pct)}`;
    color = 'red';
  } else {
    pct = Math.min((g.current / g.target) * 100, 100);
    displayPct = fmt.pct((g.current / g.target) * 100);
    color = pct >= 100 ? 'green' : pct >= 50 ? '' : 'amber';
  }
  return `
    <div class="progress">
      <div class="info">
        <span>${g.name}</span>
        <span class="pct">${displayPct}</span>
      </div>
      <div class="bar"><div class="fill ${color}" style="width: ${pct}%;"></div></div>
      <div style="font-size: 11px; color: var(--text-mute); margin-top: 4px;">
        ${fmt.bahtShort(g.current)} / ${fmt.bahtShort(g.target)}
      </div>
    </div>
  `;
}).join('');

// ── TAB 2: Cash Flow ──
renderKpis('cashflowKpis', [
  { label: 'รายรับรวม / เดือน', value: fmt.bahtShort(totalIncome), color: 'green', sub: `${DATA.income.length} แหล่งรายได้` },
  { label: 'รายจ่ายรวม / เดือน', value: fmt.bahtShort(totalExpense), color: 'red', sub: `${DATA.expenses.length} หมวด` },
  { label: 'Net / เดือน', value: '+' + fmt.bahtShort(cashFlow), color: 'primary', sub: `${fmt.pct(cashFlow/totalIncome*100)} of income` },
  { label: 'รวม / ปี (Net)', value: fmt.bahtShort(cashFlow*12), color: 'amber', sub: 'ก่อนรวม Bonus ปลายปี' }
]);

document.getElementById('incomeTotal').textContent = '+' + fmt.baht(totalIncome);
document.getElementById('expenseTotal').textContent = '−' + fmt.baht(totalExpense);
renderList('incomeList', DATA.income, 'income');
renderList('expenseList', DATA.expenses, 'expense');

// ── TAB 3: Balance Sheet ──
renderKpis('balanceKpis', [
  { label: 'สินทรัพย์รวม', value: fmt.bahtShort(totalAssets), color: 'primary', sub: `${DATA.assets.length} รายการ` },
  { label: 'หนี้สินรวม', value: fmt.bahtShort(totalLiabilities), color: 'red', sub: 'บ้าน Nirvana' },
  { label: 'NET WORTH', value: fmt.bahtShort(netWorth), color: 'green', sub: `Debt-to-Asset: ${fmt.pct(totalLiabilities/totalAssets*100)}` },
  { label: 'อสังหา (Net)', value: fmt.bahtShort(DATA.assets.filter(a => a.type === 'real_estate').reduce((s,a)=>s+a.amount,0) - totalLiabilities), color: 'amber', sub: 'หลังหักหนี้บ้าน' }
]);

document.getElementById('assetsTotal').textContent = fmt.baht(totalAssets);
document.getElementById('liabilitiesTotal').textContent = '−' + fmt.baht(totalLiabilities);
document.getElementById('netWorthValue').textContent = fmt.baht(netWorth);
renderList('assetsList', DATA.assets);
renderList('liabilitiesList', DATA.liabilities, 'expense');

// ── TAB 4: Career & Profile ──
document.getElementById('profileFullName').textContent = DATA.profile.name;
document.getElementById('profilePosition').textContent = DATA.profile.position;
document.getElementById('profileTitle').textContent = `${DATA.profile.title} · ${DATA.profile.company}`;
document.getElementById('profileLocation').textContent = DATA.profile.location;
document.getElementById('profileEmail').textContent = DATA.profile.email;
document.getElementById('profilePhone').textContent = DATA.profile.phone;
document.getElementById('profileLanguages').textContent = DATA.profile.languages;
document.getElementById('profileEducation').textContent = DATA.profile.education;

// Career timeline - visual with promotion highlights
document.getElementById('careerTimeline').innerHTML = DATA.careerPath.map((c, i) => {
  const isPromotion = c.promotion;
  const isCurrent = c.current;
  const dotColor = isCurrent ? 'var(--primary)' : (isPromotion ? 'var(--green)' : 'var(--text-mute)');
  const dotSize = isCurrent ? '20px' : (isPromotion ? '16px' : '12px');
  const isLast = i === DATA.careerPath.length - 1;

  return `
    <div style="display: grid; grid-template-columns: 80px 24px 1fr; gap: 16px; align-items: flex-start; padding-bottom: ${isLast ? '0' : '20px'}; position: relative;">
      <!-- Year column -->
      <div style="text-align: right; padding-top: 2px;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 16px; color: ${isCurrent ? 'var(--primary)' : 'var(--text)'}; font-weight: 700;">
          ${c.year}
        </div>
        ${isCurrent ? '<span class="badge green" style="margin-top: 4px; display: inline-block; font-size: 10px;">CURRENT</span>' : ''}
        ${isPromotion && !isCurrent ? '<span class="badge amber" style="margin-top: 4px; display: inline-block; font-size: 10px;">PROMOTED</span>' : ''}
      </div>

      <!-- Timeline dot + line -->
      <div style="position: relative; height: 100%; display: flex; flex-direction: column; align-items: center;">
        <div style="width: ${dotSize}; height: ${dotSize}; border-radius: 50%; background: ${dotColor}; border: 3px solid var(--surface); box-shadow: 0 0 0 2px ${dotColor}; margin-top: 4px; flex-shrink: 0; z-index: 2;"></div>
        ${!isLast ? `<div style="width: 2px; flex: 1; background: var(--border); margin-top: 4px; min-height: 60px;"></div>` : ''}
      </div>

      <!-- Content -->
      <div style="padding-bottom: ${isLast ? '0' : '8px'};">
        <div style="font-size: 11px; color: var(--text-mute); margin-bottom: 4px;">${c.icon} ${c.department}</div>
        <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px; color: ${isCurrent ? 'var(--primary)' : 'var(--text)'};">
          ${c.role}
        </div>
        <div style="font-size: 13px; color: var(--text-soft); line-height: 1.6;">${c.desc}</div>
      </div>
    </div>
  `;
}).join('');

// Promotion milestones summary
const promotions = DATA.careerPath.filter(c => c.promotion);
document.getElementById('promotionMilestones').innerHTML = promotions.map(p => `
  <div style="text-align: center; padding: 14px; background: ${p.current ? 'var(--bg-green)' : 'var(--bg)'}; border-radius: 6px; border: 1px solid ${p.current ? 'var(--green)' : 'var(--border)'};">
    <div style="font-size: 24px; margin-bottom: 6px;">${p.icon}</div>
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: ${p.current ? 'var(--green)' : 'var(--primary)'};">${p.year}</div>
    <div style="font-size: 12px; color: var(--text-soft); margin-top: 4px;">${p.role.split('—')[0].trim()}</div>
  </div>
`).join('');

// Expertise list
document.getElementById('expertiseList').innerHTML = DATA.expertise.map(e => `
  <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg); border-radius: 6px; font-size: 13px;">
    <span style="color: var(--primary);">✓</span>
    <span>${e}</span>
  </div>
`).join('');

// ── TAB 5: Salary ──
const lastSalary = DATA.salaryHistory[DATA.salaryHistory.length - 2]; // Apr 2026
const firstSalary = DATA.salaryHistory[0];
const yearsWorking = 11;
const salaryGrowthPct = (lastSalary.salary / firstSalary.salary - 1) * 100;
const cagr = (Math.pow(lastSalary.salary / firstSalary.salary, 1/yearsWorking) - 1) * 100;

// Find current year bonus (Dec only - real bonus)
const currentYearBonus = DATA.bonusHistory.find(b => b.current);
const totalCompPerYear = (lastSalary.net * 12) + (currentYearBonus ? currentYearBonus.dec : 0);

renderKpis('salaryKpis', [
  { label: 'เงินเดือนปัจจุบัน', value: fmt.baht(lastSalary.salary), color: 'primary', sub: lastSalary.milestone },
  { label: 'Net / เดือน', value: fmt.baht(lastSalary.net), color: 'green', sub: 'หลังหักทุกอย่าง · เงินช่วยค่าบ้าน + ค่ารถรวมแล้ว' },
  { label: 'โบนัสจริง ธ.ค. 2026', value: fmt.bahtShort(currentYearBonus.dec), color: 'amber', sub: '~53% ของเงินเดือนต่อปี' },
  { label: 'รวมรายได้ Daikin / ปี', value: fmt.bahtShort(totalCompPerYear), color: 'primary', sub: `Net × 12 + โบนัสจริง · CAGR ${fmt.pct(cagr)}` }
]);

document.getElementById('salaryTable').innerHTML = DATA.salaryHistory.map(s => `
  <tr>
    <td><strong>${s.date}</strong></td>
    <td class="num">฿${s.salary.toLocaleString()}</td>
    <td class="num">฿${s.net.toLocaleString()}</td>
    <td>${s.milestone}</td>
  </tr>
`).join('');

// ── Daikin Benefits (moved to Salary tab) ──
const pvdSelf = DATA.daikinBenefits.pvdSelf;
const pvdCompany = DATA.daikinBenefits.pvdCompany;
const gi = DATA.daikinBenefits.groupInsurance;
const pvdMarketValue = DATA.daikinBenefits.totalBalance;       // PVD TISCO mark-to-market
const yearlyContribTotal = DATA.daikinBenefits.yearlyContribution; // 1.Saraly AZ ปีนี้

document.getElementById('pvdSelfMonthly').textContent = fmt.baht(pvdSelf.monthlyContribution) + ' / เดือน';
document.getElementById('pvdSelfPct').textContent = pvdSelf.pctOfSalaryRange + ' (ปัจจุบัน ' + pvdSelf.currentPct + '%)';
document.getElementById('pvdSelfBalance').textContent = fmt.baht(pvdSelf.yearlyContribution) + ' / ปี';
document.getElementById('pvdSelfNote').textContent = pvdSelf.note;

document.getElementById('pvdCompanyMonthly').textContent = '+' + fmt.baht(pvdCompany.monthlyContribution) + ' / เดือน';
document.getElementById('pvdCompanyPct').textContent = pvdCompany.pctOfSalaryRange + ' (ปัจจุบัน ' + pvdCompany.currentPct + '%)';
document.getElementById('pvdCompanyBalance').textContent = fmt.baht(pvdCompany.yearlyContribution) + ' / ปี';
document.getElementById('pvdCompanyNote').textContent = pvdCompany.note;

document.getElementById('groupOpd').textContent = fmt.baht(gi.opd);
document.getElementById('groupOther').textContent = gi.note;

document.getElementById('totalBenefits').innerHTML = `
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <div style="font-size: 12px; color: var(--text-mute); margin-bottom: 4px;">📊 มูลค่าจริงปัจจุบัน (TISCO Mark-to-market)</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 700; color: var(--green);">
        ฿${pvdMarketValue.toLocaleString()}
      </div>
      <div style="font-size: 11px; color: var(--text-mute); margin-top: 4px;">
        → ใช้ใน Net Worth · จาก Cash Sum
      </div>
    </div>
    <div>
      <div style="font-size: 12px; color: var(--text-mute); margin-bottom: 4px;">💼 ฝากเข้าปีนี้ (สำหรับวางแผนภาษี)</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 700; color: var(--primary);">
        ฿${yearlyContribTotal.toLocaleString()}/ปี
      </div>
      <div style="font-size: 11px; color: var(--text-mute); margin-top: 4px;">
        → ลดหย่อนภาษีได้ · จาก 1.Saraly
      </div>
    </div>
  </div>
  <div style="font-size: 12px; margin-top: 12px; color: var(--text-mute); padding-top: 12px; border-top: 1px solid var(--border);">
    ⚠️ <strong>หมายเหตุ:</strong> มูลค่าตลาด ฿${pvdMarketValue.toLocaleString()} ต่ำกว่าเงินที่ฝากสะสม
    เพราะ TISCO PVD เป็นกองทุนที่มีความผันผวน · แนะนำเช็คใน TISCO app เพื่อยืนยัน · ทำงาน 11 ปี = Vested 100%
  </div>
`;

// ── Bonus Table ──
// Calculate base annual salary for % calculation
const annualBaseSalary = lastSalary.salary * 12;

document.getElementById('bonusTable').innerHTML = DATA.bonusHistory.map(b => {
  const isActual = b.actual;
  const isForecast = b.forecast;
  const bgStyle = b.current ? 'style="background: var(--bg-amber);"' : (isForecast ? 'style="opacity: 0.7;"' : '');

  const yearSalary = DATA.salaryHistory.find(s => s.date.includes(b.year.toString()))?.salary || lastSalary.salary;
  const pctOfSalary = ((b.dec / (yearSalary * 12)) * 100).toFixed(1);

  // Badge logic
  let badge = '';
  if (isActual) {
    badge = ' <span class="badge green">✓ จริง</span>';
  } else if (b.current) {
    badge = ' <span class="badge amber">⏳ คาดการณ์ (ปีนี้)</span>';
  } else if (isForecast) {
    badge = ' <span class="badge gray">📊 คาดการณ์</span>';
  }

  return `
    <tr ${bgStyle}>
      <td><strong>${b.year}</strong>${badge}</td>
      <td>${b.role}</td>
      <td class="num"><strong>฿${b.dec.toLocaleString()}</strong></td>
      <td class="num">~${pctOfSalary}%</td>
    </tr>
  `;
}).join('');

// ── TAB 5: Insurance ──
renderKpis('insuranceKpis', [
  { label: 'เบี้ยรวม / ปี (Active)', value: fmt.bahtShort(totalPremium), color: 'primary', sub: `~${fmt.bahtShort(totalPremium/12)}/เดือน` },
  { label: 'คุ้มครองชีวิตรวม', value: fmt.bahtShort(totalDeath), color: 'red', sub: '⚠️ น้อยกว่าหนี้บ้าน' },
  { label: 'โรคร้ายรวม', value: fmt.bahtShort(totalCritical), color: 'amber', sub: 'ส่วนใหญ่จาก Plush Gold 2' },
  { label: 'เหมาจ่ายค่ารักษา', value: fmt.bahtShort(totalMed), color: 'green', sub: '+ Daikin OPD + กลุ่ม' }
]);

const priorityBadge = (p) => {
  if (p.includes('ทบทวน')) return `<span class="badge amber">${p}</span>`;
  if (p.includes('ใหม่'))   return `<span class="badge green">${p}</span>`;
  if (p.includes('⭐'))     return `<span class="badge green">${p}</span>`;
  return `<span class="badge gray">${p}</span>`;
};

document.getElementById('insuranceTable').innerHTML = DATA.insurance.map(p => `
  <tr ${p.priority.includes('⭐') ? 'style="background: var(--bg-green);"' : ''} ${p.status === 'surrendered' ? 'style="opacity: 0.55;"' : ''}>
    <td><strong>${p.name}</strong>${p.status === 'paidup' ? ' <span class="badge green">PAID UP</span>' : ''}${p.status === 'surrendered' ? ' <span class="badge gray">SURRENDERED</span>' : ''}</td>
    <td class="num">${p.premium ? fmt.baht(p.premium) : '—'}</td>
    <td class="num">${p.death ? fmt.baht(p.death) : '—'}</td>
    <td class="num">${p.critical ? fmt.baht(p.critical) : '—'}</td>
    <td class="num">${p.med ? fmt.baht(p.med) : '—'}</td>
    <td>${priorityBadge(p.priority)}</td>
  </tr>
`).join('');

// ============================================================
// ── TAB 7: Retirement (NEW) ──
// ============================================================

// Insurance per-policy dynamic keys from Dashboard_Data
const insurancePoliciesDetail = [
  { no: 1, name: 'สะสมทรัพย์ 15/25', premiumKey: 'insurance_premium_p1', yearsKey: 'insurance_years_p1', cashbackKey: 'insurance_cashback_p1', maturityKey: 'insurance_maturity_p1' },
  { no: 2, name: 'สะสมทรัพย์ 30/15', premiumKey: 'insurance_premium_p2', yearsKey: 'insurance_years_p2', cashbackKey: 'insurance_cashback_p2', maturityKey: 'insurance_maturity_p2' },
  { no: 3, name: 'สะสมทรัพย์ 42/21', premiumKey: 'insurance_premium_p3', yearsKey: 'insurance_years_p3', cashbackKey: 'insurance_cashback_p3', maturityKey: 'insurance_maturity_p3' },
  { no: 4, name: 'ตลอดชีพ 400K', premiumKey: 'insurance_premium_p4', yearsKey: 'insurance_years_p4', cashbackKey: 'insurance_cashback_p4', wholeLife: true },
  { no: 5, name: 'ตลอดชีพ Vai 100K', premiumKey: 'insurance_premium_p5', yearsKey: 'insurance_years_p5', cashbackKey: 'insurance_cashback_p5', wholeLife: true },
  { no: 6, name: 'บำนาญ T237355683', premiumKey: 'insurance_premium_p6', yearsKey: 'insurance_years_p6', cashbackKey: 'insurance_cashback_p6', maturityKey: 'insurance_maturity_p6', pension: true }
];

const insurancePolicyKeyMap = Object.fromEntries(insurancePoliciesDetail.map(p => [p.no, p]));
const policyData = DATA.insurancePolicies.map(p => {
  const keys = insurancePolicyKeyMap[p.no] || {};
  const premium = keys.premiumKey ? getVal(keys.premiumKey, p.premium || 0) : (p.premium || 0);
  const total = keys.yearsKey ? getVal(keys.yearsKey, p.total || 0) : (p.total || 0);
  const cashback = keys.cashbackKey ? getVal(keys.cashbackKey, 0) : 0;
  const maturityAmount = keys.wholeLife
    ? (p.sumInsured || p.maturityAmount || 0)
    : (keys.maturityKey ? getVal(keys.maturityKey, p.maturityAmount || 0) : (p.maturityAmount || 0));
  return {
    ...p,
    premium,
    total,
    cashback,
    maturityAmount,
    totalPremium: premium * total,
    benefit: maturityAmount
  };
});

let totalInsurancePremium = 0;
const insurancePolicyCards = insurancePoliciesDetail.map(p => {
  const premium = getVal(p.premiumKey, 0);
  const years = getVal(p.yearsKey, 0);
  const cashback = getVal(p.cashbackKey, 0);
  const maturity = p.wholeLife ? 0 : getVal(p.maturityKey, 0);
  const totalPremium = premium * years;
  totalInsurancePremium += totalPremium;

  const pensionYearlyForCard = getVal('insurance_pension_yearly', 0);
  const pensionTotalForCard = getVal('insurance_pension_total', 0);
  const pensionStartAgeForCard = getVal('insurance_pension_start_age', 61);
  const pensionEndAgeForCard = getVal('insurance_pension_end_age', 85);
  const pensionYearsForCard = pensionYearlyForCard > 0 ? Math.round(pensionTotalForCard / pensionYearlyForCard) : 0;

  const maturityText = p.wholeLife
    ? 'ทุนชีวิต ตลอดชีพ — ไม่นับในแผนเกษียณ'
    : p.pension
      ? `${fmt.baht(pensionYearlyForCard)}/ปี × ${pensionYearsForCard} ปี = ${fmt.baht(pensionTotalForCard)} (อายุ ${pensionStartAgeForCard}-${pensionEndAgeForCard})`
      : fmt.baht(maturity);

  return `
    <div class="info-box" style="margin-bottom: 12px; border-left: 4px solid ${p.wholeLife ? 'var(--text-mute)' : 'var(--primary)'};">
      <div class="key">ฉบับที่ ${p.no} · ${p.name}</div>
      <div style="font-size: 13px; line-height: 1.8;">
        <div>🔴 เบี้ย: <strong>${fmt.baht(premium)}/ปี × ${years} ปี = ${fmt.baht(totalPremium)}</strong></div>
        <div>🟠 เงินคืนระหว่างทาง: <strong>${fmt.baht(cashback)}</strong></div>
        <div>${p.pension ? '🟢 บำนาญ' : '🟢 ครบสัญญา'}: <strong>${maturityText}</strong></div>
      </div>
    </div>
  `;
}).join('');

const totalInsuranceBenefit = getVal('insurance_total_lifetime_benefit', 0);
const insuranceTotalAt60 = totalInsuranceBenefit;

// PVD projections at age 60 (27 years from now)
const pvdNow = getVal('asset_pvd_tisco', 805630);
const pvdMonthlyContrib = getVal('salary_deduct_pvd', 0) + getVal('pvd_company_match', 0);  // ตัวคุณ + บริษัท
const yearsToRetirement = 27;

function pvdAtAge60(annualReturn) {
  // FV of current balance + FV of monthly contributions
  const r = annualReturn / 12;
  const n = yearsToRetirement * 12;
  const fvCurrent = pvdNow * Math.pow(1 + annualReturn, yearsToRetirement);
  const fvContrib = pvdMonthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
  return fvCurrent + fvContrib;
}

const pvd_3pct = pvdAtAge60(0.03);
const pvd_5pct = pvdAtAge60(0.05);
const pvd_7pct = pvdAtAge60(0.07);

// Top KPIs for Retirement — จะถูก sync อีกครั้งใน renderRetirementCashflow() ตาม slider ปัจจุบัน
renderKpis('retirementKpis', [
  { label: 'ปัจจุบัน', value: 'อายุ 33', color: 'primary', sub: `เกษียณอีก ${yearsToRetirement} ปี (2052)` },
  { label: 'ประกัน 4 ฉบับ (ใช้จริง)', value: fmt.bahtShort(insuranceTotalAt60), color: 'amber', sub: 'เงินคืน + ก้อนครบสัญญา + บำนาญ' },
  { label: 'PVD คาดการณ์ (1%/ปี)', value: fmt.bahtShort(pvdAtAge60(0.01)), color: 'green', sub: 'ปรับตาม slider ด้านล่าง' },
  { label: 'รวมเงินเกษียณ (ตาม slider)', value: fmt.bahtShort(pvdAtAge60(0.01) + insuranceTotalAt60), color: 'primary', sub: 'ยังไม่นับโบนัส + บ้าน' }
]);

// Hero section removed; KPI cards and Retirement Cashflow show the retirement summary.

// ============================================================
// ── Retirement Cashflow (NEW · year-by-year drawdown) ──
// ============================================================

// Insurance constants — ตรงกับ Sheet "3.ประกัน รายละเอียด"
const INSURANCE_CASHBACK_BEFORE_60 = getVal('insurance_cashback_pre60_total', getVal('insurance_cashback_before_60', 0));     // กองเงินคืนสะสมก่อนอายุ 60
const INSURANCE_DRAWDOWN_YEARS     = getVal('insurance_retirement_years', 26);          // 60→85 = 26 ปี
const INSURANCE_PRE60_YEARLY       = INSURANCE_CASHBACK_BEFORE_60 / INSURANCE_DRAWDOWN_YEARS; // ≈64,374
const INSURANCE_PENSION_YEARLY     = getVal('insurance_pension_yearly', getVal('insurance_pension_base_yearly', 0));      // บำนาญ
const INSURANCE_LUMP_630K          = getVal('insurance_maturity_p3', 0);      // ก้อนใหญ่ตอนอายุ 66
const INSURANCE_LUMP_DRAWDOWN_YRS  = 20;          // 66→85 = 20 ปี
const INSURANCE_LUMP_YEARLY        = INSURANCE_LUMP_630K / INSURANCE_LUMP_DRAWDOWN_YRS; // 31,500
const RETIRE_AGE                   = getVal('insurance_retirement_start_age', 60);
const LIFE_EXPECTANCY              = getVal('insurance_life_expectancy_age', 85);
const BIRTH_YEAR                   = 1992;        // Champ เกิด Nov 1992

// Default values from Dashboard_Data
const cfPvdNowDefault     = getVal('asset_pvd_tisco', 805630);
const cfPvdContribDefault = getVal('salary_deduct_pvd', 8250) + getVal('pvd_company_match', 8250); // Champ + Daikin
const cfGrowthDefault     = 0.01; // 1% worst case

// Initialize input values
document.getElementById('cfPvdNow').value     = Math.round(cfPvdNowDefault);
document.getElementById('cfPvdContrib').value = Math.round(cfPvdContribDefault);
document.getElementById('cfGrowthSlider').value = cfGrowthDefault * 100;

// Reusable PVD FV calculator (ใช้ formula เดียวกับ pvdAtAge60 แต่รับ params)
function calcPvdAt60(pvdNow, monthlyContrib, annualReturn) {
  const r = annualReturn / 12;
  const n = yearsToRetirement * 12;
  const fvCurrent = pvdNow * Math.pow(1 + annualReturn, yearsToRetirement);
  const fvContrib = r === 0
    ? monthlyContrib * n
    : monthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
  return fvCurrent + fvContrib;
}

// Cashflow per age — สูตรเดียวกับ expected output ใน prompt
function calcCashflowAtAge(age, pvdYearly) {
  const pre60   = INSURANCE_PRE60_YEARLY;
  const pvd     = pvdYearly;
  const lump630 = age >= 66 ? INSURANCE_LUMP_YEARLY : 0;
  const pension = INSURANCE_PENSION_YEARLY;
  const yearly  = pre60 + pvd + lump630 + pension;
  return { pre60, pvd, lump630, pension, yearly, monthly: yearly / 12 };
}

// Main render function — เรียกใหม่ทุกครั้งที่ user เปลี่ยน input
function renderRetirementCashflow() {
  const pvdNowInput     = parseFloat(document.getElementById('cfPvdNow').value) || 0;
  const pvdContribInput = parseFloat(document.getElementById('cfPvdContrib').value) || 0;
  const growthPct       = parseFloat(document.getElementById('cfGrowthSlider').value) || 1;
  const growthRate      = growthPct / 100;

  // Update growth label
  document.getElementById('cfGrowthLabel').textContent = growthPct + '%';

  // Calculate PVD
  const pvdAt60   = calcPvdAt60(pvdNowInput, pvdContribInput, growthRate);
  const pvdYearly = pvdAt60 / INSURANCE_DRAWDOWN_YEARS;
  const pvdMonthly = pvdYearly / 12;

  // Sync top retirement KPI cards with the same slider/input values
  renderKpis('retirementKpis', [
    { label: 'ปัจจุบัน', value: 'อายุ 33', color: 'primary', sub: `เกษียณอีก ${yearsToRetirement} ปี (2052)` },
    { label: 'ประกัน 4 ฉบับ (ใช้จริง)', value: fmt.bahtShort(insuranceTotalAt60), color: 'amber', sub: 'เงินคืน + ก้อนครบสัญญา + บำนาญ' },
    { label: `PVD คาดการณ์ (${growthPct}%/ปี)`, value: fmt.bahtShort(pvdAt60), color: 'green', sub: `เริ่ม ${fmt.bahtShort(pvdNowInput)} + เพิ่ม ${fmt.bahtShort(pvdContribInput)}/เดือน` },
    { label: 'รวมเงินเกษียณ (ตาม slider)', value: fmt.bahtShort(pvdAt60 + insuranceTotalAt60), color: 'primary', sub: 'ยังไม่นับโบนัส + บ้าน' }
  ]);

  // Update PVD result card
  document.getElementById('cfPvdAt60').textContent  = fmt.baht(pvdAt60);
  document.getElementById('cfPvdYearly').textContent  = fmt.baht(pvdYearly);
  document.getElementById('cfPvdMonthly').textContent = fmt.baht(pvdMonthly);

  // Cashflow at age 60 (pre-66) and 66+
  const flow60 = calcCashflowAtAge(60, pvdYearly);
  const flow66 = calcCashflowAtAge(66, pvdYearly);

  // Calculate PVD share at age 66 (for KPI)
  const pvdShareAt66 = (flow66.pvd / flow66.yearly) * 100;

  // KPI Cards
  renderKpis('cashflowRetireKpis', [
    { label: 'อายุ 60-65 (/เดือน)', value: fmt.baht(flow60.monthly), color: 'amber',
      sub: `${fmt.baht(flow60.yearly)}/ปี · ก่อน Lump 630K` },
    { label: 'อายุ 66-85 (/เดือน)', value: fmt.baht(flow66.monthly), color: 'green',
      sub: `${fmt.baht(flow66.yearly)}/ปี · หลัง Lump 630K` },
    { label: 'PVD ที่อายุ 60', value: fmt.bahtShort(pvdAt60), color: 'primary',
      sub: `Growth ${growthPct}% · ${INSURANCE_DRAWDOWN_YEARS} ปี drawdown` },
    { label: 'PVD share', value: pvdShareAt66.toFixed(0) + '%', color: 'primary',
      sub: 'สัดส่วน PVD ในรายเดือน (อายุ 66+)' }
  ]);

  // Render table rows (age 60-85)
  let tableHtml = '';
  for (let age = RETIRE_AGE; age <= LIFE_EXPECTANCY; age++) {
    const year = BIRTH_YEAR + age;
    const f = calcCashflowAtAge(age, pvdYearly);
    const isLumpStart = age === 66;
    const rowStyle = age >= 66
      ? 'background: var(--bg-green);'
      : '';
    tableHtml += `
      <tr style="${rowStyle}">
        <td><strong>${age}</strong></td>
        <td>${year}</td>
        <td class="num">${fmt.baht(f.pre60)}</td>
        <td class="num"><strong>${fmt.baht(f.pvd)}</strong></td>
        <td class="num">${f.lump630 > 0 ? fmt.baht(f.lump630) + (isLumpStart ? ' ⬆' : '') : '—'}</td>
        <td class="num">${fmt.baht(f.pension)}</td>
        <td class="num"><strong>${fmt.baht(f.yearly)}</strong></td>
        <td class="num"><strong style="color: var(--primary);">${fmt.baht(f.monthly)}</strong></td>
      </tr>
    `;
  }
  document.getElementById('cashflowTableBody').innerHTML = tableHtml;

  // Update charts
  renderCashflowCharts(flow66, pvdYearly);
}

// Charts (Pie + Line)
let cashflowPieInstance = null;
let cashflowLineInstance = null;

function renderCashflowCharts(flow66, pvdYearly) {
  // Pie: source breakdown at age 66+
  const pieCtx = document.getElementById('cashflowPieChart');
  if (cashflowPieInstance) cashflowPieInstance.destroy();
  cashflowPieInstance = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['PVD', 'Pension', 'Insurance pre-60', 'Lump 630K'],
      datasets: [{
        data: [flow66.pvd, flow66.pension, flow66.pre60, flow66.lump630],
        backgroundColor: ['#16a34a', '#1f6feb', '#d97706', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: c => {
              const v = c.parsed;
              const pct = ((v / flow66.yearly) * 100).toFixed(1);
              return `${c.label}: ${fmt.baht(v)} (${pct}%)`;
            }
          }
        }
      }
    }
  });

  // Line: monthly cashflow age 60-85
  const lineCtx = document.getElementById('cashflowLineChart');
  if (cashflowLineInstance) cashflowLineInstance.destroy();
  const ages = [], monthlies = [];
  for (let age = RETIRE_AGE; age <= LIFE_EXPECTANCY; age++) {
    ages.push(age);
    monthlies.push(calcCashflowAtAge(age, pvdYearly).monthly);
  }
  cashflowLineInstance = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ages,
      datasets: [{
        label: 'รายเดือน (฿)',
        data: monthlies,
        borderColor: '#1f6feb',
        backgroundColor: 'rgba(31, 111, 235, 0.1)',
        fill: true,
        tension: 0,
        stepped: true,
        borderWidth: 2,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: c => `อายุ ${c[0].label}`,
            label: c => fmt.baht(c.parsed.y) + '/เดือน'
          }
        }
      },
      scales: {
        y: { ticks: { callback: v => fmt.bahtShort(v) } },
        x: { title: { display: true, text: 'อายุ' } }
      }
    }
  });
}

// Hook input listeners — update real-time on change
document.getElementById('cfPvdNow').addEventListener('input', renderRetirementCashflow);
document.getElementById('cfPvdContrib').addEventListener('input', renderRetirementCashflow);
document.getElementById('cfGrowthSlider').addEventListener('input', renderRetirementCashflow);

// Initial render
renderRetirementCashflow();

// Insurance policy table
document.getElementById('insurancePolicyTable').innerHTML = policyData.map(p => {
  const statusBadge = p.status.includes('✓') ?
    '<span class="badge green">' + p.status + '</span>' :
    p.status === 'เพิ่งเริ่ม' ?
    '<span class="badge gray">' + p.status + '</span>' :
    '<span class="badge amber">' + p.status + '</span>';

  const maturityInfo = p.type === 'wholeLife' ?
    `<em style="color: var(--text-mute); font-size: 12px;">ตลอดชีพ</em><br>ทุน ฿${p.maturityAmount.toLocaleString()}` :
    p.type === 'annuity' ?
    `อายุ ${p.maturityAge} (${p.maturityYear})<br>+ บำนาญ ${p.pensionStartAge}+` :
    `อายุ ${p.maturityAge} (${p.maturityYear})<br>~฿${p.maturityAmount.toLocaleString()}`;

  return `
    <tr>
      <td><strong>${p.no}</strong></td>
      <td>
        <div style="font-weight: 600;">${p.name}</div>
        <div style="font-size: 11px; color: var(--text-mute); margin-top: 2px;">${statusBadge}</div>
      </td>
      <td style="font-family: 'JetBrains Mono', monospace; font-size: 11px;">${p.code}</td>
      <td class="num">${p.sumInsured > 0 ? fmt.baht(p.sumInsured) : '—'}</td>
      <td class="num">฿${p.premium.toLocaleString()}</td>
      <td class="num">${p.paid}/${p.total}<br><span style="font-size: 11px; color: var(--text-mute);">เหลือ ${p.yearsLeft} ปี</span></td>
      <td class="num">อายุ ${33 + p.yearsLeft}</td>
      <td class="num"><strong>${maturityInfo}</strong></td>
    </tr>
  `;
}).join('');

// Retirement Timeline Chart - cash inflow at each age
const timelinePoints = [];
DATA.insurancePolicies.forEach(p => {
  if (p.maturityYear && p.type !== 'wholeLife') {
    timelinePoints.push({
      age: p.maturityAge,
      year: p.maturityYear,
      label: p.name,
      amount: p.maturityAmount
    });
  }
});
// Add pension start
const pension = DATA.insurancePolicies.find(p => p.type === 'annuity');
if (pension) {
  timelinePoints.push({
    age: pension.pensionStartAge,
    year: 2047,
    label: 'บำนาญเริ่มจ่าย',
    amount: pension.pensionAmountYearly
  });
}
// Add age 60 retirement
timelinePoints.push({ age: 60, year: 2052, label: 'เกษียณ', amount: 0 });

timelinePoints.sort((a, b) => a.age - b.age);

new Chart(document.getElementById('retirementTimelineChart'), {
  type: 'bar',
  data: {
    labels: timelinePoints.map(p => `${p.age} (${p.year})`),
    datasets: [{
      label: 'เงินเข้า / เหตุการณ์',
      data: timelinePoints.map(p => p.amount),
      backgroundColor: timelinePoints.map(p =>
        p.label === 'เกษียณ' ? '#ef4444' :
        p.label.includes('บำนาญ') ? '#16a34a' :
        '#d97706'
      ),
      borderRadius: 4
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          afterTitle: c => timelinePoints[c[0].dataIndex].label,
          label: c => c.parsed.y > 0 ? `฿${c.parsed.y.toLocaleString()}` : 'เป้าหมายเกษียณ'
        }
      }
    },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: 'อายุ Champ (ปี)' }},
      y: { ticks: { callback: v => fmt.bahtShort(v) }}
    }
  }
});

// Premium Paid vs Benefit — render per policy from Dashboard_Data
const premiumListEl = document.getElementById('premiumList');
if (premiumListEl) premiumListEl.innerHTML = insurancePolicyCards;

const netReturn = totalInsuranceBenefit - totalInsurancePremium;
const returnPct = totalInsurancePremium > 0 ? (netReturn / totalInsurancePremium * 100).toFixed(1) : '0.0';
const summaryCardsEl = document.getElementById('insuranceBenefitSummaryCards');
if (summaryCardsEl) {
  summaryCardsEl.innerHTML = `
    <div class="kpi red"><div class="label">เบี้ยรวม</div><div class="value">${fmt.baht(totalInsurancePremium)}</div><div class="sub">รวม #1-#6 จาก premium × years</div></div>
    <div class="kpi green"><div class="label">เงินคืน + ครบสัญญา + บำนาญ</div><div class="value">${fmt.baht(totalInsuranceBenefit)}</div><div class="sub">ไม่รวมทุนชีวิต #4/#5</div></div>
    <div class="kpi ${netReturn >= 0 ? 'green' : 'red'}"><div class="label">ผลตอบแทนสุทธิ</div><div class="value">${netReturn >= 0 ? '+' : ''}${fmt.baht(netReturn)}</div><div class="sub">${returnPct}% เทียบกับเบี้ยรวม</div></div>
  `;
}

document.getElementById('netReturnSummary').innerHTML = `
  <div style="font-size: 14px; line-height: 1.8;">
    <div>🔴 เบี้ยรวม: <strong style="color: var(--red);">${fmt.baht(totalInsurancePremium)}</strong></div>
    <div>🟢 เงินคืน + ครบสัญญา + บำนาญ: <strong style="color: var(--green);">${fmt.baht(totalInsuranceBenefit)}</strong></div>
    <div>📊 ผลตอบแทนสุทธิ: <strong style="color: ${netReturn > 0 ? 'var(--green)' : 'var(--red)'}; font-size: 18px;">${netReturn > 0 ? '+' : ''}${fmt.baht(netReturn)} (${returnPct}%)</strong></div>
  </div>
  <div style="font-size: 12px; margin-top: 8px; color: var(--text-mute);">
    📌 #4 และ #5 เป็นทุนชีวิตตลอดชีพ จึงแสดงเป็นความคุ้มครอง ไม่รวมเป็นเงินเกษียณ
    <br>📌 #6 แยกเป็นบำนาญ ไม่ปนกับเงินคืนระหว่างทาง
  </div>
`;

const timelineTableEl = document.getElementById('insuranceTimelineTable');
if (timelineTableEl) {
  const moneyCell = n => n ? fmt.baht(n) : '—';
  timelineTableEl.innerHTML = INSURANCE_DETAIL_ROWS.length ? INSURANCE_DETAIL_ROWS.map(r => {
    const highlight = r.note.includes('ครบสัญญา') ? 'style="background: var(--bg-amber);"' : (r.note.includes('เริ่ม') ? 'style="background: var(--bg-green);"' : '');
    return `<tr ${highlight}><td class="num"><strong>${r.year}</strong></td><td class="num">${r.age}</td><td class="num">${moneyCell(r.p1)}</td><td class="num">${moneyCell(r.p2)}</td><td class="num">${moneyCell(r.p3)}</td><td class="num">${moneyCell(r.p4)}</td><td class="num">${moneyCell(r.p5)}</td><td class="num">${moneyCell(r.p6)}</td><td class="num"><strong>${moneyCell(r.total)}</strong></td><td style="font-size: 12px; color: var(--text-mute);">${r.note || ''}</td></tr>`;
  }).join('') : `<tr><td colspan="10" style="text-align:center; color: var(--text-mute);">โหลดตารางจาก Sheet ไม่สำเร็จ</td></tr>`;
}

// PVD projections
document.getElementById('pvdProj3').textContent = '฿' + Math.round(pvd_3pct).toLocaleString();
document.getElementById('pvdProj5').textContent = '฿' + Math.round(pvd_5pct).toLocaleString();
document.getElementById('pvdProj7').textContent = '฿' + Math.round(pvd_7pct).toLocaleString();
document.getElementById('totalProj3').textContent = '฿' + Math.round(pvd_3pct + insuranceTotalAt60).toLocaleString();
document.getElementById('totalProj5').textContent = '฿' + Math.round(pvd_5pct + insuranceTotalAt60).toLocaleString();
document.getElementById('totalProj7').textContent = '฿' + Math.round(pvd_7pct + insuranceTotalAt60).toLocaleString();

// ── TAB 6: Loan ──
const debtPaid = DATA.loan.originalAmount - DATA.loan.currentBalance;
const paidPct = (debtPaid / DATA.loan.originalAmount) * 100;

renderKpis('loanKpis', [
  { label: 'เงินต้นคงเหลือ', value: fmt.bahtShort(DATA.loan.currentBalance), color: 'red', sub: `จาก ฿${DATA.loan.originalAmount.toLocaleString()}` },
  { label: 'จ่ายไปแล้ว', value: fmt.bahtShort(debtPaid), color: 'green', sub: `${fmt.pct(paidPct)} ของวงเงิน` },
  { label: 'ผ่อน / เดือน', value: fmt.bahtShort(DATA.loan.monthlyTotal), color: 'primary', sub: `ขั้นต่ำ ${fmt.bahtShort(DATA.loan.monthlyMin)} + โป๊ะ ${fmt.bahtShort(DATA.loan.monthlyExtra)}` },
  { label: 'ผ่อนแล้ว', value: '~1.5 ปี', color: 'amber', sub: `เริ่ม ${DATA.loan.startDate}` }
]);

document.getElementById('loanBank').textContent = DATA.loan.bank;
document.getElementById('loanOriginal').textContent = fmt.baht(DATA.loan.originalAmount);
document.getElementById('loanCurrent').textContent = fmt.baht(DATA.loan.currentBalance);
document.getElementById('loanStart').textContent = `${DATA.loan.startDate} · ${DATA.loan.termYears} ปี`;
document.getElementById('loanMonthly').textContent = fmt.baht(DATA.loan.monthlyTotal);

document.getElementById('ratesTable').innerHTML = DATA.loan.interestRates.map(r => `
  <tr>
    <td><strong>${r.period}</strong><div class="note" style="font-size: 11px; color: var(--text-mute);">${r.note}</div></td>
    <td class="num"><strong>${r.rate}</strong></td>
  </tr>
`).join('');

document.getElementById('refinanceNote').innerHTML = `
  เริ่มรีไฟแนนซ์ได้ <strong>${DATA.loan.refinancePlan.date}</strong> · ${DATA.loan.refinancePlan.noPenalty ? '✅ ปลอดค่าปรับ' : '⚠️ มีค่าปรับ'}
  <br>เป้าหมายดอกใหม่: <strong>${DATA.loan.refinancePlan.targetRate}</strong>
  <br><span style="font-size: 12px; color: var(--text-mute);">${DATA.loan.refinancePlan.note}</span>
`;

const minScenario = DATA.loan.scenarios[0];
document.getElementById('scenariosTable').innerHTML = DATA.loan.scenarios.map((s, i) => {
  const savings = i === 0 ? '—' : fmt.bahtShort(minScenario.totalInterest - s.totalInterest);
  const isRecommended = i === 2;
  return `
    <tr ${isRecommended ? 'style="background: var(--bg-green);"' : ''}>
      <td><strong>${s.name}</strong>${isRecommended ? ' <span class="badge green">แนะนำ</span>' : ''}</td>
      <td class="num">${fmt.baht(s.monthly)}</td>
      <td class="num">${s.years} ปี</td>
      <td class="num">${fmt.bahtShort(s.totalInterest)}</td>
      <td class="num" style="color: ${i === 0 ? 'inherit' : 'var(--green)'}; font-weight: 600;">${i === 0 ? savings : '+' + savings}</td>
    </tr>
  `;
}).join('');

// ── TAB 7: Actions ──
document.getElementById('actionsList').innerHTML = DATA.actions.map(a => `
  <div class="alert ${a.level}">
    <div class="alert-title">${a.title}</div>
    <div class="alert-body">${a.body}</div>
  </div>
`).join('');

// ============================================================
// 📊 CHARTS
// ============================================================
Chart.defaults.font.family = 'Sarabun, sans-serif';
Chart.defaults.color = '#555';

// Wealth Building Chart (4 components only - cash flow แยกออกแล้ว)
new Chart(document.getElementById('wealthChart'), {
  type: 'doughnut',
  data: {
    labels: [
      'ออมหุ้น',
      'โป๊ะหนี้บ้าน',
      'PVD ฝากเอง',
      'ไดกิ้นสมทบ (ฟรี)'
    ],
    datasets: [{
      data: [stockSaving, debtPaydown, pvdSelfMonth, pvdCompanyMonth],
      backgroundColor: ['#1f6feb', '#d97706', '#8b5cf6', '#06b6d4'],
      borderColor: '#fff',
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 8,
          font: { size: 11 },
          generateLabels: function(chart) {
            const data = chart.data;
            const total = data.datasets[0].data.reduce((a,b) => a+b, 0);
            return data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              const pct = (value / total * 100).toFixed(0);
              return {
                text: `${label} ${pct}%`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              };
            });
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(ctx) {
            const total = ctx.dataset.data.reduce((a,b)=>a+b, 0);
            const pct = (ctx.parsed / total * 100).toFixed(1);
            return `${ctx.label}: ฿${ctx.parsed.toLocaleString()} (${pct}%)`;
          }
        }
      }
    },
    cutout: '60%'
  }
});

// Net Worth Chart
new Chart(document.getElementById('netWorthChart'), {
  type: 'line',
  data: {
    labels: DATA.netWorthHistory.map(x => x.date),
    datasets: [{
      label: 'Net Worth',
      data: DATA.netWorthHistory.map(x => x.value),
      borderColor: '#1f6feb',
      backgroundColor: 'rgba(31, 111, 235, 0.1)',
      fill: true, tension: 0.4, borderWidth: 2,
      pointBackgroundColor: '#1f6feb', pointRadius: 3, pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmt.bahtShort(c.parsed.y) }}},
    scales: {
      y: { ticks: { callback: v => fmt.bahtShort(v) }},
      x: { grid: { display: false }}
    }
  }
});

// Allocation Chart - all assets
new Chart(document.getElementById('overviewAllocChart'), {
  type: 'doughnut',
  data: {
    labels: DATA.assets.map(a => a.name),
    datasets: [{
      data: DATA.assets.map(a => a.amount),
      backgroundColor: ['#1f6feb','#3b82f6','#10b981','#d97706','#06b6d4','#8b5cf6','#94a3b8','#f59e0b','#ef4444'],
      borderColor: '#fff', borderWidth: 2
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 12, padding: 8, font: { size: 11 }}},
      tooltip: { callbacks: { label: c => `${c.label}: ${fmt.bahtShort(c.parsed)} (${(c.parsed/totalAssets*100).toFixed(1)}%)` }}
    },
    cutout: '60%'
  }
});

// (Income/Expense Charts ลบออก - ใช้ list+bar+% แทน ดูง่ายกว่า)

// Salary Chart
new Chart(document.getElementById('salaryChart'), {
  type: 'line',
  data: {
    labels: DATA.salaryHistory.map(s => s.date),
    datasets: [
      {
        label: 'เงินเดือน Base',
        data: DATA.salaryHistory.map(s => s.salary),
        borderColor: '#1f6feb',
        backgroundColor: 'rgba(31, 111, 235, 0.1)',
        fill: true, tension: 0.3, borderWidth: 2,
        pointRadius: DATA.salaryHistory.map(s => s.milestone.includes('★') ? 8 : 4),
        pointBackgroundColor: DATA.salaryHistory.map(s => s.milestone.includes('★') ? '#16a34a' : '#1f6feb'),
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Net เข้าบัญชี',
        data: DATA.salaryHistory.map(s => s.net),
        borderColor: '#16a34a',
        borderDash: [5,5],
        fill: false, tension: 0.3, borderWidth: 2,
        pointRadius: 4
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: c => `${c.dataset.label}: ฿${c.parsed.y.toLocaleString()}`,
          afterLabel: c => DATA.salaryHistory[c.dataIndex].milestone
        }
      }
    },
    scales: {
      y: { ticks: { callback: v => fmt.bahtShort(v) }, beginAtZero: false },
      x: { grid: { display: false }}
    }
  }
});

// Bonus Chart - clear distinction Actual vs Forecast
new Chart(document.getElementById('bonusChart'), {
  type: 'bar',
  data: {
    labels: DATA.bonusHistory.map(b => {
      let label = b.year + '';
      if (b.actual) label += ' ✓';
      else if (b.current) label += ' ⏳';
      else if (b.forecast) label += ' 📊';
      return label;
    }),
    datasets: [{
      label: 'โบนัส ธ.ค.',
      data: DATA.bonusHistory.map(b => b.dec),
      backgroundColor: DATA.bonusHistory.map(b => {
        if (b.actual) return '#16a34a';        // เขียว = จริง
        if (b.current) return '#d97706';        // เหลือง = ปีนี้ (คาดการณ์)
        if (b.forecast) return '#94a3b8';       // เทา = คาดการณ์ในอนาคต
        return '#94a3b8';
      }),
      borderRadius: 4
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: c => `โบนัส: ฿${c.parsed.y.toLocaleString()}`,
          afterTitle: c => {
            const b = DATA.bonusHistory[c[0].dataIndex];
            const status = b.actual ? '✓ ได้รับจริง' : (b.current ? '⏳ คาดการณ์ปีนี้' : '📊 คาดการณ์อนาคต');
            return `${b.role}\n${status}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false }},
      y: { ticks: { callback: v => fmt.bahtShort(v) }}
    }
  }
});

// Loan Chart
new Chart(document.getElementById('loanChart'), {
  type: 'bar',
  data: {
    labels: DATA.loan.scenarios.map(s => s.name.split(' (')[0]),
    datasets: [{
      label: 'ดอกเบี้ยรวม',
      data: DATA.loan.scenarios.map(s => s.totalInterest),
      backgroundColor: ['#ef4444','#f97316','#16a34a','#1f6feb'],
      borderRadius: 4
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false, indexAxis: 'y',
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmt.bahtShort(c.parsed.x) }}},
    scales: { x: { ticks: { callback: v => fmt.bahtShort(v) }}}
  }
});

} // ← ปิด function renderDashboard()


// ============================================================
// LANGUAGE SWITCHER - Thai / Japanese
// ============================================================
let CURRENT_LANG = localStorage.getItem('dashboard_lang') || 'th';
const ORIGINAL_TEXT = new WeakMap();
const JA_REPLACEMENTS = [
  ['Personal Financial Dashboard · จัดการการเงินส่วนตัว','Personal Financial Dashboard · 個人資産管理'],
  ['ภาพรวม','概要'], ['Cash Flow','キャッシュフロー'], ['สินทรัพย์/หนี้สิน','資産・負債'], ['Career & Profile','キャリア・プロフィール'], ['เงินเดือน','給与'], ['ประกัน','保険'], ['หนี้บ้าน','住宅ローン'], ['สิ่งต้องทำ','To Do'],
  ['UPDATED','更新日'], ['AGE','年齢'], ['NET WORTH','純資産'], ['Assets − Liabilities','資産 − 負債'], ['WEALTH BUILDING / เดือน','資産形成 / 月'], ['รวมโบนัสเฉลี่ย','平均ボーナス込み'], ['CASH เหลือใช้สด / เดือน','自由に使えるキャッシュ / 月'], ['ใช้ส่วนตัว/ฉุกเฉิน','個人利用・緊急用'], ['หนี้สินคงเหลือ','負債残高'],
  ['Wealth Building / เดือน — เงินสะสมระยะยาว 4 ช่องทาง','資産形成 / 月 — 長期資産を作る4つのルート'], ['เงินที่ลงทุน/สะสม/ลดหนี้ ทุกเดือน','毎月の投資・積立・元本返済'], ['ไม่รวม Cash เหลือใช้สด','自由に使えるキャッシュは除外'], ['รายละเอียด Wealth Building','資産形成の内訳'], ['ออมหุ้น (Asset Growth)','株式積立（資産成長）'], ['โป๊ะหนี้บ้าน (ลดหนี้ = สร้างทุน)','住宅ローン繰上返済（負債削減＝資本形成）'], ['ออมทรัพย์ PVD ฝากเอง','PVD自己拠出'], ['ไดกิ้นสมทบ (ฟรี!)','Daikin会社拠出（福利厚生）'], ['รวม Wealth Building / เดือน (ไม่รวมโบนัส)','資産形成合計 / 月（ボーナス除く）'], ['Cash เหลือใช้สด (เก็บไว้ใช้เล่น/ฉุกเฉิน)','自由に使えるキャッシュ（娯楽・緊急用）'], ['เงินส่วนตัว · ปาร์ตี้, ตีกอล์ฟ, ของขวัญ, ฉุกเฉิน · ไม่ผูกมัด','個人用キャッシュ · 外食、ゴルフ、プレゼント、緊急費用 · 固定しないお金'], ['สัดส่วน Wealth Building','資産形成の割合'], ['ถ้าเฉลี่ยโบนัสจริง ธ.ค. มาด้วย','12月ボーナスを月平均にした場合'], ['โบนัสจริง ธ.ค. 2026 (เฉลี่ย/เดือน)','2026年12月ボーナス（月平均）'], ['Wealth Building รวมโบนัสเฉลี่ย','ボーナス込み資産形成'], ['สรุปเป็นปี','年間サマリー'], ['ไม่รวมโบนัส (Conservative)','ボーナス除く（保守的）'], ['รวมโบนัส (Realistic)','ボーナス込み（現実的）'], ['นี่คือเงินที่กำลังสะสมเป็น Wealth ของคุณทุกเดือน','これは毎月あなたの資産として積み上がっている金額です'], ['บางส่วนเป็นเงินสด · บางส่วนเป็นการลดหนี้ · บางส่วนเป็น Asset ระยะยาว','一部は現金、一部は負債削減、一部は長期資産です'],
  ['Net Worth Growth','純資産の推移'], ['Progress to Goals','目標進捗'], ['ภาพรวม Asset Allocation','資産配分の概要'], ['รายรับรวม / เดือน','月間収入合計'], ['รายจ่ายรวม / เดือน','月間支出合計'], ['Net / เดือน','月間ネット'], ['รวม / ปี (Net)','年間ネット'], ['แหล่งรายได้','収入源'], ['หมวด','項目'], ['ก่อนรวม Bonus ปลายปี','年末ボーナス除く'], ['รายรับ','収入'], ['รายจ่าย','支出'],
  ['Keen Condo Sriracha — การจัดสรรเงิน','Keen Condo Sriracha — 資金配分'], ['ค่าเช่าที่ได้รับเต็ม','家賃総額'], ['หักค่าใช้จ่ายและแบ่งตามข้อตกลงกับยูโกะ','費用を差し引き、Yukoとの合意に基づき配分'], ['ได้รับ → ค่าใช้จ่าย Keen','受取 → Keen費用'], ['ค่าเช่ารวม (Gross)','家賃総額（Gross）'], ['Net หลังหักค่าใช้จ่าย','費用控除後ネット'], ['การแบ่งเงิน','資金配分'], ['หุ้นส่วนยูโกะ','Yuko分'], ['ยูโกะซื้อทอง','Yukoの金積立'], ['ค่าใช้จ่าย Nirvana ร่วม','Nirvana共同費用'], ['ทบหนี้ KKP','KKPローン返済'], ['ข้อสังเกต','メモ'], ['ในมุมมองของ Champ','Champ視点では'], ['เข้าตัวจริง','実際の取り分'], ['ใช้ทบหนี้บ้าน','住宅ローン返済に充当'], ['ส่วนยูโกะ','Yuko分'], ['ได้รับ + เก็บทองรวม','受取＋金積立合計'],
  ['สินทรัพย์รวม','資産合計'], ['หนี้สินรวม','負債合計'], ['อสังหา (Net)','不動産（ネット）'], ['หลังหักหนี้บ้าน','住宅ローン控除後'], ['สินทรัพย์','資産'], ['หนี้สิน','負債'], ['รายการ','件'], ['Debt-to-Asset','負債比率'],
  ['Professional Summary','プロフェッショナルサマリー'], ['Career Path at Daikin','Daikinでのキャリアパス'], ['เส้นทางการเติบโต','成長の道のり'], ['Promotion Milestones','昇進マイルストーン'], ['Key Achievements & Projects','主な実績・プロジェクト'], ['Core Expertise','主な専門性'], ['What Makes Me Unique','強み'], ['Education','学歴'],
  ['เงินเดือนปัจจุบัน','現在の基本給'], ['หลังหักทุกอย่าง','控除後'], ['โบนัสจริง ธ.ค. 2026','2026年12月ボーナス'], ['รวมรายได้ Daikin / ปี','Daikin年間収入合計'], ['การเติบโตเงินเดือน + Career Milestones','給与成長＋キャリアマイルストーン'], ['โบนัสจริงประจำปี (เฉพาะเดือนธันวาคม)','年間ボーナス（12月のみ）'], ['ได้รับแล้ว','実績'], ['คาดการณ์','予測'], ['ปี 2026 ยังไม่ได้รับ','2026年は未受領'], ['อนาคต','将来'],
  ['รายละเอียดกรมธรรม์','保険契約の詳細'], ['เบี้ยรวม / ปี (Active)','年間保険料（有効）'], ['คุ้มครองชีวิตรวม','死亡保障合計'], ['โรคร้ายรวม','重大疾病保障合計'], ['เหมาจ่ายค่ารักษา','医療保障合計'], ['การคุ้มครอง vs ความต้องการ','保障額 vs 必要額'], ['Coverage Gap','保障ギャップ'], ['ค่ารักษาพยาบาลครอบคลุมดี','医療保障は十分'],
  ['เงินต้นคงเหลือ','元本残高'], ['จ่ายไปแล้ว','返済済み'], ['ผ่อน / เดือน','月返済額'], ['ผ่อนแล้ว','返済期間'], ['ข้อมูลสินเชื่อ KKP','KKPローン情報'], ['อัตราดอกเบี้ย','金利'], ['แผนรีไฟแนนซ์','借り換え計画'], ['เปรียบเทียบ Scenarios','シナリオ比較'], ['กราฟเปรียบเทียบดอกเบี้ยรวม','総利息比較グラフ'],
  ['Action Items (เรียงลำดับความสำคัญ)','アクション項目（優先順）'], ['Timeline ที่แนะนำ','推奨タイムライン'], ['เป้าหมาย','目標'], ['สถานะ','ステータス'],
  // Retirement page translations
  ['เกษียณ','退職'], ['แผนเกษียณ','退職プラン'], ['อีก 27 ปี','あと27年'], ['ภาพรวมเงินที่คาดว่าจะได้รับเมื่อเกษียณ','退職時に受け取る予定の資金概要'], ['รวมประกัน 6 ฉบับ + PVD + ลงทุน','保険6契約 + PVD + 投資の合計'],
  ['ประกัน 6 ฉบับ (ครบสัญญา)','保険6契約（満期）'], ['เงินคืนตามตาราง + บำนาญ','満期返戻金 + 年金'], ['PVD TISCO (คาดการณ์)','PVD TISCO（予測）'], ['โต ~5%/ปี · อายุ 60','年5%成長 · 60歳時'], ['รวมเงินเกษียณคาดการณ์','退職資金合計（予測）'], ['+ บ้าน + ลงทุนอื่น','+ 不動産 + その他投資'],
  ['ตัวเลขเป็น','数字は'], ['คาดการณ์ขั้นต่ำ','最低限の予測'], ['ยังไม่นับ','含まれない項目'], ['โบนัส 27 ปี','27年間のボーナス'], ['ถ้า save ลงทุน','投資した場合'], ['มูลค่าบ้านที่เพิ่มขึ้น','住宅価値の上昇'], ['เงินเดือนเพิ่ม','給与アップ'], ['ลงทุนเพิ่มเติม','追加投資'], ['มรดกพ่อแม่ของยูโกะ','Yukoの両親からの相続'], ['ถ้ามี','があれば'],
  ['ประกัน 6 ฉบับ — เงินคืน & ครบสัญญา','保険6契約 — 返戻金 & 満期'], ['ข้อมูลจาก Sheet','データソース'], ['ส่งครบแล้ว','支払完了'], ['กำลังส่ง','支払中'], ['กรมธรรม์','契約'], ['เลขสัญญา','契約番号'], ['ทุนประกัน','保険金'], ['เบี้ย/ปี','年間保険料'], ['ส่งแล้ว','支払済'], ['ครบส่ง (อายุ Champ)','支払完了（Champ年齢）'], ['ครบสัญญา (เงินได้คืน)','満期（返戻金）'], ['ใกล้ครบ','もうすぐ満期'], ['เพิ่งเริ่ม','開始したばかり'], ['ตลอดชีพ','終身'], ['ทุน','保険金'],
  ['Timeline เงินเข้า — ตามอายุ','収入タイムライン — 年齢別'], ['แต่ละจุด = ปีที่กรมธรรม์ครบสัญญา หรือ เริ่มได้บำนาญ','各点 = 保険満期または年金開始の年'], ['อายุ Champ (ปี)','Champ年齢（年）'], ['เงินเข้า / เหตุการณ์','入金 / イベント'], ['เป้าหมายเกษียณ','退職目標'], ['บำนาญเริ่มจ่าย','年金支給開始'],
  ['เบี้ยที่จ่ายไปทั้งหมด vs เงินที่ได้คืน','支払保険料合計 vs 受取返戻金'], ['เบี้ยที่จ่าย (ตลอดอายุสัญญา)','支払保険料（契約期間中）'], ['เงินคืน + เงินทุน + บำนาญ','返戻金 + 保険金 + 年金'], ['รวมเบี้ยที่จ่าย','支払保険料合計'], ['รวมเงินที่จะได้','受取金額合計'], ['ผลตอบแทนสุทธิ','正味リターン'], ['เป็นเวลา','期間'],
  ['คาดการณ์เงินเกษียณ ณ อายุ 60 (สถานการณ์)','60歳時の退職資金予測（シナリオ）'], ['สมมติ PVD โตเฉลี่ย','PVD平均成長率'], ['ค่าเริ่มต้น','初期値'], ['เพิ่มเดือนละ','毎月の積立'], ['ตัวคุณ + บริษัท','本人 + 会社拠出'], ['สถานการณ์','シナリオ'], ['PVD ผลตอบแทน','PVDリターン'], ['PVD ตอนอายุ 60','60歳時PVD'], ['+ ประกัน','+ 保険'], ['Pessimistic','悲観的'], ['Base case','基本ケース'], ['Optimistic','楽観的'],
  ['ปัจจุบัน','現在'], ['อายุ 33','33歳'], ['เกษียณอีก','退職まで'], ['ปี (2052)','年 (2052)'], ['เงินคืน + ทุนชีวิต + บำนาญ','返戻金 + 死亡保険金 + 年金'], ['เริ่ม ฿805K + เพิ่ม ฿16K/เดือน','開始残高 ฿805K + 月額拠出 ฿16K'], ['รวมเงินเกษียณ (Base case)','退職資金合計（基本ケース）'], ['ยังไม่นับโบนัส + บ้าน','ボーナス・不動産除く'],
  ['เงินเดือน Daikin (Net หลังหัก)','Daikin給与（控除後ネット）'], ['Keen Condo - ส่วนของ Champ','Keen Condo - Champ分'], ['รายได้แผงค้าร้านกาแฟ','コーヒー店ブース収入'], ['ค่าเช่าที่ดินนครชัยศรี','Nakhon Chai Si土地賃料'], ['ผลตอบแทนพอร์ต (เฉลี่ย)','ポートフォリオ収益（平均）'], ['ผ่อนบ้าน Nirvana KKP (ขั้นต่ำ)','Nirvana KKP住宅ローン（最低）'], ['โป๊ะเงินต้นบ้าน (Champ Get จาก Keen)','住宅ローン繰上返済（KeenのChamp分）'], ['ออม + ลงทุน (หุ้น)','貯蓄＋投資（株式）'], ['เบี้ยประกัน (รวม 7 ฉบับ)','保険料（7契約合計）'], ['อื่นๆ (เรียน + บริจาค + ดูแลตัว)','その他（学習・寄付・自己投資）'],
  ['บ้าน Nirvana Element Bangna','Nirvana Element Bangna住宅'], ['ทองคำ','金'], ['เงินสด (รวม)','現金合計'], ['กองทุนรวม','投資信託'], ['รถ Mazda 2 Skyactiv','Mazda 2 Skyactiv'], ['มูลค่าประกันออมทรัพย์','貯蓄型保険の解約返戻金'], ['หุ้นไทย','タイ株'], ['สินเชื่อบ้าน KKP','KKP住宅ローン'],
  ['เดือน','月'], ['ปี','年'], ['บาท','バーツ'], ['รวม','合計'], ['ปัจจุบัน','現在'], ['ด่วน','緊急'], ['สำคัญ','重要'], ['วางแผน','計画中'], ['แนะนำ','推奨']
];
function translateString(text, lang) {
  if (lang === 'th') return text;
  let out = text;
  JA_REPLACEMENTS.slice().sort((a,b) => b[0].length - a[0].length).forEach(([th, ja]) => { out = out.split(th).join(ja); });
  return out;
}
function walkTextNodes(root, fn) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','TEXTAREA','CODE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(fn);
}
function setLanguage(lang) {
  CURRENT_LANG = lang;
  localStorage.setItem('dashboard_lang', lang);
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'th';
  document.getElementById('langTh')?.classList.toggle('active', lang === 'th');
  document.getElementById('langJa')?.classList.toggle('active', lang === 'ja');
  walkTextNodes(document.body, node => {
    if (!ORIGINAL_TEXT.has(node)) ORIGINAL_TEXT.set(node, node.nodeValue);
    node.nodeValue = translateString(ORIGINAL_TEXT.get(node), lang);
  });
}
function initLanguageSwitcher() { setLanguage(CURRENT_LANG); }

// ============================================================
// 🎬 TAB SWITCHER (อยู่นอก renderDashboard เพื่อให้ใช้งานได้ทุกที่)
// ============================================================
// showTab() ย้ายไปอยู่ใน index.html แล้ว (รองรับ async fetch tabs)
