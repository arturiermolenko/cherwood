export interface Cherwood {
  id: number;
  name: string;
  name_eng: string;
  price: string;
  description: string;
  description_eng: string;
  length: number;
  width: number;
  height: number;
  material: string;
  material_eng: string;
  coating: string;
  coating_eng: string;
  additional_info: string;
  additional_info_eng: string;
  category: number;
  subcategory: number;
  main_image: string;
  images: Image[];
}

interface Image {
  image: string;
}