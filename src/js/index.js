// eslint-disable-next-line import/no-unresolved
import '@/style/style.scss';

import { renderTable } from './table/renderTable';
import { filteredTable } from './table/filterTable';
import panelInteraction from './interaction/panelInteraction';

panelInteraction();
renderTable();
filteredTable();
