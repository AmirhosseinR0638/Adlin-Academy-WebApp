export class Course {
  id: number = 0;
  title: string = '';
  banner?: string = '';
  mainPrice: number = 0;
  priceWithDiscount?: number = 0;
  discountPercent?: number = 0;
  duration: number = 0;
  satisfaction?: number = 0;
  description: string = '';
  teachers: string[] = [];
  categories?: string[] = [];
  topics?: string[] = [];
  // comments? = [{ sender: '', comment: '', date: '' }];
  constructor(
    ID: number,
    title: string,
    price: number,
    discount: number,
    duration: number,
    teacher: string[],
    banner: string,
    description: string,
    satisfaction: number,
    categories: string[]
  ) {
    this.id = ID;
    this.title = title;
    this.mainPrice = price;
    this.discountPercent = discount;
    this.duration = duration;
    this.teachers = teacher;
    this.banner = banner;
    this.description = description;
    this.satisfaction = satisfaction;
    this.categories = categories;
    this.priceWithDiscount = price - (price * discount/100);
  }
}
