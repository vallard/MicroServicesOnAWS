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

 
  uploadPhoto = (e) => {
    var f = e.target;
    if (f.files[0]) {
      let data = new FormData();
      data.append('file', f.files[0]);
      data.append('filename', f.files[0].name);
      this.props.upPhoto(data);
    }
  }

  deletePhoto = (e) => {
    const po = this.props.photos[e.target.id]
    const p = po['_id'].$oid
    this.props.delPhotos(p);
  }

  render() {
    return (
    <>
      <Navi user={this.props.user} signOutFunc={this.props.signOut} />
      <Home photos={this.props.photos} 
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
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  getPhotos: () => dispatch(getPhotos()),
  delPhotos: (id) => dispatch(delPhoto(id)),
  upPhoto: (data) => dispatch(upPhoto(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
