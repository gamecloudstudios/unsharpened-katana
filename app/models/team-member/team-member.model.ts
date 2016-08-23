export class TeamMemberModel
{
  first_name: string;
  last_name: string;
  title: string;
  image_url: string;
  linkedin_url: string;
  bio: {
    description: string[],
    credits: string[]
  }

  constructor(first: string, last: string, title: string, bio_desc: string[], img_url?: string, url?: string, bio_creds?: string[])
  {
    this.first_name = first;
    this.last_name = last;
    this.title = title;
    this.bio = {
      description: null,
      credits: null
    };
    this.bio.description = bio_desc;
    this.image_url = img_url;
    this.linkedin_url = url;
    this.bio.credits = bio_creds;
  }
}

export const TEAM_GCS: TeamMemberModel[] = [
  new TeamMemberModel(
    "Aaron",
    "Baker",
    "CEO",
    [
      "Mr. Baker has spent 23 years in the electronic entertainment industry, most recently as the CTO, Asia for Electronic Arts. Prior to joining EA in 2006, Mr. Baker was the CTO at Global VR building an award-winning product team and helping drive the company to over $20M in revenue creating coin-operated games from EA-licensed titles such as Madden NFL Football, Tiger Woods PGA Tour Golf and Need for Speed. Mr. Baker was educated at Stanford University, but left just prior to receiving his degree to start a game studio, WaveQuest, Inc. in 1993 where he built some of the first internet-based real-time multiplayer games."
    ],
    "../../img/aaron.jpg",
    "https://www.linkedin.com/in/ajbakerxml",
    [
      "CTO, FIFA Online (PC). Hit game still generating over $100M/year, primarily in Asia",
      "CTO, NBA Street Online (PC).",
      "Group Technical Director, EA SPORTS World (Web). Cross-sport, cross-platform portal for EA SPORTS fans.",
      "EP, PGA TOUR Golf Arcade (PC). Award-winning, very successful online-connected game.",
      "EP, VR Vortek (VR/PC). One of the first commercially successful VR systems.",
      "EP, Need for Speed Arcade (PC). Award winning sit-down arcade racing game.",
      "EP, Madden NFL Football Arcade (PC).",
      "Producer, Heat Wars (PC). One of the first real-time multiplayer internet games (mid-90s).",
      "Producer, Alien Race (PC). One of the first real-time multiplayer internet and a launch title for Sega's Heat network.",
      "Producer, Bronkie (SNES, PC). Award-winning video game for children with asthma.",
      "Producer, Packy and Marlon (SNES). Award-winning video game for children with diabetes.",
      "Producer, Rex Ronan (SNES). Award-winning video game to teach children about the risks of smoking."
    ]
  ),
  new TeamMemberModel(
    "George",
    "Gaxiola",
    "CTO",
    [
      "Mr. Gaxiola has spent 14 years in the games industry. Prior to joining GameCloud, he was the technical director at Global VR, making sure games like Tiger Woods PGA TOUR Golf and Madden NFL Football lived up to the brand promise, and leading development of the company&#39;s platform, allowing players from around the world to compete for cash prizes. He received his degree in Computer Science from Stanford University."
    ],
    "../../img/george.jpg",
    "https://www.linkedin.com/in/ggaxiola",
    [
      "SE, iMob (iOS). Machine Zone's first game.",
      "TD, PGA TOUR Golf Arcade (PC). Award-winning, very successful online-connected game.",
      "TD, VR Vortek (VR/PC). One of the first commercially successful VR systems.",
      "TD, Need for Speed Arcade (PC). Award winning sit-down arcade racing game.",
      "EP, VR Vortek (VR/PC). One of the first commercially successful VR systems.",
      "EP, Need for Speed Arcade (PC). Award winning sit-down arcade racing game.",
      "TD, Madden NFL Football Arcade (PC).",
      "TD, NASCAR Racing Arcade (PC)."
    ]
  ),
  new TeamMemberModel(
    "Clark",
    "Seydel",
    "VP",
    [
      "Mr. Seydel joined GameCloud after co-Founding the Collective, a platform for entrepreneurs and venture capitalists to achieve social good. Prior to that he was with the Chemol Company where he initiated 30M+ in sales. With a degree from George Mason, and experience at the United Nations Foundation, Mr. Seydel is focused on account management, licensing and business development."
    ],
    "../../img/clark.jpg",
    "https://www.linkedin.com/in/clark-seydel-58618311",
    [
    ]
  ),
];