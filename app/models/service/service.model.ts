export class GCS_ServiceModel
{
  headline: string;
  img_src: string;
  content: string;

  constructor(headline: string, img_src: string, content: string)
  {
    this.headline = headline;
    this.img_src = img_src;
    this.content = content;
  }
}

export const SERVICES_HEADLINE = "We provide:";
export const SERVICES: GCS_ServiceModel[] = [
  new GCS_ServiceModel(
    'Strategy',
    '../../img/strategy.png',
    'A well designed strategy arms us with everything we need to begin the design and development of a project. GameCloud applies 50 plus years of combined experience to tailor a code to market strategy that will enable us to reach the desired results.'
  ),
  new GCS_ServiceModel(
    'Tech',
    '../../img/tech.png',
    'Our team of committed engineers specialize in all the major web and mobile platforms. We love working side by side with our clients internal technology teams when the opportunity is there.'
  ),
  new GCS_ServiceModel(
    'Design',
    '../../img/design.png',
    'It is our goal to keep users coming back. With a focus on usability, navigation and content presentation it keeps the user engaged beyond the initial acquisition of the user. We at GameCloud have mastered this after working on multiple projects that have successfully achieved more than 5 million installs.'
  )
];
