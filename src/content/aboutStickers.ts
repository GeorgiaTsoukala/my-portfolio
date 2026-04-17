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
  position: string
  size: string
  rotation: string
  bubbleSide: 'top' | 'bottom'
}

export const aboutStickers: AboutSticker[] = [
  {
    id: 'basketball',
    image: basketballSticker,
    alt: 'Basketball sticker',
    text: 'Love basketball. Olympiakos!',
    position: 'bottom-[78%] left-[2%]',
    size: 'w-[clamp(4.5rem,8vw,6rem)]',
    rotation: 'rotate-[-9deg]',
    bubbleSide: 'bottom'
  },
  {
    id: 'phone',
    image: phoneSticker,
    alt: 'Phone sticker',
    text: 'Always happy to chat! +4591811810',
    position: 'bottom-[5%] left-[12%]',
    size: 'w-[clamp(4.5rem,8vw,7rem)]',
    rotation: 'rotate-[10deg]',
    bubbleSide: 'top'
  },
  {
    id: 'greece',
    image: greeceSticker,
    alt: 'Greece sticker',
    text: "Yep I'm greek. (It's pronounced 'Yeeros' not 'Jairos')",
    position: 'bottom-[8%] left-[82%]',
    size: 'w-[clamp(4.5rem,8vw,9rem)]',
    rotation: 'rotate-[0deg]',
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
    position: 'bottom-[75%] left-[90%]',
    size: 'w-[clamp(4.5rem,8vw,5rem)]',
    rotation: 'rotate-[15deg]',
    bubbleSide: 'top'
  },
  {
    id: 'bike',
    image: bikeSticker,
    alt: 'Bike sticker',
    text: "Based in Copenhagen.",
    position: 'bottom-[72%] left-[40%]',
    size: 'w-[clamp(4.5rem,8vw,25rem)]',
    rotation: 'rotate-[6deg]',
    bubbleSide: 'top'
  },
  {
    id: 'github',
    image: githubSticker,
    alt: 'Github sticker',
    text: "Wanna take a closer look at my projects?",
    link: {
      href: 'https://github.com/GeorgiaTsoukala',
      label: 'Github',
    },
    position: 'bottom-[22%] left-[35%]',
    size: 'w-[clamp(4.5rem,8vw,5.5rem)]',
    rotation: 'rotate-[-6deg]',
    bubbleSide: 'top'
  },
  {
    id: 'dtuCompute',
    image: dtuComputeSticker,
    alt: 'DtuCompute sticker',
    text: "I was a TA.",
    position: 'bottom-[65%] left-[23%]',
    size: 'w-[clamp(4.5rem,8vw,5rem)]',
    rotation: 'rotate-[3deg]',
    bubbleSide: 'top'
  },
  {
    id: 'internship',
    image: internshipSticker,
    alt: 'Internship sticker',
    text: "Yep I'm greek. (It's pronounced 'Yeeros' not 'Jairos')",
    position: 'bottom-[2%] left-[55%]',
    size: 'w-[clamp(4.5rem,8vw,9rem)]',
    rotation: 'rotate-[4deg]',
    bubbleSide: 'top'
  },
  {
    id: 'master',
    image: masterSticker,
    alt: 'Master sticker',
    text: "master at DTU 🎓",
    position: 'bottom-[80%] left-[63%]',
    size: 'w-[clamp(4.5rem,8vw,7rem)]',
    rotation: 'rotate-[-5deg]',
    bubbleSide: 'bottom'
  },
]

