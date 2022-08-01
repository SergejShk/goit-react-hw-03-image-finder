import { Component } from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  onHandleClick = e => {
    const alt = e.target.alt;
    const LargeImg = e.target.dataset.source;
    const dataLargeImg = { alt, LargeImg };
    this.props.onHandleClickImage(dataLargeImg);
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.dataEl;
    return (
      <li className={s.ImageGalleryItem} onClick={this.onHandleClick}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onHandleClickImage: PropTypes.func.isRequired,
  dataEl: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
