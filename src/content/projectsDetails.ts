export type ProjectDetail = {
  id: string
  title: string
  //pic
  description: string
  tags: string[]
  //technologies
  //git repo?
  //more details
}

export const projectsDetails: ProjectDetail[] = [
  {
    id: 'project-one',
    title: 'Ambulance Adventure',
    description: "For my Master's thesis, I tackled the challenge of reducing anxiety for children aged 4-7 in the Pediatric Emergency Department at Herlev Hospital. The result was 'Ambulance Adventure', a fully functional, wall-mounted board game that familiarizes children with the hospital journey through playful exploration.",
    tags: ['physical', 'design'],
  },
  {
    id: 'project-two',
    title: 'Check It',
    description: 'A short placeholder description for the second project.',
    tags: ['mobile',],
  },
  {
    id: 'project-three',
    title: 'Yellow Pages',
    description: 'A short placeholder description for the third project.',
    tags: ['web'],
  },
  {
    id: 'project-four',
    title: 'Fix It',
    description: 'A short placeholder description for the fourth project.',
    tags: ['mobile'],
  },
]