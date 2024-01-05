import { Cherwood } from "./helpers/Cherwood"; 
import cherwoodData from "../src/data (4).json";

import { Option } from "./helpers/Options";
import options from "../src/options.json";

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getCherwood(): Promise<Cherwood[]> {
  return wait(500)
    .then(() => {
      const jsonData = cherwoodData as Cherwood[];
      return Promise.resolve(jsonData);
    });
}

export async function getOptions(): Promise<Option[]> {
  return wait(500)
    .then(() => {
      const jsonData2 = options as Option[];
      return Promise.resolve(jsonData2);
    });
}