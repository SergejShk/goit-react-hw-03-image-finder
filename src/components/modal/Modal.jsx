import { Component } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    window.addEventListener('keydown', this.onClicEscape);
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';

    window.removeEventListener('keydown', this.onClicEscape);
  }

  onOverlayClick = e => {
    e.target === e.currentTarget && this.props.toogleModal();
  };

  onClicEscape = e => {
    if (e.code === 'Escape') {
      this.props.toogleModal();
    }
  };

  render() {
    const { LargeImg, alt } = this.props.dataLargeImage;
    return (
      <div className={s.Overlay} onClick={this.onOverlayClick}>
        <div className={s.Modal}>
          <img src={LargeImg} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toogleModal: PropTypes.func,
  dataLargeImage: PropTypes.shape({
    LargeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};

export default Modal;
