import React from 'react';
import {connect} from 'react-redux';
import {getRedWines} from '../store/redWines';
import {Link} from 'react-router-dom'; // make all names links to single product information

class RedWines extends React.Component {
  componentDidMount() {
    this.props.getRedWines();
  }

  render() {
    if (!this.props.redWines) {
      return <h1>loading red wines</h1>;
    } else {
      console.log(this.props);
      return (
        <div>
          <h1 align="center">Red Wines</h1>
          {this.props.redWines.map(redWine => {
            if (redWine.id < 5) {
              return (
                <div key={redWine.id}>
                  <img
                    src={redWine.imageUrl}
                    align="left"
                    alt="Product Image"
                    width="50%"
                    height="50%"
                    onClick={() =>
                      (window.location.href = `../products/${redWine.slug}`)
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
    redWines: state.redWines
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRedWines: () => {
      dispatch(getRedWines());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedWines);
