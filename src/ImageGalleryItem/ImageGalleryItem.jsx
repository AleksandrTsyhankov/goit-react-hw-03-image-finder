
import React, {Component} from 'react';
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';


class ImageGalleryItem extends Component {
    state = {
        showModal: false,
        url: null
    }

    toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

    onGalleryItemClick = (e) => {
        this.setState({ url: e.currentTarget.dataset.url });
        
        this.toggleModal();
}

    render() {
        const { showModal, url } = this.state;
        const { images } = this.props;

        return (
            <>
                {images.map(image => (
                    <li className={s.ImageGalleryItem} key={image.id} onClick={this.onGalleryItemClick} id={image.id} data-url={image.largeImageURL}>
                        <img src={image.webformatURL} alt={image.id} className={s.ImageGalleryItemImage} />
                    </li>))}
                {showModal && <Modal onClose={this.toggleModal} url={url}/> }
            </>
            );    
    }
  }

export default ImageGalleryItem;