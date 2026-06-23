export type IntroSkillItem = {
  label: string
  color: string
}

export type IntroSkillCategory = {
  title: string
  skills: IntroSkillItem[]
}

export const introSkills: IntroSkillCategory[] = [
  {
    title: 'Web & App Development',
    skills: [
      { label: 'React.js', color: '#93C5FD' },
      { label: 'React Native', color: '#A7F3D0' },
      { label: 'JavaScript', color: '#FDE68A' },
      { label: 'TypeScript', color: '#BFDBFE' },
      { label: 'Firebase', color: '#FDBA74' },
      { label: 'SQL', color: '#FCA5A5' },
    ],
  },
  {
    title: 'User Experience',
    skills: [
      { label: 'User Research', color: '#F9A8D4' },
      { label: 'Usability Testing', color: '#C4B5FD' },
      { label: 'User Experience (UX)', color: '#86EFAC' },
      { label: 'Prototyping', color: '#F6D365' },
      { label: 'Workshop Facilitation', color: '#A5F3FC' },
    ],
  },
  {
    title: 'Design & Tools',
    skills: [
      { label: 'Figma', color: '#FDA4AF' },
      { label: 'Autodesk Fusion 360', color: '#99F6E4' },
      { label: 'Git', color: '#DDD6FE' },
    ],
  },
]