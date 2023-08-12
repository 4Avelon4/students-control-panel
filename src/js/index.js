import '@/style/style.scss';

import { renderTable } from './table/renderTable';
import { filteredTable } from './table/filterTable';
import panelInteraction from './interaction/panelInteraction';

panelInteraction();
renderTable();
filteredTable();
