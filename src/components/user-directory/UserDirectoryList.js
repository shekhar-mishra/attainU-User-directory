import React, { Fragment } from 'react'
import userImage from '../../images/user.jpg'
export default class UserDirectoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <Fragment>
                <div className="col-sm-6 col-md-6 country-card">
                    <div className="user-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 ">
                        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
                            <img
                                src={userImage}
                                alt="avatar"
                                className="d-block h-100"
                            />
                        </div>
                        <div className="px-3">
                            <span className="country-name text-dark d-block font-weight-bold">
                                {`Name: ${this.props.user['Full Name']}`}
                            </span>
                            <span className="country-region text-secondary d-block text-uppercase">
                                {`Email:${this.props.user['Email']}`}
                            </span>
                            <span className="country-region text-secondary d-block text-uppercase">
                                {`DOB:${this.props.user['Date of birth']}`}
                            </span>
                            <span className="country-region text-secondary d-block text-uppercase">
                                {`Country:${this.props.user['Country']}`}
                            </span>
                        </div>
                    </div>
                </div>
            </Fragment>


        );
    }

}


