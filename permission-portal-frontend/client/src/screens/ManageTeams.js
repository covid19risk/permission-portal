import React, { useState } from 'react'
import * as ROLES from '../constants/roles'
import { withAuthorization } from '../components/Session'
import { compose } from 'recompose'
import store from '../store'
import addMember from '../../assets/add-member.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'
import '../../Styles/screens/manage_teams.scss'
import AddMemberModal from './AddMemberModal'

var dummyData = [
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Donald J Trump', role: 1, status: 0 },
  { name: 'Smitherson, Dr.Rebecca', role: 0, status: 1 },
  { name: 'Jesse Colligan', role: 0, status: 1 },
  { name: 'Nikhil Kumar', role: 1, status: 0 },
]



const ManageTeamsBase = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const pages = [...Array(Math.ceil(store.organization.members.length / 15)).keys()]
  const [showModal, setShowModal] = useState(false);

  const getPageData = () => {
    const pageStart = 15 * currentPage
    return store.organization.members.slice(pageStart, pageStart + 15)
  };

  return (
    <div className="module-container">
      <h1>Manage Members</h1>
      <div className="add-member-button" onClick={() => setShowModal(true)}>
        <img src={addMember} />
        <span className="add-button-text">Add Member</span>
      </div>
      {showModal ? <AddMemberModal showModal={showModal} setShowModal={setShowModal} /> : null}
      <table>
        <thead>
          <tr>
            <th style={{ borderTopLeftRadius: 5 }}>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ borderTopRightRadius: 5 }}>Settings</th>
          </tr>
        </thead>
        <tbody>
          {
            getPageData().map((data, index) => (
              <tr key={index}>
                <td>{data.lastName + ', ' + data.firstName}</td>
                <td style={{ padding: 0 }}>
                  <div className="custom-select">
                    <select defaultValue={data.isAdmin ? ROLES.ADMIN_LABEL : ROLES.NON_ADMIN_LABEL}>
                      <option value={ROLES.ADMIN_LABEL}>
                        {ROLES.ADMIN_LABEL}
                      </option>
                      <option value={ROLES.NON_ADMIN_LABEL}>
                        {ROLES.NON_ADMIN_LABEL}
                      </option>
                    </select>
                  </div>
                </td>
                <td style={{ padding: 0 }}>
                  <div className="custom-select">
                    <select
                      className={data.isActive ? 'active' : 'inactive'}
                      defaultValue={data.isActive ? 'active' : 'deactivated'}
                    >
                      <option value='active'>
                        Active
                    </option>
                      <option value='deactivated'>
                        Deactivated
                    </option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="settings-container">
                    <a onClick={() => { }}>Delete Account</a>
                    <a onClick={() => { }}>Reset Password</a>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="table-bottom-container">
        <div className="save-button">Save Changes</div>
        <div className="pages-container">
          <div
            className="arrow"
            onClick={currentPage === 0 ? () => { } :
              () => setCurrentPage(currentPage - 1)}
          >
            <img src={arrowLeft} />
          </div>
          {
            pages.map(page => (
              <a
                key={page}
                className={`${page === currentPage ? 'current-' : ''}page`}
                onClick={page === currentPage ? () => { } : () => setCurrentPage(page)}
              >
                {page + 1}
              </a>
            ))
          }
          <div
            className="arrow"
            onClick={currentPage === pages[pages.length - 1] ? () => { } :
              () => setCurrentPage(currentPage + 1)}
          >
            <img src={arrowRight} />
          </div>
        </div>
      </div>
    </div>
  )
}

const condition = (authUser) => {
  var result = authUser && authUser.roles[ROLES.ADMIN]
  return result
}

const ManageTeams = compose(withAuthorization(condition))(ManageTeamsBase)

export default ManageTeams