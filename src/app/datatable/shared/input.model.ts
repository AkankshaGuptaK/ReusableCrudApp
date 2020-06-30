export class InputOption{    
    BaseAPIUrl: string;
    Get?: string;
    edit?: string;
    add?: string;
    delete?: string;
    dataTableOptions: {
        Columns: {
            name?: string;
            data?: string;
            format?: string;
        }[];
    };
    events:{
        edited: Function,
        added: Function,
        deleted: Function,
    };
}