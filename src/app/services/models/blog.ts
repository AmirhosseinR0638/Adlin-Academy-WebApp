export class Blog {
  id: number = 0;
  title: string = '';
  banner?: string = '';
  text: string = '';
  writer: string = '';
  images?: string[] = [];
  durationOfReading?: number = 0;
  dateOfPublication: string = '';
  categories?: string[] = [];
  viewer?: number = 0;
  liked?: number = 0;
  disliked?: number = 0;
  constructor(
    id: number,
    title: string,
    banner: string,
    text: string,
    writer: string,
    DOP: string,
    DOR: number,
    view: number,
    like: number,
    dislike: number,
    images: string[],
    category: string[]
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.banner = banner;
    this.writer = writer;
    this.dateOfPublication = DOP;
    this.durationOfReading = DOR;
    this.viewer = view;
    this.liked = like;
    this.disliked = dislike;
    this.images = images;
    this.categories = category;
  }
}
