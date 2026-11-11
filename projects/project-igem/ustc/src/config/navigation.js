// src/config/navigation.js

export const navLinks = [
  {
    title: 'Project',
    // 注意：这里将 "descriptions" 修正为单数形式，更符合路由习惯
    href: '/description',
    subLinks: [
      { title: 'Description', href: '/description' },
      { title: 'Design', href: '/design' },
      { title: 'Contribution', href: '/contribution' },
      { title: 'Implementation', href: '/implementation' },
      { title: 'Proof of Concept', href: '/proof-of-concept' },
      { title: 'Engineering', href: '/engineering' },
      { title: 'Safety & Security', href: '/safety' },
    ],
  },
  {
    title: 'Wet Lab',
    href: '/parts',
    subLinks: [
      { title: 'Part Page', href: '/parts' },
      { title: 'Protocol', href: '/protocol' },
      { title: 'Notebook', href: '/notebook' },
      { title: 'Results', href: '/results' },
    ],
  },
  {
    title: 'Dry Lab',
    href: '/model',
    subLinks: [{ title: 'Model', href: '/model' }],
  },
  {
    title: 'Human Practices',
    href: '/human-practices',
    subLinks: [
      { title: 'Integrated Human Practices', href: '/human-practices' },
      { title: 'Education', href: '/education' },
    ],
  },
  {
    title: 'Team',
    // 注意：这里修正了 "merbers" 的拼写错误
    href: '/members',
    subLinks: [
      { title: 'Roster', href: '/members' },
      { title: 'Attributions', href: '/attributions' },
    ],
  },
];
