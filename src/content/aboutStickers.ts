import basketballSticker from '../assets/stickers/basketballSticker.png'
import phoneSticker from '../assets/stickers/phoneSticker.png'
import greeceSticker from '../assets/stickers/greeceSticker.png'
import emailSticker from '../assets/stickers/emailSticker.png'
import linkedinSticker from '../assets/stickers/linkedinSticker.png'
import bikeSticker from '../assets/stickers/bikeSticker.png'
import githubSticker from '../assets/stickers/githubSticker.png'
import dtuComputeSticker from '../assets/stickers/dtuComputeSticker.png'
import internshipSticker from '../assets/stickers/internshipSticker.png'
import masterSticker from '../assets/stickers/masterSticker.png'

export type AboutSticker = {
  id: string
  image: string
  alt: string
  text: string
  link?: {
    href: string
    label: string
  }
  textAfterLink?: string
  position: string
  size: string
  rotation: string
  bubbleSide: 'top' | 'bottom'
}

export const aboutStickers: AboutSticker[] = [
  {
    id: 'greece',
    image: greeceSticker,
    alt: 'Greece sticker',
    text: "Yep I'm greek. (It's pronounced 'Yeeros' not 'Jairos')",
    position: 'bottom-[8%] left-[84%]',
    size: 'w-[clamp(4.5rem,8vw,9rem)]',
    rotation: 'rotate-[-30deg]',
    bubbleSide: 'top'
  },
  {
    id: 'bike',
    image: bikeSticker,
    alt: 'Bike sticker',
    text: "Based in Copenhagen. Came for my studies, stayed for the pastries.",
    position: 'bottom-[72%] left-[40%]',
    size: 'w-[clamp(4.5rem,8vw,25rem)]',
    rotation: 'rotate-[6deg]',
    bubbleSide: 'top'
  },
  {
    id: 'phone',
    image: phoneSticker,
    alt: 'Phone sticker',
    text: 'Always happy to chat! +45 91811810',
    position: 'bottom-[5%] left-[16%]',
    size: 'w-[clamp(4.5rem,8vw,7rem)]',
    rotation: 'rotate-[10deg]',
    bubbleSide: 'top'
  },
  {
    id: 'email',
    image: emailSticker,
    alt: 'Email sticker',
    text: "You could always send me an email at gtsoukala7@gmail.com",
    position: 'bottom-[45%] left-[80%]',
    size: 'w-[clamp(4.5rem,8vw,5rem)]',
    rotation: 'rotate-[8deg]',
    bubbleSide: 'top'
  },
  {
    id: 'linkedin',
    image: linkedinSticker,
    alt: 'Linkedin sticker',
    text: 'Find me on',
    link: {
      href: 'https://www.linkedin.com/in/georgia-tsoukala-5144a4245/',
      label: 'LinkedIn',
    },
    textAfterLink: '.',
    position: 'bottom-[75%] left-[92%]',
    size: 'w-[clamp(4.5rem,8vw,5rem)]',
    rotation: 'rotate-[15deg]',
    bubbleSide: 'top'
  },
  {
    id: 'github',
    image: githubSticker,
    alt: 'Github sticker',
    text: "Wanna take a closer look at my",
    link: {
      href: 'https://github.com/GeorgiaTsoukala',
      label: 'Github',
    },
    textAfterLink: ' projects?',
    position: 'bottom-[22%] left-[35%]',
    size: 'w-[clamp(4.5rem,8vw,5.5rem)]',
    rotation: 'rotate-[-6deg]',
    bubbleSide: 'bottom'
  },
  {
    id: 'bachelor',
    image: masterSticker,
    alt: 'Master sticker',
    text: "Electrical & Computer Engineering survivor 🎓. UTh is where I learned to code and where it all started!",
    position: 'bottom-[33%] left-[7%]',
    size: 'w-[clamp(4.5rem,8vw,7rem)]',
    rotation: 'rotate-[-5deg]',
    bubbleSide: 'top'
  },
  {
    id: 'internship',
    image: internshipSticker,
    alt: 'Internship sticker',
    text: "Interning at Theron Engineering was where I helped coordinate projects and saw how different engineering fields work together.",
    position: 'bottom-[2%] left-[55%]',
    size: 'w-[clamp(4.5rem,8vw,9rem)]',
    rotation: 'rotate-[4deg]',
    bubbleSide: 'top'
  },
  {
    id: 'master',
    image: masterSticker,
    alt: 'Master sticker',
    text: "That’s me, my thesis partner and our prototype for Herlev Hospital. My Human-Centered AI Master’s at DTU shifted my focus to the people who use my code.",
    position: 'bottom-[83%] left-[63%]',
    size: 'w-[clamp(4.5rem,8vw,7rem)]',
    rotation: 'rotate-[-5deg]',
    bubbleSide: 'bottom'
  },
  {
    id: 'dtuCompute',
    image: dtuComputeSticker,
    alt: 'DtuCompute sticker',
    text: "As a TA for Personal Data Interaction, I helped students tackle the world of HCI and data visualization.",
    position: 'bottom-[65%] left-[23%]',
    size: 'w-[clamp(4.5rem,8vw,5rem)]',
    rotation: 'rotate-[4deg]',
    bubbleSide: 'top'
  },
  {
    id: 'basketball',
    image: basketballSticker,
    alt: 'Basketball sticker',
    text: 'Long-time basketball player, full-time Olympiakos fan 🔴⚪.',
    position: 'bottom-[78%] left-[4%]',
    size: 'w-[clamp(4.5rem,8vw,6rem)]',
    rotation: 'rotate-[-20deg]',
    bubbleSide: 'bottom'
  },
]

