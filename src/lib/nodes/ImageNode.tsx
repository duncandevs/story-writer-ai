import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    NodeKey,
  } from "lexical";
  
  export const $createImageNode = ({
    alt,
    height,
    maxWidth = 800,
    src,
    width,
  }: {
    alt: string;
    height?: number;
    maxWidth?: number;
    src: string;
    width?: number | string;
  }) => {
    return new ImageNode({ alt, height, maxWidth, src, width });
  };
  
  const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
    if (domNode instanceof HTMLImageElement) {
      const { src, alt } = domNode;
      const node = $createImageNode({ src, alt: alt });
      return { node };
    }
    return null;
  };
  
  const IMAGE_NODE_TYPE = "image_node";

  export class ImageNode extends DecoratorNode<React.ReactNode> {
    __src: string;
    __alt: string;
    __height: "inherit" | number;
    __width: "inherit" | number | string;
    __maxWidth: number;
  
    constructor({
      src,
      alt,
      maxWidth,
      width,
      height,
      key,
    }: {
      src: string;
      alt: string;
      maxWidth: number;
      width?: "inherit" | number | string;
      height?: "inherit" | number;
      key?: NodeKey;
    }) {
      super(key);
      this.__alt = alt;
      this.__width = width || "inherit";
      this.__height = height || "inherit";
      this.__maxWidth = maxWidth;
      this.__src = src;
    }
  
    static getType(): string {
      return IMAGE_NODE_TYPE;
    }
  
    static clone(_node: ImageNode): ImageNode {
      return new ImageNode({
        alt: _node.__alt,
        src: _node.__src,
        height: _node.__height,
        width: _node.__width,
        maxWidth: _node.__maxWidth,
      });
    }
  
    decorate(): React.ReactNode {
      return (
        <img
          src={this.__src}
          alt={this.__alt}
          style={{
            width: this.__width,
            height: this.__height,
            maxWidth: this.__maxWidth,
            margin: "auto",
            marginTop: 16,
            marginBottom: 16,
          }}
        />
      );
    }
  
    createDOM(): HTMLElement {
      const span = document.createElement("span");
      return span;
    }
  
    exportDOM(): DOMExportOutput {
      const image = document.createElement("img");
      image.setAttribute("src", this.__src);
      image.setAttribute("alt", this.__alt);
  
      return { element: image };
    }

    exportJSON() {
      return {
        type: IMAGE_NODE_TYPE,
        version: 1,
        src: this.__src,
        alt: this.__alt,
        height: this.__height,
        width: this.__width,
        maxWidth: this.__maxWidth,
      };
    }
  
    static importDOM(): DOMConversionMap | null {
      return {
        img: (node: Node) => {
          return { conversion: convertImageElement, priority: 0 };
        },
      };
    }

    static importJSON(serializedNode: any): ImageNode {
      const { src, alt, height, width, maxWidth } = serializedNode;
      return $createImageNode({ src, alt, height, width, maxWidth });
    }
  }