export class Teacher {
  fullName: string = '';
  avatar?: string = '';
  score?: number = 0;
  activityScopes?: string[] = [];
  experience?: number = 0;
  infographic: string = '';
  email: string = '';
  linkedin?: string = '';
  courses?: string[] = [];
  numbersOfFollowers?: number = 0;
  isFollowed?: boolean = false;
  constructor(
    fullName: string,
    infographic: string,
    email: string,
    avatar: string,
    score: number,
    activityScopes: string[],
    EXP: number,
    linkedin: string,
    courses: string[],
    NOF: number
  ) {
    this.fullName = fullName;
    this.infographic = infographic;
    this.email = email;
    this.avatar = avatar;
    this.score = score;
    this.activityScopes = activityScopes;
    this.experience = EXP;
    this.linkedin = linkedin;
    this.courses = courses;
    this.numbersOfFollowers = NOF;
  }
}
