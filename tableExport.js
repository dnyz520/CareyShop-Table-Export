import exportFromJSON from "export-from-json"

export class TableExport {
  constructor(columns = [], data = [], replace = {}, fileName = 'export', type = 'xls', withBOM = false) {
    this.columns = columns;
    this.data = data;
    this.replace = replace;
    this.fileName = fileName;
    this.type = type;
    this.withBOM = withBOM;
  }

  /**
   * 转换为自定义头部
   * columns = [{label: '姓名', prop: 'name'}]
   */
  dataHandler() {
    let outputData = [];
    this.data.map((value) => {
      let obj = {};
      this.columns.forEach(element => {
        obj[element.label] = this.dataReplace(element.prop, value);
      });

      outputData.push(obj);
    });

    return outputData;
  }

  /**
   * 数据替换
   * replace = {key: {value1: data, value2: data}}
   */
  dataReplace(key, value) {
    if (!this.replace.hasOwnProperty(key)) {
      return value[key];
    }

    let val = value[key];
    let valueMap = this.replace[key];

    if (valueMap.hasOwnProperty(val)) {
      return valueMap[val];
    }

    return val;
  }

  /**
   * 导出text, json, csv, xls文件
   */
  export() {
    try {
      exportFromJSON({
        data: this.dataHandler(),
        fileName: this.fileName,
        exportType: this.type,
        withBOM: this.withBOM
      });
    } catch (error) {
      console.error(error);
    }
  }
}
