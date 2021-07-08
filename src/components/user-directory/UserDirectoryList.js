import React, { Fragment } from 'react'
import userImage from '../../images/user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'

export default class UserDirectoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    getDateFormat = (date) => {
        let months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];

        let dateNow = new Date(date);
        let yearNow = dateNow.getFullYear();
        let monthNow = months[dateNow.getMonth()];
        let dayNow = dateNow.getDate();
        let daySuffix;/*from   w  w w . j a  v  a 2 s.  c  o m*/

        switch (dayNow) {
            case 1:
            case 21:
            case 31:
                daySuffix = "st";
                break;
            case 2:
            case 22:
                daySuffix = "nd";
                break;
            case 3:
            case 23:
                daySuffix = "rd";
                break;
            default:
                daySuffix = "th";
                break;
        }
        return  dayNow + daySuffix + " "+ monthNow + " "+  yearNow
       
    }
    deleteUser (id) {      
        this.props.deleteUser(id)
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
                            <span className="country-region text-secondary d-block">
                                {`Email: ${this.props.user['Email']}`}
                            </span>
                            <span className="country-region text-secondary d-block ">
                                {`DOB: ${this.getDateFormat(this.props.user['Date of birth'])}`}
                            </span>
                            <span className="country-region text-secondary d-block">
                                {`Country: ${this.props.user['Country']}`}
                            </span>
                        </div>
                        <div className="icon">
                       <span>
                       <FontAwesomeIcon icon={faEdit} />
                       </span>
                      <span className="m-l-6">
                      <FontAwesomeIcon   icon={faTrash} onClick={this.deleteUser.bind(this,this.props.user)} />
                      </span>
                        </div>
                    </div>
                </div>
            </Fragment>


        );
    }

}


