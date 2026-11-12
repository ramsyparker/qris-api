import { getCollection } from 'astro:content';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from '@fumadocs/astro/source';
import { i18n } from './i18n';

export const source = loader({
  i18n,
  source: toFumadocsSource(await getCollection('docs'), await getCollection('meta')),
  baseUrl: '/docs',
});
