import checkitFront from '../assets/projectImages/check-it/checkit_splashscreen.png'
import checkitImage1 from '../assets/projectImages/check-it/checkit_setup.jpg'
import checkitImage2 from '../assets/projectImages/check-it/checkit_home.png'
import checkitImage3 from '../assets/projectImages/check-it/checkit_checklist.jpg'
import checkitImage4 from '../assets/projectImages/check-it/checkit_checklist_popup.jpg'
import checkitImage5 from '../assets/projectImages/check-it/checkit_viz1.jpg'
import checkitImage6 from '../assets/projectImages/check-it/checkit_viz2.jpg'
import checkitImage7 from '../assets/projectImages/check-it/checkit_viz3.jpg'

import ambulanceFront from '../assets/projectImages/ambulance-adventure/ambulance_board.jpg'
import ambulanceImage1 from '../assets/projectImages/ambulance-adventure/ambulance_test_kid.jpg'
import ambulanceImage2 from '../assets/projectImages/ambulance-adventure/ambulance_test_kid2.jpg'
import ambulanceImage3 from '../assets/projectImages/ambulance-adventure/ambulance_test_nurse.jpg'
import ambulanceImage4 from '../assets/projectImages/ambulance-adventure/ambulance_board_inside.jpg'

import yellowpagesFront from '../assets/projectImages/yellow-pages/yellowpages_filters_results.png'
import yellowpagesImage1 from '../assets/projectImages/yellow-pages/yellowpages_drawer.png'
import yellowpagesImage2 from '../assets/projectImages/yellow-pages/yellowpages_filters.png'
import yellowpagesImage3 from '../assets/projectImages/yellow-pages/yellowpages_search.png'
import yellowpagesImage4 from '../assets/projectImages/yellow-pages/yellowpages_search_results.png'



export type ProjectDetail = {
  id: string
  title: string
  frontImage?: string  
  frontImageAlt?: string
  description: string
  overview: string
  backImages?: {
    src: string
    alt: string
  }[]  
  //how it works?
  buildDetails: string  
  testing: string
  tags: string[]
  githubUrl?: string
  color: string
}

export const projectsDetails: ProjectDetail[] = [
  {
    id: 'project-two',
    title: 'Check It',
    frontImage: checkitFront,
    frontImageAlt: 'The Check It mobile app',
    description: 'Check off your goals, log your mood and explore how the two connect. Check It is a mobile app that helps you reflect on your daily achievements and spot patterns over time.',
    overview: "For a course in my master's programme, my teammate and I developed Check It to bring personal goals and daily mood tracking together.",
    backImages: [
      {
        src: checkitImage1,
        alt: 'Check It setup screen',
      },
      {
        src: checkitImage2,
        alt: 'Check It home screen',
      },
      {
        src: checkitImage3,
        alt: 'Check It checklist screen',
      },
      {
        src: checkitImage4,
        alt: 'Check It checklist mood popup',
      },
      {
        src: checkitImage5,
        alt: 'Yellow Pages reflections screen visualizations1',
      },
      {
        src: checkitImage6,
        alt: 'Yellow Pages reflections screen visualizations2',
      },
      {
        src: checkitImage7,
        alt: 'Yellow Pages reflections screen visualizations3',
      },
    ],
    buildDetails: "Built with React Native, with Firebase handling accounts and data storage. Interactive charts made with Victory Native let users explore patterns in their mood and daily achievements.",
    testing: "Throughout development, user testing helped shape the app. Think-aloud sessions explored how people understood the interface and concept, while Wizard of Oz experiments tested the impact of push notifications across different user groups.",
    tags: ['mobile',],
    githubUrl: 'https://github.com/GeorgiaTsoukala/CheckIt-MobileApp',
    color: '#ff3c87',
  },
  {
    id: 'project-one',
    title: 'Ambulance Adventure',
    frontImage: ambulanceFront,
    frontImageAlt: 'The Ambulance Adventure hospital game',
    description: "A hospital visit can feel overwhelming when you're little. Ambulance Adventure is a wall-mounted board game that lets children explore what happens during a visit to Herlev Hospital's pediatric emergency department.",
    overview: "For my master's thesis, my thesis partner and I created Ambulance Adventure for children aged 4-7 at Herlev Hospital's pediatric emergency department. We set out to make the hospital journey feel more familiar through play.",
    backImages: [
      {
        src: ambulanceImage1,
        alt: 'Ambulance Adventure tested by a kid',
      },
      {
        src: ambulanceImage2,
        alt: 'Ambulance Adventure tested by a kid',
      },
      {
        src: ambulanceImage3,
        alt: 'Ambulance Adventure tested by a nurse',
      },
      {
        src: ambulanceImage4,
        alt: 'The electronic components inside the prototype',
      },
    ],
    buildDetails: "Designed in Fusion 360 and built using laser cutting and 3D printing, with Arduino boards controlling the interactions. RFID readers detect when the toy-ambulance enters a room, activating buttons that let children hear about the items found there.",
    testing: "On-site research, including interviews with emergency department staff at Herlev Hospital, helped identify children's needs and shape the game through several prototypes. The game's impact was evaluated through structured observations of how children interacted with it, alongside anxiety ratings and children's self-reports before and after playing.",
    tags: ['physical', 'design'],
    color: '#4f46e5',
  },  
  {
    id: 'project-three',
    title: 'Yellow Pages',
    frontImage: yellowpagesFront,
    frontImageAlt: 'The Yellow Pages web app',
    description: "Who in your team knows the right person? Yellow Pages brings a firm's LinkedIn connections into one searchable web app, helping investors explore their shared network.",
    overview: "Built with my team for a master's course in collaboration with a venture capital firm. I was part of the two-person frontend team, designing and building an interface to help investors find relevant contacts.",
    backImages: [
      {
        src: yellowpagesImage1,
        alt: 'Yellow Pages drawer feature',
      },
      {
        src: yellowpagesImage2,
        alt: 'Yellow Pages filters tab',
      },
      {
        src: yellowpagesImage3,
        alt: 'Yellow Pages search tab',
      },
      {
        src: yellowpagesImage4,
        alt: 'Yellow Pages search results',
      },
    ],
    buildDetails: "Built with React, with Django handling the backend and PostgreSQL storing connection data. Tabbed filters and an expandable drawer for more details built with Material UI let users find relevant contacts and explore their work history.",
    testing: "User feedback guided the app's design throughout development. Think-aloud sessions and interviews with employees at the firm explored how people navigated the interface and searched their network, while A/B testing compared design alternatives.",
    tags: ['web'],
    color: '#00c2a2',
  },
  {
    id: 'project-four',
    title: 'Fix It',
    description: 'A short placeholder description for the fourth project.',
    overview: "",
    buildDetails: "",
    testing: "",
    tags: ['mobile'],
    githubUrl: 'https://github.com/GeorgiaTsoukala/FixIt-MobileApp',    
    color: '#ff815d',
  },
]