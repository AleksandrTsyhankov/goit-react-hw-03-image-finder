
import React, { Component } from 'react';
import Spinner from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import api from '../services/api-services';

const KEY = '22516164-f116a0b1efd134847fc29d1d4';

class FetchAPI extends Component {
  state = {
      images: null,
      pageNum: 1,
      loading: false,
      empty: false,
      error: null,
      status: 'start'
  }
    
    componentDidUpdate(prevProps, prevState) {
        const { searchValue } = this.props;
        const { pageNum } = this.state;

        const prevSearchValue = prevProps.searchValue;
        const currentSerchValue = this.props.searchValue;

        const prevPageNum = prevState.pageNum;
        const currentPageNum = this.state.pageNum;
        

        if (prevSearchValue !== currentSerchValue) {
          this.setState({ loading: true, empty: false })
          
            api.fetchAPI(searchValue, pageNum, KEY)
              .then(imgsArr => {
                  if (imgsArr.length <= 0) {
                      return this.setState({ empty: true, images: null });

                  } else {
                      this.setState({ images: imgsArr })
              }})
              .catch(error => this.setState({ error}))
              .finally(this.setState({ loading: false }))
        }
        
        if (prevPageNum !== currentPageNum) {
        this.setState({ loading: true, empty: false })

            api.fetchAPI(searchValue, pageNum, KEY)
                .then(imgsArr => {
                    if (imgsArr.length <= 0) {
                        return this.setState({ empty: true, images: null });
                    } else {
                        this.setState({ images: [...this.state.images, ...imgsArr] })
                        return;
                    }
                })
                .catch(error => this.setState({ error }))
                .finally(() => {
                    this.setState({ loading: false });
            
                    window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: 'smooth',
                        });
                    })
        }
    }

    onLoadMoreButtonClick = () => {
        return this.setState(prevState => ({ pageNum: prevState.pageNum + 1 }));
    }

    render() { 
        const { images, loading, error, empty } = this.state;

        return (
            <>
            { error && <h1>{error.message}</h1> }
            { empty && <div style={{marginLeft: '15px'}}>{`Sorry, we cant find anything about ${this.props.searchValue}`}</div> }
            { loading && <Spinner /> }
            { images && !empty && (<ImageGallery images={images} />) }
            { images && images.length > 0 &&  !empty && (<Button onClick={this.onLoadMoreButtonClick} />) }
            </>         
  );
  }
}

export default FetchAPI;