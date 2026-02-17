import { heroApi } from '../api/hero.api';
import type { Hero } from '../interfaces/hero.interface';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (slug: string) => {
  const { data: hero } = await heroApi.get<Hero>(`/${slug}`);

  return {
    ...hero,
    image: `${VITE_API_URL}/images/${hero.image}`,
  };
};
