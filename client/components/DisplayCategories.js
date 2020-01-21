import React from 'react';
import {connect} from 'react-redux';
import {getAllCategories} from '../store/categories';
import {Link} from 'react-router-dom'; // make all names links to single product information

class AllCategories extends React.Component {
  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    if (!this.props.categories) {
      return <h1>loading categories</h1>;
    } else {
      return (
        <div align="center">
          <h1>
            <Link to="/categories">Categories</Link>
          </h1>

          {this.props.categories.map(category => {
            return (
              <div key={category.id}>
                <img
                  src={category.imageUrl}
                  width="35%"
                  height="35%"
                  onClick={() =>
                    (window.location.href = `./categories/${category.slug}`)
                  }
                />
                <ul>
                  <li>
                    <Link to={'/categories/' + category.slug}>
                      {category.name}
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => {
      dispatch(getAllCategories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);
