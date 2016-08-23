export class ProjectModel
{
  title: string;
  platform: string;
  img_src: string;
  description: string;

  constructor(title: string, img_src: string, description: string, platform?: string)
  {
    this.title = title;
    this.img_src = img_src;
    this.description = description;
    this.platform = platform;
  }
}

export const PROJECTS: ProjectModel[] = [
  new ProjectModel(
    `ShowStopper Basketball`,
    '../../img/showstopper.jpg',
    `Over 5M installs. iOS was distributed by DeNA. Sequel is under development to be self-published across FB, iOS, Android, WinMo, and Steam.`,
    `Facebook and iOS`
  ),
  new ProjectModel(
    `Pocket Gridiron`,
    '../../img/gridiron.jpg',
    `American football game published by DeNA.`,
    `iOS and Android`
  ),
  new ProjectModel(
    `Epic Goal`,
    '../../img/epicgoal.jpg',
    `GameCloud's first game and the #3 overall Facebook game for 2010 according to Inside Social Games. Published by Watercooler (now Kabam).`
  ),
  new ProjectModel(
    `Mutasia`,
    '../../img/educational.jpg',
    `Educational game platform based on the common core curriculum in the US.`,
    `Flash`
  ),
  new ProjectModel(
    `Nightclub City`,
    '../../img/nightclub.jpg',
    `Port of the Facebook game to DeNA's new platform.`,
    `iOS and Android`
  ),
  new ProjectModel(
    `One Direction Connect`,
    '../../img/onedirection.jpg',
    `Platform and technology for scanning codes on retail merchandise to unlock items in the game.`,
    `Platform`
  )
]
