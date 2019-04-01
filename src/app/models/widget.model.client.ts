export class Widget {
    _id: string;
    name: string;
    widgetType: string;
    pageId: string;
    size?: string;
    text?: string;
    url?: any;
    width?: string;
    placeholder?: string;
    rows?: number;
    formatted?: boolean;

    constructor(_id, type, pageId, name, size= '1', text = 'text', width = '100%', url = 'url', placeholder = '', rows = 0, formatted = false) {
        this._id = _id;
        this.widgetType = type;
        this.pageId = pageId;
        this.size = size;
        this.url = url;
        this.width = width;
        this.text = text;
        this.name = name;
        this.placeholder = placeholder;
        this.rows = rows;
        this.formatted = formatted;
    }
}
