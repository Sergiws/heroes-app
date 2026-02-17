import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { JSX, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  cardTitle: string;
  icon: JSX.Element;
}

export const HeroStatCard = ({ cardTitle, icon, children }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
