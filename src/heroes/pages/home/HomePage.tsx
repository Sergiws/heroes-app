import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Heart } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { usePaginatedHeroes } from '@/heroes/hooks/usePaginatedHeroes';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const handleTabChange = (tab: string, category: string) => {
    setSearchParams((prev) => {
      prev.set('tab', tab);
      prev.set('category', category);
      prev.set('page', '1');
      return prev;
    });
  };

  // usePaginatedHeroes(+page, +limit)
  const { data: heroesResponse } = usePaginatedHeroes(+page, +limit, category);

  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra superhéroes y villanos"
        />

        <CustomBreadcrumbs breadcrumbs={[{ to: '/', label: 'Inicio' }]} />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              className="cursor-pointer"
              value="all"
              onClick={() => handleTabChange('all', 'all')}
            >
              Todos los personajes ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => handleTabChange('favorites', '')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Heart className="h-4 w-4" />
              Favoritos ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => handleTabChange('heroes', 'hero')}
              className="cursor-pointer"
            >
              Héroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleTabChange('villains', 'villain')}
              className="cursor-pointer"
            >
              Villanos ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="villains">
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
