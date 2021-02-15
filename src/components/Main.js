import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table table-borderles text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tr>
            <td>
              {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
              mDAI
            </td>
            <td>
              {window.web3.utils.fromWei(this.props.dappTokenBalance, "Ether")}{" "}
              DAPP
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Main;
