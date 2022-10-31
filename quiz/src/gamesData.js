import gta2Cover from './assets/images/gta2-cover.jpg';
import gta2Img from './assets/images/gta2-landscape.jpg';
import gta2Audio from './assets/audio/gta2.mp3';
import gtaLondonCover from './assets/images/gta-london-cover.jpg';
import gtaLondonImg from './assets/images/gta-london-landscape.jpg';
import gtaLondonAudio from './assets/audio/gta-london.mp3';
import gta3Cover from './assets/images/gta3-cover.jpg';
import gta3Img from './assets/images/gta3-landscape.jpg';
import gta3Audio from './assets/audio/gta3.mp3';
import gtaVCCover from './assets/images/gta-vc-cover.webp';
import gtaVCImg from './assets/images/gta-vc-landscape.jpeg';
import gtaVCAudio from './assets/audio/gta-vc.mp3';
import gtaSACover from './assets/images/gta-sa-cover.jpg';
import gtaSAImg from './assets/images/gta-sa-landscape.png';
import gtaSAAudio from './assets/audio/gta-sa.mp3';
import gta4Cover from './assets/images/gta4-cover.jpg';
import gta4Img from './assets/images/gta4-landscape.jpg';
import gta4Audio from './assets/audio/gta4.mp3';
import nfs1Cover from './assets/images/nfs1-cover.jpg';
import nfs1Img from './assets/images/nfs1-landscape.jpg';
import nfs1Audio from './assets/audio/nfs1.mp3';
import nfs2Cover from './assets/images/nfs2-cover.jpg';
import nfs2Img from './assets/images/nfs2-landscape.jpg';
import nfs2Audio from './assets/audio/nfs2.mp3';
import forzaCover from './assets/images/forza-cover.webp';
import forzaImg from './assets/images/forza-landscape.jpg';
import forzaAudio from './assets/audio/forza.mp3';
import burnoutCover from './assets/images/burnout-cover.jpg';
import burnoutImg from './assets/images/burnout-landscape.jpg';
import burnoutAudio from './assets/audio/burnout.mp3';
import crashTeamRacingCover from './assets/images/crash-team-racing-cover.jpg';
import crashTeamRacingImg from './assets/images/crash-landscape.jpg';
import crashTeamRacingAudio from './assets/audio/crash.mp3';
import projectCarsCover from './assets/images/project-cars-cover.jpeg';
import projectCarsImg from './assets/images/project-cars-landscape.webp';
import projectCarsAudio from './assets/audio/project-cars.mp3';

