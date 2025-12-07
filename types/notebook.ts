export interface NotebookCell {
    cell_type: 'code' | 'markdown' | 'raw';
    metadata: any;
    source: string[] | string;
    execution_count?: number | null;
    outputs?: NotebookOutput[];
    id?: string;
}

export interface NotebookOutput {
    output_type: 'stream' | 'display_data' | 'execute_result' | 'error';
    name?: string;
    text?: string[] | string;
    data?: {
        'text/plain'?: string[];
        'text/html'?: string[];
        'image/png'?: string;
        'application/json'?: any;
        [key: string]: any;
    };
    traceback?: string[];
    execution_count?: number | null;
    ename?: string;
    evalue?: string;
}

export interface NotebookMetadata {
    kernelspec?: {
        display_name: string;
        language: string;
        name: string;
    };
    language_info?: {
        codemirror_mode?: any;
        file_extension?: string;
        mimetype?: string;
        name: string;
        nbconvert_exporter?: string;
        pygments_lexer?: string;
        version?: string;
    };
    [key: string]: any;
}

export interface JupyterNotebook {
    cells: NotebookCell[];
    metadata: NotebookMetadata;
    nbformat: number;
    nbformat_minor: number;
}
