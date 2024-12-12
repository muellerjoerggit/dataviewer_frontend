export interface LogLevels {
    critical: [],
    warning: [],
    notice: [],
    info: [],
    error: [],
    debug: []
}

export interface LogItem {
    component: string,
    data: any
}

export interface CommonLogItem extends LogItem {
    data: CommonLogItemData,
}

export interface CommonLogItemData {
    title: string,
    message: string,
    rawLogs: [],
    dateTime: string,
    level: string
}

