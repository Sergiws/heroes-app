import { Heart, Trophy, Users, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { HeroStatCard } from './HeroStatCard';
import { useHeroSummary } from '../hooks/useHeroSummary';
import { use } from 'react';
import { FavoriteHeroContext } from '../context/FavoriteHeroContext';

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        cardTitle="Personajes totales"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary.heroCount} Héroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard
        cardTitle="Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div
          className="text-2xl font-bold text-red-600"
          data-testid="favorite-count"
        >
          {favoriteCount}
        </div>
        {/* TODO: tenemos que calcular este porcentaje */}
        <p
          className="text-xs text-muted-foreground"
          data-testid="favorite-percentage"
        >
          {((favoriteCount / summary.totalHeroes) * 100).toFixed(2)}% del total
        </p>
      </HeroStatCard>

      <HeroStatCard
        cardTitle="Más fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Fuerza: {summary.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      <HeroStatCard
        cardTitle="Más inteligente"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Inteligencia: {summary.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};
