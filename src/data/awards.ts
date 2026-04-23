export interface Award {
  year: string;
  title: { zh: string; en: string };
  level: "international" | "national" | "provincial" | "university";
}

export const awards: Award[] = [
  {
    year: "2025",
    title: {
      zh: "国际定向基因工程大赛 (iGEM) 国际级金奖",
      en: "International Gold Medal, iGEM",
    },
    level: "international",
  },
  {
    year: "2025",
    title: {
      zh: "全国操作系统设计大赛 国家级三等奖",
      en: "National Third Prize, National OS Design Competition",
    },
    level: "national",
  },
  {
    year: "2024",
    title: {
      zh: "校优秀学生奖学金 银奖",
      en: "Silver Prize, University Outstanding Student Scholarship",
    },
    level: "university",
  },
  {
    year: "2024",
    title: {
      zh: '校"余庆杯"软件开发大赛 三等奖',
      en: 'Third Prize, "Yuqing Cup" Software Development Competition',
    },
    level: "university",
  },
  {
    year: "2023",
    title: {
      zh: '英文"外研社·国才杯"全国大学生外语能力大赛安徽省 二等奖',
      en: "Anhui Provincial Second Prize, FLTRP·ETIC National English Competition",
    },
    level: "provincial",
  },
  {
    year: "2023",
    title: {
      zh: "校优秀学生奖学金 银奖",
      en: "Silver Prize, University Outstanding Student Scholarship",
    },
    level: "university",
  },
];
