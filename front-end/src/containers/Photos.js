import React, { Component } from 'react';
import {connect} from 'react-redux';
import Home from '../components/Home';
import Navi from '../components/Navi';
import Footer from '../components/Footer';
import {
  delPhoto,
  getPhotos,
  signOut,
  upPhoto,
} from '../redux/actions';

class Photos extends Component {

  componentDidMount() {
    this.props.getPhotos()
  } 

  uploadPhoto = (e) => {
    var f = e.target;
    if (f.files[0]) {
      const file = f.files[0]
      this.props.upPhoto(file);
      /*data.append('name', 'Image Upload');
      data.append('file', f.files[0]);
      data.append('filename', f.files[0].name);
      this.props.upPhoto(data);*/
    }
  }

  deletePhoto = (e) => {
    const photoId = e.target.id
    this.props.delPhotos(photoId);
  }

  render() {
    return (
    <>
      <Navi user={this.props.user} signOutFunc={this.props.signOut} errors={this.props.photoErrors} />
      <Home photos={this.props.photos} 
        loading={this.props.photosLoading}
        uploadFunc={this.uploadPhoto}
        delFunc={this.deletePhoto}
      />
      <Footer/>
    </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.Auth.user,
  photos: state.Photos.photos,
  photoErrors: state.Photos.error,
  photosLoading: state.Photos.loading,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  getPhotos: () => dispatch(getPhotos()),
  delPhotos: (id) => dispatch(delPhoto(id)),
  upPhoto: (data) => dispatch(upPhoto(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