const gameData = [
  {
    name: 'Grand Theft Auto 2',
    category: 'warm-up',
    cover: gta2Cover,
    image: gta2Img,
    audio: gta2Audio,
    description: 'Developed by DMA Design in October 1999. Set within a retrofuturistic metropolis known as "Anywhere City", the game focuses on players taking the role of a criminal as they roam an open world, conducting jobs for various crime syndicates and having free rein to do whatever they wish to achieve their goal.',
  },
  {
    name: 'Grand Theft Auto: London',
    category: 'warm-up',
    cover: gtaLondonCover,
    image: gtaLondonImg,
    audio: gtaLondonAudio,
    description: 'An expansion pack for the 1997 game Grand Theft Auto. The expansion takes place in a fictionalised version of London during the 1960s. Players assume the role of a criminal who works for several London-based criminal syndicates, and complete levels by achieving a set score, within an open-world environment.',
  },
  {
    name: 'Grand Theft Auto III',
    category: 'warm-up',
    cover: gta3Cover,
    image: gta3Img,
    audio: gta3Audio,
    description: 'Is a 2001 action-adventure game set within the fictional Liberty City (loosely based on New York City), the story follows Claude, a silent protagonist who, after being betrayed and left for dead by his girlfriend during a robbery, embarks on a quest for revenge that leads him to become entangled in a world of crime, drugs, gang warfare, and corruption.',
  },
  {
    name: 'Grand Theft Auto: Vice City',
    category: 'warm-up',
    cover: gtaVCCover,
    image: gtaVCImg,
    audio: gtaVCAudio,
    description: 'Is a 2002 action-adventure game set in 1986 within the fictional Vice City (based on Miami and Miami Beach), the story follows mobster Tommy Vercetti\'s rise to power after being released from prison and becoming caught up in an ambushed drug deal. He slowly builds a criminal empire by seizing power from other criminal organisations in the city.',
  },
  {
    name: 'Grand Theft Auto: San Andreas',
    category: 'warm-up',
    cover: gtaSACover,
    image: gtaSAImg,
    audio: gtaSAAudio,
    description: 'Is a 2004 action-adventure game. The story follows former gangster Carl "CJ" Johnson, who returns home following his mother\'s murder and is drawn back into his former gang and a life of crime while clashing with corrupt authorities and powerful criminals. Carl\'s journey takes him across the fictional U.S. state of San Andreas, which is heavily based on California and Nevada and encompasses three major cities: Los Santos (inspired by Los Angeles), San Fierro (San Francisco) and Las Venturas (Las Vegas).',
  },
  {
    name: 'Grand Theft Auto IV',
    category: 'warm-up',
    cover: gta4Cover,
    image: gta4Img,
    audio: gta4Audio,
    description: 'Is a 2008 action-adventure game set within the fictional Liberty City, based on New York City, the story follows Eastern European war veteran Niko Bellic and his attempts to escape his past while under pressure from high-profile criminals. The open world design lets players freely roam Liberty City, consisting of three main islands, and the neighbouring state of Alderney, which is based on New Jersey.',
  },
  {
    name: 'Need for Speed: Underground',
    category: 'racing',
    cover: nfs1Cover,
    image: nfs1Img,
    audio: nfs1Audio,
    description: 'Is a 2003 racing video game. It was the first game in the series to offer a career mode featuring a storyline, and a garage mode that allowed players to fully customize their cars with a large variety of brand-name performance and visual upgrades. All races take place in the fictional Olympic City.',
  },
  {
    name: 'Need for Speed: Underground 2',
    category: 'racing',
    cover: nfs2Cover,
    image: nfs2Img,
    audio: nfs2Audio,
    description: 'Is a 2004 racing video game. The game entails tuning cars for street races, resuming the Need for Speed: Underground storyline. Need for Speed: Underground 2 provides several new features, such as broader customization, new methods of selecting races, set in a city known as Bayview. Brooke Burke is the voice of Rachel Teller, the person who guides the player throughout the game.',
  },
  {
    name: 'Forza Horizon 5',
    category: 'racing',
    cover: forzaCover,
    image: forzaImg,
    audio: forzaAudio,
    description: 'Is a 2021 racing video game developed by Playground Games and published by Xbox Game Studios. It is the fifth Forza Horizon title and twelfth main instalment in the Forza series. The game is set in a fictionalised representation of Mexico. The game received critical acclaim and became a commercial success upon release.',
  },
  {
    name: 'Burnout Paradise',
    category: 'racing',
    cover: burnoutCover,
    image: burnoutImg,
    audio: burnoutAudio,
    description: 'Is a 2008 racing video game set in the fictional "Paradise City", an open world in which players can compete in several types of races. Players can also compete online, which includes additional game modes, such as "Cops and Robbers". Several free game updates introduce new features such as a time-of-day cycle and motorcycles.',
  },
  {
    name: 'Crash Team Racing',
    category: 'racing',
    cover: crashTeamRacingCover,
    image: crashTeamRacingImg,
    audio: crashTeamRacingAudio,
    description: 'Is a 1999 kart racing video game. The game\'s story focuses on the efforts of Crash Bandicoot, Doctor Neo Cortex, and other ragtag team of characters in the Crash Bandicoot series, who must race against the egomaniacal Nitros Oxide to save the Earth from destruction.',
  },
  {
    name: 'Project Cars',
    category: 'racing',
    cover: projectCarsCover,
    image: projectCarsImg,
    audio: projectCarsAudio,
    description: 'Is a motorsport racing simulator released in 2015. There are 74 drivable cars, over 30 unique locations with at least 110 different courses, of which 23 are real, with the remainder being fictional. For licensing reasons, some tracks are codenamed using their geographic location.',
  },
];

export default gameData;
