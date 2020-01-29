import exportFromJSON from "export-from-json"

export class tableExport {
  constructor(opts = {
    columns: [],
    data: [],
    fileName: 'export',
    type: 'xls',
    withBOM: false,
  }) {
    this.defOpts = opts
  }

  /**
   * 转换为自定义头部
   * columns = [{label: '姓名', prop: 'name'}]
   */
  dataHandler() {
    let outputData = [];
    this.defOpts.data.map((value) => {
      let obj = {};
      this.defOpts.columns.forEach(element => {
        obj[element.label] = value[element.prop]
      });

      outputData.push(obj);
    });

    return outputData;
  }

  /**
   * 导出text, json, csv, xls文件
   * @param {Object} opts
   * @param {String} opts.fileName 文件名
   * @param {String} opts.type 输出格式 默认为xls文件
   * @param {String} opts.withBOM 将BOM（字节顺序标记）元添加到CSV文件。 Excel在读取UTF8 CSV文件时需要BOM。默认为false。
   */
  export (opts = {}) {
    try {
      let data = this.dataHandler();

      function hasProperty(target, name, defVal) {
        return target.hasOwnProperty(name) ? target[name] : defVal
      }

      exportFromJSON({
        data: data,
        fileName: hasProperty(opts, 'fileName', this.defOpts.fileName),
        exportType: hasProperty(opts, 'type', this.defOpts.type),
        withBOM: hasProperty(opts, 'withBOM', this.defOpts.withBOM)
      });
    } catch (error) {
      console.error(error);
    }
  }
}
