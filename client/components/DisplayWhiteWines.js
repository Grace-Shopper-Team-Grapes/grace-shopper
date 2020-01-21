import React from 'react';
import {connect} from 'react-redux';
import {getWhiteWines} from '../store/whiteWines';
import {Link} from 'react-router-dom'; // make all names links to single product information

class WhiteWines extends React.Component {
  componentDidMount() {
    this.props.getWhiteWines();
  }

  render() {
    if (!this.props.whiteWines) {
      return <h1>loading white wines</h1>;
    } else {
      return (
        <div>
          <h1 align="center">White Wines</h1>
          {this.props.whiteWines.map(whiteWine => {
            if (whiteWine.id >= 13) {
              return (
                <div key={whiteWine.id}>
                  <img
                    src={whiteWine.imageUrl}
                    align="left"
                    alt="Product Image"
                    width="50%"
                    height="50%"
                    onClick={() =>
                      (window.location.href = `../products/${whiteWine.slug}`)
                    }
                  />
                </div>
              );
            }
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    whiteWines: state.whiteWines
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWhiteWines: () => {
      dispatch(getWhiteWines());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhiteWines);
