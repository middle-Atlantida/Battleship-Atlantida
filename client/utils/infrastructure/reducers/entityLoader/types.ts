import {CommonStore} from '../../store';
import {BaseActions} from '../flow';

export interface PaginationOptions {
    start: number; // Попросить бэк поменять на skip или offset
    limit?: number; // На бэке пока игнорируется
    continue?: Nullable<true>;
}

export interface EntityLoaderConfig<D> {
    actions: Partial<BaseActions<D>>;
    mapOptions?: <T extends CommonStore>(state: T, initArgs: Indexed) => Indexed;
    pagination?: {
        isScroll?: boolean;
    };
    mapPagination?: (options: PaginationOptions) => Indexed;
}
