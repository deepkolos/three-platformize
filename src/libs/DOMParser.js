import parseXML from './xml-parser';

function walkTree(node, processer) {
  processer(node);
  node.children.forEach(i => walkTree(i, processer));
}

export class $DOMParser {
  parseFromString(str) {
    const xml = parseXML(str);

    const nodeBase = {
      hasAttribute(key) {
        return this.attributes[key] !== undefined;
      },
      getAttribute(key) {
        return this.attributes[key];
      },
      getElementsByTagName(tag) {
        // 看了dae的文件结构，xml的节点不算庞大，所以还能接受
        const result = [];
        this.childNodes.forEach(i =>
          walkTree(i, node => tag === node.name && result.push(node)),
        );
        return result;
      },
    };

    // patch xml
    walkTree(xml.root, node => {
      node.nodeType = 1;
      node.nodeName = node.name;
      node.style = new Proxy(
        (node.attributes.style || '').split(';').reduce((acc, curr) => {
          if (curr) {
            let [key, value] = curr.split(':');
            acc[key.trim()] = value.trim();
          }
          return acc;
        }, {}),
        {
          get(target, key) {
            return target[key] || '';
          },
        },
      );
      node.textContent = node.content;
      node.childNodes = node.children;
      node.__proto__ = nodeBase;
    });

    const out = {
      documentElement: xml.root,
      childNodes: [xml.root],
    };

    out.__proto__ = nodeBase;

    return out;
  }
}
