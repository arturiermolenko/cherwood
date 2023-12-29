import { Cherwood } from "./helpers/Cherwood"; 
import cherwoodData from "../src/data (4).json";

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