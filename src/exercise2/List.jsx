import React from "react";
import ListItem from "./ListItem";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      availableHeight: 0,
      scrollTop: 0
    };
  }

  componentDidMount() {
    console.log("clientHeight", this.wrapper.clientHeight);

    this.setState({
      availableHeight: this.wrapper.clientHeight
    });
  }

  handleScroll = event => {
    this.setState({
      scrollTop: event.target.scrollTop
    });
  };

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = rowHeight * numRows;

    const { availableHeight, scrollTop } = this.state;
    const scrollBottom = scrollTop + availableHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20);
    const endIndex = Math.min(
      numRows,
      Math.ceil(scrollBottom / rowHeight) + 20
    );

    const items = [];

    let index = startIndex;
    while (index < endIndex) {
      items.push(<ListItem index={index} />);
      index++;
    }

    return (
      <div
        style={{ height: "100%", overflowY: "scroll" }}
        ref={node => (this.wrapper = node)}
        onScroll={this.handleScroll}
      >
        <ol
          style={{
            paddingTop: startIndex * rowHeight,
            pointerEvents: "none",
            height: totalHeight
          }}
        >
          {items}
        </ol>
      </div>
    );
  }
}

export default List;
