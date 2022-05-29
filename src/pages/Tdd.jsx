import { Component } from "react";

import { preLoadWrapper } from "utils/preLoad";

@preLoadWrapper(() => ({ props: { a: 1, b: 2, c: 3, d: 4, e: [1, 2, 3, 4, 5, 6] } }))
export default class Tdd extends Component {
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
      </div>
    );
  }
}
