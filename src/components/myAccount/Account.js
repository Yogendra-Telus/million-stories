import React from 'react';
import { connect } from 'react-redux';
import VideoTumbnail from '../../assets/images/extra-images/thumbnail.jpg';
import * as actions from '../../store/actions/HomeActions';

const MyAccount = () => (
  <>
    <section className="my_account_wrapper">
      <div className="row">
        <div className="col-md-3 account_detail">
          <h5>My Account Info</h5>
          <h3>Jamie Jameson</h3>
          <p>jamie@gmail.com</p>
          <button className="btn dark-transparent-btn">Edit Info</button>
        </div>
        <div className="col-md-9">
          <div className="container account_tab">
            <ul id="tabs" className="nav nav-tab" role="tablist">
              <li className="nav-item">
                <a id="tab-A" href="#pane-A" className="nav-link" data-toggle="tab" role="tab">
                  <span>
                    <i className="fas fa-photo-video" />
                  </span>
                  <span>My Playlists</span>
                </a>
              </li>
              <li className="nav-item">
                <a id="tab-B" href="#pane-B" className="nav-link active" data-toggle="tab" role="tab">
                  <span>
                    <i className="far fa-heart" />
                  </span>
                  <span>My Favorites</span>
                </a>
              </li>
              <li className="nav-item">
                <a id="tab-C" href="#pane-C" className="nav-link" data-toggle="tab" role="tab">
                  <span>
                    <i className="far fa-plus-square" />
                  </span>
                  <span>My Subscriptions</span>
                </a>
              </li>
              <li className="nav-item">
                <a id="tab-d" href="#pane-d" className="nav-link" data-toggle="tab" role="tab">
                  <span>
                    <i className="fas fa-history" />
                  </span>
                  <span>My Subscriptions</span>
                </a>
              </li>
            </ul>

            <div id="content" className="tab-content" role="tablist">
              <div id="pane-A" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-A">
                <div
                  id="collapse-A"
                  className="collapse"
                  data-parent="#content"
                  role="tabpanel"
                  aria-labelledby="heading-A"
                >
                  <div className="card-body">
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="pane-B" className="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-B">
                <div
                  id="collapse-B"
                  className="collapse show"
                  data-parent="#content"
                  role="tabpanel"
                  aria-labelledby="heading-B"
                >
                  <div className="card-body">
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O width-100">
                        <div className="image_wrapper_fav">
                          <img src={VideoTumbnail} alt="" />
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12 width-100">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O width-100">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12 width-100">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row main_content">
                      <div className="col-md-4 col-xs-12 pad_O">
                        <div className="image_wrapper">
                          <img src={VideoTumbnail} alt="" />
                          <span>3 Videos</span>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-12">
                        <div className="content_wrapper">
                          <h4>Videos for my class presentation</h4>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-paper-plane" />
                            Share
                          </button>
                          <button className="btn dark-transparent-btn">
                            <i className="far fa-edit" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="pane-C" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
                <div className="card-header" role="tab" id="heading-C">
                  <h5 className="mb-0">
                    <a
                      className="collapsed"
                      data-toggle="collapse"
                      href="#collapse-C"
                      aria-expanded="false"
                      aria-controls="collapse-C"
                    >
                      Collapsible Group Item C
                    </a>
                  </h5>
                </div>
                <div
                  id="collapse-C"
                  className="collapse"
                  role="tabpanel"
                  data-parent="#content"
                  aria-labelledby="heading-C"
                >
                  <div className="card-body">[Tab content C]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

function mapStateToProps(state) {
  return {
    news: state.HomeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadNews: () => dispatch(actions.loadNews()),
    updateNews: id => dispatch(actions.updateNews(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
