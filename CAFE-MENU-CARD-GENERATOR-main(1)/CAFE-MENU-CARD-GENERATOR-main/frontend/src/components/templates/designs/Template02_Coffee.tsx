import React from 'react';
import BaseTemplate, { templateMeta as baseMeta } from './Template01_VintageCoffee';
import { TemplateProps, TemplateMeta } from '../registry';
import { filterByCategory } from '../utils/filterByCategory';

export const templateMeta: TemplateMeta = {
    ...baseMeta,
    id: 13,
    name: `${baseMeta.name.split(' ')[0]} Coffee Menu`,
};

export default function Template01_Coffee({ data }: TemplateProps) {
    const filtered = filterByCategory(data, 'Coffee');
    return <BaseTemplate data={filtered} />;
}