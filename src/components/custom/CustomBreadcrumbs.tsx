import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router';
import React from 'react';

interface Breadcrumb {
  to: string;
  label: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ breadcrumbs: urls }: Props) => {
  return (
    <Breadcrumb className="my-3">
      <BreadcrumbList>
        {urls.map((url, index) => {
          const isLast = index === urls.length - 1;

          return (
            <React.Fragment key={url.to || index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{url.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={url.to}>{url.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
